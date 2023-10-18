import { useEffect, useState } from 'react'
import BannerUser from '../components/BannerUser'
import Styles from '../styles/Profil.module.css'
import BarCharts from '../components/BarChart/BarChart'
import LineCharts from '../components/LineChart/LineChart'
import RadarCharts from '../components/RadarChart/RadarChart'
import RadialBarCharts from '../components/RadialBarChart/RadialBarChart'
import Error from '../components/Error'
import Card from '../components/Card'
import { fetchMainData } from '../services/api'


function UserInfos(props){
    const url = props.url
    const [datas, setDatas] = useState(null)
      // Récupération des données pour créer les cartes
      useEffect(()=>{
        fetchMainData(url.userId,setDatas)
    },[url])
    let keyDataArray, valueDataArray

    if(datas){
    keyDataArray = Object.keys(datas.keyData)
    valueDataArray = Object.values(datas.keyData)
    
        return (
            <>
                <div>
                    <BannerUser user={url}/>
                </div>
                <div className={Styles.container}>
                    <div className={Styles.containerCharts}>
                        <div className={Styles.barChart}>
                                <BarCharts/>
                        </div>
                        <div className={Styles.containerCharts2}>
                            <div className={Styles.lineChart}>
                                <LineCharts/>
                            </div>
                            <div className={Styles.radarChart}>
                                <RadarCharts/>
                            </div>
                            <div className={Styles.radialBarChart}>
                                <RadialBarCharts/>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.containerCards}>
                            {keyDataArray.map((name, index) => (
                                <Card key={index} icon={index} name={name.charAt(0).toUpperCase() + name.slice(1)} value={Number(valueDataArray[index]).toLocaleString("en-US") } />
                                ))
                            }
                    </div>
                </div>
            </>
            )
    }else{
        return(
            <><Error message="false"/></>
        )
    }
}
export default UserInfos