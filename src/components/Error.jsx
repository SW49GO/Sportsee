import Styles from '../styles/Error.module.css'
import PropTypes from 'prop-types';
function Error(props){
    const message = props.message
    // console.log('message:', message)
    return (
        <div className={Styles.message}>
            {message === "true" ? "Page en attente de réalisation..." : "Cette page n'existe pas..."}
        </div>
       
        )
}
Error.propTypes = {
    message: PropTypes.string.isRequired
}
export default Error