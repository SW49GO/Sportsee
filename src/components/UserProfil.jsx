import { useContext} from 'react'
import BannerUser from '../components/BannerUser'
import Styles from '../styles/Profil.module.css'
import BarCharts from '../components/BarChart/BarChart'
import LineCharts from '../components/LineChart/LineChart'
import RadarCharts from '../components/RadarChart/RadarChart'
import RadialBarCharts from '../components/RadialBarChart/RadialBarChart'
import Error from '../components/Error'
import Card from '../components/Card'
import { Context } from '../context/Context'
import { useFetchMainData } from '../hooks/useFetchMainData'

function UserInfos(){
    const {selectedUserId, modeProd}=useContext(Context)
    // Vérification du modeProd pour l'appel et récupération des données par un hook personnalisé
    const datas = useFetchMainData(selectedUserId, modeProd)

    let keyDataArray, valueDataArray

    if(datas){
    keyDataArray = Object.keys(datas.keyData)
    valueDataArray = Object.values(datas.keyData)
        
        if(modeProd){
            return (
                <>
                    <div>
                        <BannerUser/>
                    </div>
                    <div className={Styles.container}>
                        <div className={Styles.containerChartsGlobal}>
                            <div className={Styles.containerBarChart}>
                                    <BarCharts/>
                            </div>
                            <div className={Styles.container3Charts}>
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
                <>
                <div>
                    <BannerUser/>
                    <h3 className={Styles.completion}>Complétion de l’objectif journalier :</h3>
                </div>
                    <div className={Styles.containerDev}>
                        <div className={Styles.radialBarChart}>
                            <RadialBarCharts/>
                        </div>
                    </div>
                </>
            )
        }
    }else{
        return(
            <><Error message="noUser"/></>
        )
    }
}
export default UserInfos