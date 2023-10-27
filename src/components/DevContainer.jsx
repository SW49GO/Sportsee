import { useFetchMainData } from '../hooks/useFetchMainData'
import Styles from '../styles/devContainer.module.css'
import RadarCharts from './RadarChart/RadarChart'
import LineCharts from './LineChart/LineChart'
import { useParams } from 'react-router-dom'
import { Context } from '../context/Context'
import BarCharts from './BarChart/BarChart'
import Error from './Error'
import Card from './Card'


import { useContext } from 'react'
/**
 * Component function to display the different components according to the url
 * @returns {JSX.Element}
 */
function DevContainer(){
    const url = useParams()

    const {modeProd}=useContext(Context)
    // Checking the modeProd for the call and retrieving data using a custom hook
    const datas = useFetchMainData(url.userId, modeProd)

    if(datas && datas!=="err" && datas!=="noUser"){

        const keyDataArray = Object.keys(datas.keyData)
        const valueDataArray = Object.values(datas.keyData)

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
                            <Card key={index} icon={index} name={name.charAt(0).toUpperCase() + name.slice(1)} cardValue={Number(valueDataArray[index]).toLocaleString("en-US")} container='dev'/>
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
    }else {
        return (
            <><Error message={datas}/></>
        )
    } 
}
export default DevContainer