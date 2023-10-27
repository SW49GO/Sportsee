import { RadialBarChart, ResponsiveContainer,RadialBar} from 'recharts'
import { useTestScreenSize } from '../../hooks/useTestScreenSize'
import { useFetchMainData } from '../../hooks/useFetchMainData'
import Styles from '../../styles/radialBarChart.module.css'
import { Context } from '../../context/Context'
import { useContext } from 'react'
import Error from '../Error'


/**
 * Component function to build component RadialBarChart
 * @returns {JSX.Element}
 */
function RadialBarCharts(){
    const {selectedUserId, modeProd}=useContext(Context)
    // Checking the modeProd for the call and retrieving data using a custom hook
    const datas = useFetchMainData(selectedUserId, modeProd)
     // Check screen size to adjust outerRadius of RadarChart with custom hook
     const circleR = useTestScreenSize('radialBarChart')+'%'

  if (datas && datas!=="err" && datas!=="noUser"){
  // Table to format data
  const dataArray = [{ name: datas.score * 100 + '%', value: datas.score * 100, fill:'#ff0000'}]

    return(
      <div className={Styles.radialBarChart}>
        <h3 className={Styles.title}>Score</h3>
        {/* SVG circle white in the middle of RadialBarChart */}
        <svg width="60%" height="60%" className={Styles.svg}>
            <circle cx="50%" cy="50%" r={circleR} fill="#fff"/>
        </svg>
        <div className={Styles.legend}><p>{dataArray[0].name}</p><p>de votre objectif</p></div>
            <ResponsiveContainer width="100%" height="100%" className={Styles.container}>
                <RadialBarChart 
                    data={dataArray} 
                    innerRadius="60%" 
                    outerRadius="60%" 
                    barSize={12}
                    startAngle={210}
                    endAngle={210 - (datas.score * 360)}
                    margin={0}
                    >
                    <RadialBar minAngle={0} cornerRadius={10} background clockWise={true} dataKey='value'/>
                  </RadialBarChart>
            </ResponsiveContainer>
      </div>
    )
  }else {
    return (
        <><Error message={datas}/></>
    )
  } 
}

export default RadialBarCharts