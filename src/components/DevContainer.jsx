import Styles from '../styles/devContainer.module.css'
import RadarCharts from './RadarChart/RadarChart'
import { fetchMainData } from '../services/api'
import LineCharts from './LineChart/LineChart'
import { useParams } from 'react-router-dom'
import BarCharts from './BarChart/BarChart'
import { useEffect,useState } from 'react'
import Error from './Error'
import Card from './Card'

/**
 * Function to display the different components according to the url
 * @returns {JSX.Element}
 */
function DevContainer(){
    const url = useParams()
    const [datas, setDatas] = useState(null)

      // Retrieving data to create all Card
      useEffect(()=>{
        fetchMainData(url.userId,setDatas)
    },[url])

    let keyDataArray, valueDataArray

    if(datas && datas!=="err"){
        keyDataArray = Object.keys(datas.keyData)
        valueDataArray = Object.values(datas.keyData)
        // Retrieving JSX.Element according to the endpoint of the URL
        if(url['*']==="activity"){
        return (
            <div className={Styles.container}>
                <div className={Styles.barCharts}>
                    <h3>Poids et calories brûlées + les calories, protéines, glucides et lipides de la journée:</h3>
                    <BarCharts/>
                </div>
                <div className={Styles.cards}>
                    {keyDataArray.map((name, index) => (
                        <Card key={index} icon={index} name={name.charAt(0).toUpperCase() + name.slice(1)} cardValue={Number(valueDataArray[index]).toLocaleString("en-US") } />
                        ))
                    }
                </div>
            </div>
        )
        }else if(url['*']==="average-sessions"){
        return (
            <div className={Styles.container}>
                <div className={Styles.lineChart}>
                    <h2>Durée moyenne des sessions :</h2>
                    <LineCharts/>
                </div>
            </div>
        )
        }else if(url['*']==="performance"){
            return (
                <div className={Styles.container}>
                    <div className={Styles.radarChart}>
                        <h3>Types d'activités :</h3>
                        <RadarCharts/>
                    </div>
                </div>
            )
        }
    }else if(datas===''){
        return(
            <><Error message="noUser"/></>
        )
    }else {
        return (
            <><Error message="err"/></>
        )
    } 
}
export default DevContainer