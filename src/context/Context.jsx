import React, { createContext, useState} from 'react';


const Context = createContext();

function MonProvider({ children }) {

//////////////////////////////////////////////////////////////////
// Forcer le mode d'environnement Prod ou Dev pour l'utilisateur//
    const modeProd =process.env.REACT_APP_USER_PROD==="true"
//////////////////////////////////////////////////////////////////

// State pour stocker l'id de l'utilisateur
  const [selectedUserId, setSelectedUserId] = useState(null);
  console.log('selectedUserIdCONTEXT:', selectedUserId)

  // Fonction pour mettre à jour l'id de l'utilisateur
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
