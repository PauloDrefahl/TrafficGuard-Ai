import React, { createContext, useState, useEffect, useContext } from 'react';

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const [routers, setRouters] = useState(() => {
    try { return JSON.parse(localStorage.getItem('routers')) || []; }
    catch { return []; }
  });
  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = parseInt(localStorage.getItem('activeIndex'), 10);
    return isNaN(idx) ? 0 : idx;
  });
  const [credentials, setCredentials] = useState(() => {
    try { return JSON.parse(localStorage.getItem('credentials')) || { username: '', password: '' }; }
    catch { return { username: '', password: '' }; }
  });

  // Persist routers
  useEffect(() => {
    localStorage.setItem('routers', JSON.stringify(routers));
  }, [routers]);

  // Persist activeIndex
  useEffect(() => {
    localStorage.setItem('activeIndex', activeIndex);
  }, [activeIndex]);

  // Persist credentials
  useEffect(() => {
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }, [credentials]);

  const addRouter = (router) => {
    setRouters(rs => [...rs, router]);
    setActiveIndex(routers.length);
  };

  const deleteRouter = (idx) => {
    setRouters(rs => rs.filter((_, i) => i !== idx));
    setActiveIndex(ai =>
      ai === idx ? 0 : ai > idx ? ai - 1 : ai
    );
  };

  const selectRouter = (idx) => setActiveIndex(idx);

  const updateCredentials = (creds) => setCredentials(creds);

  return (
    <RouterContext.Provider value={{
      routers,
      activeIndex,
      credentials,
      addRouter,
      deleteRouter,
      selectRouter,
      updateCredentials
    }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
};
