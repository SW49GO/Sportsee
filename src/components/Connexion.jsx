import {Navigate} from 'react-router-dom'
import { getAllUser} from "../services/api"
import { Link } from "react-router-dom"
import { useContext} from 'react'
import {Context} from '../context/Context'
import Styles from "../styles/Connexion.module.css"
const users = await getAllUser()

function Connexion(){
  const { handleUserSelect, modeProd} = useContext(Context);
  if(modeProd){
    return(
            <div className={Styles.container}>
              <h2>Liste des utilisateurs :</h2>
              <ul>
              {users.map((user) => (
                    <li key={user.id}>
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