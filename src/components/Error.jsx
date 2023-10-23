import Styles from '../styles/Error.module.css'
import PropTypes from 'prop-types';
function Error(props){
    const message = props.message
    // console.log('message:', message)
    return (
        <div className={Styles.message}>
          {(() => {
                    switch (message) {
                    case "true":
                        return (<p>Page en attente de réalisation...</p>)
                    case "false":
                        return (<p className={Styles.noExist}>Cette page n'existe pas...</p>)
                    case "noUser":
                        return (<p>Cet utilisateur n'existe pas...</p>)
                    case "err":
                        return (<p className={Styles.network}>Erreur Serveur inattendue...</p>)
                    default:
                        return (<p>Une erreur est survenue...</p>)
                    }
                })()}
        </div>
       
        )
}
Error.propTypes = {
    message: PropTypes.string.isRequired
}
export default Error