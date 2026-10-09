import { useEffect, useState } from 'react';
import { supabase } from '../Models/User';

export default function useMentorsViewModel() {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, role')
        .eq('role', 'Mentor');

      if (!error && data) {
        setMentors(data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return { mentors, isLoading };
}