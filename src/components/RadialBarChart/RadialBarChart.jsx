import { RadialBarChart, ResponsiveContainer,RadialBar} from 'recharts'
import { useState,useEffect, useContext } from 'react'
import { Context } from '../../context/Context'
import { fetchMainData } from '../../services/api'
import Styles from '../../styles/RadialBarChart.module.css'
import Error from '../Error'

/**
 * Function to build component
 * @returns components RadialBarChart
 */
function RadialBarCharts(){
     const {selectedUserId } = useContext(Context);
     const [datas, setDatas] = useState(null)

// Retrieving user data
     useEffect(()=>{
       fetchMainData(selectedUserId, setDatas)
     },[selectedUserId])

if (datas){
 const dataArray = [{ name: datas.score * 100 + '%', value: datas.score * 100, fill:'#ff0000'}]

    return(
      <div className={Styles.radialBarChart}>
        <h3 className={Styles.title}>Score</h3>
        <svg width="60%" height="60%" className={Styles.svg}>
            <circle cx="50%" cy="50%" r="40%" fill="#fff"/>
        </svg>
        <div className={Styles.legend}><p>{dataArray[0].name}</p><p>de votre objectif</p></div>
            <ResponsiveContainer width="100%" height="100%" className={Styles.container}>
                <RadialBarChart 
                    data={dataArray} 
                    innerRadius="60%" 
                    outerRadius="60%" 
                    barSize={10}
                    startAngle={210}
                    endAngle={210 - (datas.score * 360)}
                    >
                    <RadialBar minAngle={0} cornerRadius={10} background clockWise={true} dataKey='value' />
                  </RadialBarChart>
            </ResponsiveContainer>
      </div>
    )
  }else{
    return(
      <><Error message="404"/></>
    )
  }
}

export default RadialBarCharts