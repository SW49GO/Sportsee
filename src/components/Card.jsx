import Styles from '../styles/card.module.css'
import PropTypes from 'prop-types'

/**
 * Component function to display cards
 * @param {string} props 
 * @returns {JSX.Element}
 */
function Card(props){

    const icon = props.icon
    const name = props.name
    const value = props.cardValue
    const container = props.container

    const icones =[
        "calories-icon.svg",
        "protein-icon.svg",
        "carbs-icon.svg",
        "fat-icon.svg"
    ]

    return(
        <div className={container ? `${Styles.container} ${Styles.dev}` : Styles.container}>
            <div className={Styles.icon}>
                <img src={process.env.PUBLIC_URL + `/assets/${icones[parseInt(icon)]}`} alt="icon"/>
            </div>
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
    cardValue: PropTypes.string.isRequired,
    container: PropTypes.string
}

export default Card