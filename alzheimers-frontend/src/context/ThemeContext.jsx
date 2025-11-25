// import { createContext, useState, useMemo, useContext } from 'react';

// const ThemeContext = createContext();

// export const ThemeProviderContext = ({ children }) => {
//   const [mode, setMode] = useState('light');

//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//       },
//     }),
//     []
//   );

//   return (
//     <ThemeContext.Provider value={{ mode, toggleColorMode: colorMode.toggleColorMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useThemeContext = () => {
//   return useContext(ThemeContext);
// };
import { createContext, useState, useMemo, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProviderContext = ({ children }) => {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode: colorMode.toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};