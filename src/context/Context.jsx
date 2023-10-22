import React, { createContext, useState} from 'react';


const Context = createContext();

function MonProvider({ children }) {

// State pour stocker l'id de l'utilisateur
  const [selectedUserId, setSelectedUserId] = useState(null);
  console.log('selectedUserIdCONTEXT:', selectedUserId)

  // Forcer le mode d'environnement Prod ou Dev pour l'utilisateur
  const modeProd =process.env.REACT_APP_PRODUCTION==="true"
  console.log('mode:', modeProd)

  // fonction pour mettre à jour l'id de l'utilisateur
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <Context.Provider value={{ selectedUserId, handleUserSelect, modeProd }}>
      {children}
    </Context.Provider>
  );
}

export { Context, MonProvider };
