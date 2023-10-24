import RadialBarCharts from '../components/RadialBarChart/RadialBarChart'
import RadarCharts from '../components/RadarChart/RadarChart'
import { useFetchMainData } from '../hooks/useFetchMainData'
import LineCharts from '../components/LineChart/LineChart'
import BarCharts from '../components/BarChart/BarChart'
import BannerUser from '../components/BannerUser'
import Styles from '../styles/Profil.module.css'
import { Context } from '../context/Context'
import Error from '../components/Error'
import Card from '../components/Card'
import { useContext} from 'react'



/**
 * Function to display components about user in 2 mode (user or developer)
 * @returns {JSX.Element}
 */
function UserInfos(){
    const {selectedUserId, modeProd}=useContext(Context)
    // Checking the modeProd for the call and retrieving data using a custom Hook
    const datas = useFetchMainData(selectedUserId, modeProd)
    let keyDataArray, valueDataArray

    if(datas && datas!=="err"){
    // Creation of 2 tables to extract keys and values of keyData
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
                                    <Card key={index} icon={index} name={name.charAt(0).toUpperCase() + name.slice(1)} cardValue={Number(valueDataArray[index]).toLocaleString("en-US") } />
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
                        <h3 className={Styles.completion}>Complétion de l'objectif journalier :</h3>
                    </div>
                    <div className={Styles.containerDev}>
                        <div className={Styles.radialBarChart}>
                            <RadialBarCharts/>
                        </div>
                    </div>
                </>
            )
        }
    }else if(datas===''){
        return(
            <><Error message="noUser"/></>
        )
    } else {
        return (
            <><Error message="err"/></>
        )
    } 
}
export default UserInfos