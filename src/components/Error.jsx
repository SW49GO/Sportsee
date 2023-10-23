import { useParams } from 'react-router-dom';
import Styles from '../styles/Error.module.css'
import PropTypes from 'prop-types';
function Error(props){
    const url = useParams()
    // Authorized pages for users
    const authorizedPage = ['home','profil','settings','commmunity','yoga','swimming','bike','alter']
    let message = props.message
    if (url['*'] && !authorizedPage.includes(url['*'])) {
        message = "false";
    }
    return (
        <div className={Styles.message}>
          {(() => {
                    switch (message) {
                    case "true":
                        return (<p className={Styles.other}>Page en attente de réalisation...</p>)
                    case "false":
                        return (<p className={Styles.noExist}>Cette page n'existe pas...</p>)
                    case "noUser":
                        return (<p className={Styles.other}>Cet utilisateur n'existe pas...</p>)
                    case "err":
                        return (<p className={Styles.network}>Erreur Serveur inattendue...</p>)
                    default:
                        return (<p className={Styles.other}>Une erreur est survenue...</p>)
                    }
                })()}
        </div>
       
        )
}
Error.propTypes = {
    message: PropTypes.string.isRequired
}
export default Error