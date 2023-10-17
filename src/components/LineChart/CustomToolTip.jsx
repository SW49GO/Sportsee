import Styles from '../../styles/CustomToolTips.module.css'

function CustomToolTip({ active, payload }) {
    // Les données sources du contenu à afficher dans la légende pour chaque couple de barre
	if (active && payload && payload.length) {
		return (
			<div className={Styles.lineChartTip}>
				<p>{payload[0].value + " mn"}</p>
			</div>
		)
	}
	return null
}
export default CustomToolTip