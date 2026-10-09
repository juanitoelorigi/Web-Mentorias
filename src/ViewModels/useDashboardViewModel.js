import { useState } from 'react';

export default function useDashboardViewModel() {
  const [sessions, setSessions] = useState([]);
  const [subjects, setSubjects] = useState([
    { id: '1', name: 'Programación', level: 'Todos los niveles' },
    { id: '2', name: 'Bases de Datos', level: 'Intermedio - Avanzado' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addSession = (sessionData) => {
    setSessions(prev => [...prev, { id: Date.now().toString(), ...sessionData }]);
  };

  const addSubject = (subjectData) => {
    setSubjects(prev => [...prev, { id: Date.now().toString(), ...subjectData }]);
  };

  return {
    sessions,
    subjects,
    isLoading,
    addSession,
    addSubject
  };
}