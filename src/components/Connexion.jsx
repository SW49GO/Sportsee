import { getAllUser} from "../services/api"
import { Link } from "react-router-dom"
import Styles from "../styles/Connexion.module.css"
const users = await getAllUser()

function Connexion(){
    return(
            <div className={Styles.container}>
              <h2>Liste des utilisateurs :</h2>
              <ul>
              {users.map((user) => (
                    <li key={user.id}>
                    <Link className={Styles.button} to={`/user/${user.id}`}>
                        {user.userInfos.firstName}
                    </Link>
                    </li>
                ))}
              </ul>
            </div>
          )
}
export default Connexion