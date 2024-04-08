import { useState, createContext } from 'react';

export const LabelContext = createContext();

export const LabelProvider = (props) => {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage(page + 1);   
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <LabelContext.Provider
      value={{
        page,
        nextPage,
        prevPage,
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};
