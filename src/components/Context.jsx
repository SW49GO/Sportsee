import React, { createContext, useState} from 'react';


const Context = createContext();

function MonProvider({ children }) {

// State pour stocker l'id de l'utilisateur
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Forcer le mode d'environnement Prod ou Dev pour l'utilisateur
  const mode =process.env.REACT_APP_DEVELOPPER==="true"
  console.log('mode:', mode)

// fonction pour mettre à jour l'id de l'utilisateur
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <Context.Provider value={{ selectedUserId, handleUserSelect, mode }}>
      {children}
    </Context.Provider>
  );
}

export { Context, MonProvider };
