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
    const page = useParams()
    console.log('page:', page)
    const [datas, setDatas] = useState(null)
      // Récupération des données pour créer les cartes
      useEffect(()=>{
        fetchMainData(page.userId,setDatas)
    },[page])
    let keyDataArray, valueDataArray

    if(datas){
    keyDataArray = Object.keys(datas.keyData)
    valueDataArray = Object.values(datas.keyData)
        if(page['*']==="activity"){
        return (
            <div className={Styles.container}>
                <div className={Styles.barCharts}>
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
        }else if(page['*']==="average-sessions"){
        return (
            <div className={Styles.container}><LineCharts/></div>
        )
        }else if(page['*']==="performance"){
            return (
                <div className={Styles.container}><RadarCharts/></div>
            )
        }
    }else{
        return(
            <><Error message="true"/></>
        )
    }
}
export default DevContainer