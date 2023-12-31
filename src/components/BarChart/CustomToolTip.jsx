import Styles from '../../styles/customToolTips.module.css'

/**
 * Component function to display legend hover barChart bars
 * @param {object} payload
 * @param {boolean} active
 * @returns {JSX.Element}
 */
function CustomToolTip({ active, payload }) {

    // The source data of the content to display in the legend for each pair of bars
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