import { createContext, useContext, useState } from 'react';

const BreadCumb = createContext();

export function useBreadCumb() {
  return useContext(BreadCumb);
}

export function BreadCumbProvider({ children }) {

  const [breadCumbItem, setBreadCumbItem] = useState([
    {defaultPortfolio:'Portfolios'},
    {defaultProducts:'Products'},
    {defaultProjects:'Projects'},
  ]);
  const [show,setShow] = useState(true);

 

  return (
    <BreadCumb.Provider value={{ breadCumbItem, setBreadCumbItem,show,setShow }}>
      {children}
    </BreadCumb.Provider>
  );
}
