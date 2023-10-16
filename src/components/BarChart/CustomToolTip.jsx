import Styles from '../../styles/CustomToolTips.css'

function CustomToolTip({ active, payload }) {
    // Les données sources du contenu à afficher dans la légende pour chaque couple de barre
	// console.log('payload:', payload)
	if (active && payload && payload.length) {
		return (
			<div className={Styles.barChartTip}>
				<p>{payload[0].value + "kg"}</p>
				<p>{payload[1].value + "Kcal"}</p>
			</div>
		)
	}
	return null
}
export default CustomToolTip