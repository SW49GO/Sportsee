import React, { createContext, useState} from 'react';


const Context = createContext();

function MonProvider({ children }) {

// State pour stocker l'id de l'utilisateur
  const [selectedUserId, setSelectedUserId] = useState(null);
  console.log('selectedUserIdCONTEXT:', selectedUserId)


// fonction pour mettre à jour l'id de l'utilisateur
  const handleUserSelect = (userId) => {
    console.log('Context', userId)
    setSelectedUserId(userId);
  };

  return (
    <Context.Provider value={{ selectedUserId, handleUserSelect }}>
      {children}
    </Context.Provider>
  );
}

export { Context, MonProvider };
