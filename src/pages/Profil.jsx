import { useParams } from 'react-router-dom'
import { useContext, useEffect} from 'react'
import {Context} from '../context/Context'
import Styles from '../styles/Profil.module.css'
import Error from '../components/Error'
import UserProfil from '../components/UserProfil'
import DevContainer from '../components/DevContainer'

function Profil(){
    const url = useParams()
    console.log('urlPROFIL:', url)
    const { handleUserSelect, mode} = useContext(Context);

    console.log('userProfilOBJ:', Object.keys(url))

    // Send url to Context one time
    useEffect(()=>{
        handleUserSelect(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    if(Object.keys(url).length === 1){
        return (
            <div className={Styles.profil}>
                <div className={Styles.profilContainer}>
                    <div className={Styles.profilPage}>
                        <UserProfil url={url}/>
                    </div>
                </div>
            </div>
        )
    }else if(mode){
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

}
export default Profil