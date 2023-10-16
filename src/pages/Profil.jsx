import { useParams } from 'react-router-dom'
import { useContext, useEffect} from 'react'
import {Context} from '../components/Context'
import BannerUser from '../components/BannerUser'
import Styles from '../styles/Profil.module.css'
import BarCharts from '../components/BarChart/BarChart'

function Profil(){
    const url = useParams()
    const { handleUserSelect} = useContext(Context);
    console.log('userProfil:', url.userId)

    // Send url to Context one time
    useEffect(()=>{
        handleUserSelect(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
        <BannerUser user={url}/>
        <div className={Styles.gridCharts}>
            <div className={Styles.barChart}>
                <BarCharts/>
            </div>
        </div>
        </>
    )
}
export default Profil