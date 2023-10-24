import Styles from '../styles/Card.module.css'
import PropTypes from 'prop-types';

/**
 * Function to display cards
 * @param {string} props 
 * @returns {JSX.Element}
 */
function Card(props){

    const icon = props.icon
    const name = props.name
    const value = props.cardValue

    const icones =[
        "calories-icon.svg",
        "protein-icon.svg",
        "carbs-icon.svg",
        "fat-icon.svg"
    ]

    return(
        <div className={Styles.container}>
            <img src={process.env.PUBLIC_URL + `/assets/${icones[parseInt(icon)]}`} alt="icon"/>
            <div className={Styles.legend}>
            {name==="Calories"? <p>{value}kCal</p> : <p>{value}g</p>}
            <p>{name}</p>
            </div>
        </div>
    )
}

Card.propTypes = {
    icon: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    cardValue: PropTypes.string.isRequired
}

export default Card