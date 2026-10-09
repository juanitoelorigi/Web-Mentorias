import { useState } from 'react';
import User, { supabase } from '../Models/User';

export default function useAuthViewModel() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setIsLoading(true);
    setError('');
    
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      setIsLoading(false);
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Credenciales incorrectas o usuario no encontrado.');
      setIsLoading(false);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      setError('Error al obtener el perfil del usuario.');
      setIsLoading(false);
      return;
    }

    const loggedUser = new User(profileData.id, profileData.name, profileData.email, profileData.role);
    setUser(loggedUser);
    setIsLoading(false);
  };

  const register = async (name, email, password, role) => {
    setIsLoading(true);
    setError('');
    
    if (!name || !email || !password || !role) {
      setError('Por favor, completa todos los campos y selecciona un rol.');
      setIsLoading(false);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Formato de correo inválido.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres.');
      setIsLoading(false);
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    if (authData.user) {
       const { error: profileError } = await supabase.from('profiles').insert([
        { id: authData.user.id, name, email, role }
      ]);

      if (profileError) {
        setError('Error al crear el perfil.');
        setIsLoading(false);
        return;
      }
      
      const newUser = new User(authData.user.id, name, email, role);
      setUser(newUser);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return {
    user,
    isLoggedIn: !!user,
    isLoading,
    error,
    login,
    register,
    logout
  };
}