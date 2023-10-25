import Styles from '../styles/error.module.css'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'


/**
 * Function to manage error messages and authorized page
 * @param {string} props 
 * @returns {JSX.Element}
 */
function Error(props){

    // Checking pages allowed for users
    const url = useParams()
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