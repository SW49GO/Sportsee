import Styles from '../styles/error.module.css'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'


/**
 * Component function to manage error messages and authorized page
 * @param {string} props 
 * @returns {JSX.Element}
 */
function Error(props){
    let message = props.message
    console.log('message:', message)
    // Checking pages allowed for users
    const url = useParams()
    const authorizedPage = ['home','profil','settings','community','yoga','swimming','bike','alter']

    if(message===null){
        message = "chargement"
    }else if (url['*'] && !authorizedPage.includes(url['*'])) {
        message = "false"
    }
console.log(message)
    return (
        <div className={Styles.message}>
          {(() => {
                    switch (message) {
                    case "true":
                        return (<p className={Styles.wait}>Page en attente de réalisation...</p>)
                    case "false":
                        return (<p className={Styles.noExist}>Cette page n'existe pas...</p>)
                    case "noUser":
                        return (<p className={Styles.noUser}>Cet utilisateur n'existe pas...</p>)
                    case "err":
                        return (<p className={Styles.network}>Erreur Serveur inattendue...</p>)
                    default:
                        return (<p className={Styles.other}>Chargement en cours...</p>)
                    }
                })()}
        </div>
        )
}
Error.propTypes = {
    message: PropTypes.string
}
export default Error