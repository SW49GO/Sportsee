import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { fetchMainData } from '../services/api'
import Styles from '../styles/DevContainer.module.css'
import BarCharts from './BarChart/BarChart'
import LineCharts from './LineChart/LineChart'
import RadarCharts from './RadarChart/RadarChart'
import Card from './Card'
import Error from './Error'

function DevContainer(){
    // récupération du endpoint de l'url
    const url = useParams()
    console.log('url:', url)
    const [datas, setDatas] = useState(null)
      // Récupération des données pour créer les cartes
      useEffect(()=>{
        fetchMainData(url.userId,setDatas)
    },[url])
    let keyDataArray, valueDataArray

    if(datas){
    keyDataArray = Object.keys(datas.keyData)
    valueDataArray = Object.values(datas.keyData)
        if(url['*']==="activity"){
        return (
            <div className={Styles.container}>
                <div className={Styles.barCharts}>
                    <h3>Poids et calories brûlées + les calories, protéines, glucides et lipides de la journée:</h3>
                    <BarCharts/>
                </div>
                <div className={Styles.cards}>
                    {keyDataArray.map((name, index) => (
                        <Card key={index} icon={index} name={name.charAt(0).toUpperCase() + name.slice(1)} value={Number(valueDataArray[index]).toLocaleString("en-US") } />
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
    }else{
        return(
            <><Error message="noUser"/></>
        )
    }
}
export default DevContainer