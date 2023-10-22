import { useParams } from 'react-router-dom'
import { useContext} from 'react'
import {Context} from '../context/Context'
import Styles from '../styles/Profil.module.css'
import Error from '../components/Error'
import UserProfil from '../components/UserProfil'
import DevContainer from '../components/DevContainer'
import { useFetchMainData } from '../hooks/useFetchMainData'

function Profil(){
    const url = useParams()
    const {selectedUserId, modeProd}=useContext(Context)

    console.log('userProfilOBJVALUE:', Object.keys(url))

    // Vérification du modeProd pour l'appel et récupération des données par un hook personnalisé
    const datas = useFetchMainData(selectedUserId, modeProd)

    if(datas){
        if(Object.keys(url).length===1){
            return (
                <div className={Styles.profil}>
                    <div className={Styles.profilContainer}>
                        <div className={Styles.profilPage}>
                            {/* <UserProfil url={selectedUserId}/> */}
                            <UserProfil/>
                        </div>
                    </div>
                </div>
            )
        }else if(!modeProd){
            return (
                <div>
                    <DevContainer/>
                </div>
            )
        }else{
            return (
                <><Error message="true"/></>
            )
        }
    }else{
            return (
                <><Error message="noUser"/></>
            )
    }
}
export default Profil