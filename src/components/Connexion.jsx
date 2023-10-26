import Styles from '../styles/connexion.module.css'
import { getAllUser} from '../services/api'
import {Context} from '../context/Context'
import {Navigate} from 'react-router-dom'
import { Link } from "react-router-dom"
import { useContext} from 'react'

// Retrieve all users from dataMocked
const users = await getAllUser()

/**
 * Component function to simulate a user login by choosing a user from a list
 * @returns {JSX.Element}
 */
function Connexion(){
  // Retrieve handleUserSelect to initialize selectedUserId when selected user
  const { handleUserSelect, modeProd} = useContext(Context)

  if(modeProd){
    return(
            <div className={Styles.container}>
              <h2>Liste des utilisateurs :</h2>
              <ul>
              {users.map((user) => (
                    <li key={user.id}>
                      {/* Initialize Id in Context, and store it in localStorage */}
                    <Link className={Styles.button} to={`/user/${user.id}`}  onClick={() => {handleUserSelect({ 'userId': user.id });localStorage.clear();localStorage.setItem('defaultUser',user.id)}}>
                        {user.userInfos.firstName}
                    </Link>
                    </li>
                ))}
              </ul>
            </div>
          )
    }else{
      return(
        <Navigate to='/user/'/>
      )
    }
}
export default Connexion