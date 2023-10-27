import { useFetchMainData } from '../hooks/useFetchMainData'
import DevContainer from '../components/DevContainer'
import UserProfil from '../components/UserProfil'
import Styles from '../styles/profil.module.css'
import { useParams } from 'react-router-dom'
import {Context} from '../context/Context'
import Error from '../components/Error'
import { useContext} from 'react'

/**
 * Component function to display all components
 * @returns {JSX.Element}
 */
function Profil(){
    console.log('PROFIL')
    const url = useParams()
    const {selectedUserId, modeProd}=useContext(Context)

    // Checking the modeProd for the call and retrieving data using a custom hook
    const datas = useFetchMainData(selectedUserId, modeProd)

    if(datas && datas!=="err" && datas!=="noUser"){
        console.log('datas:', datas)
        if(Object.keys(url).length===1  && Object.keys(url)[0] === "userId"){
            //Access to the UserProfil component for any user (user or developer)
            return (
                <div className={Styles.profil}>
                    <div className={Styles.profilContainer}>
                        <div className={Styles.profilPage}>
                            <UserProfil/>
                        </div>
                    </div>
                </div>
            )
        }else if(!modeProd){
            // Access others components for user developer for all others URL
            return (
                <div>
                    <DevContainer/>
                </div>
            )
        }else{
            // Message for menu pages other than Profil
            return (
                <><Error message="true"/></>
            )
        }
     }else{
        return (
            <><Error message={datas}/></>
        )
    }
}
export default Profil