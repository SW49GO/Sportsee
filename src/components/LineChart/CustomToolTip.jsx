import Styles from '../../styles/customToolTips.module.css'

/**
 * Component function to display legend hover the dot line
 * @param {object} payload
 * @param {boolean} active
 * @returns {JSX.Element}
 */
function CustomToolTip({ active, payload }) {
    // The source data of the content to display in the legend for each day
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