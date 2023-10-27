import React, { createContext, useState} from 'react'
import PropTypes from 'prop-types'

// Creating a shared data space (object) accessible by nested child components by his method Provider
const Context = createContext()


/**
 * Component Function to wraps other components and provides shared Context data : selectedUserId, handleUserSelect, modeProd
 * @param {object} props
 * @param {ReactNode} props.children - The child components to render in the context
 * @returns {JSX.Element} component that wraps the children.
 */
function MonProvider({ children }) {

///////////////////////////////////////////////////////////////////
// Force USER or DEVELOPER environment mode (default .env "true")//
    const modeProd =process.env.REACT_APP_USER_PROD
//////////////////////////////////////////////////////////////////

// State to store user Id
  const [selectedUserId, setSelectedUserId] = useState(null)

  // Function to update user Id
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId)
  };

  return (
    <Context.Provider value={{ selectedUserId, handleUserSelect, modeProd }}>
      {children}
    </Context.Provider>
  );
}
MonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, MonProvider }
