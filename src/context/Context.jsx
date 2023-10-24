import React, { createContext, useState} from 'react';

// Creating a Context
const Context = createContext();


/**
 * Function to provide context to manage the selected user's Id
 * @param {object} props
 * @param {ReactNode} props.children - The child components to render in the context
 * @returns {JSX.Element} The Context component that wraps the children.
 */
function MonProvider({ children }) {

//////////////////////////////////////////////////////////////
// Force User or Developer environment mode                 //
    const modeProd =process.env.REACT_APP_USER_PROD
/////////////////////////////////////////////////////////////

// State to store user Id
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Function to update user Id
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
