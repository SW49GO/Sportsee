import { useFetchMainData } from '../hooks/useFetchMainData'
import Styles from '../styles/bannerUser.module.css'
import { Context } from '../context/Context'
import { useContext } from 'react'
import Error from './Error'

/**
 * Component function to display user banner or infos user
 * @returns {JSX.Element}
 */
function BannerUser(){

    const {selectedUserId, modeProd} = useContext(Context)
    // Checking the modeProd for the call and retrieving data using a custom hook
    const datas = useFetchMainData(selectedUserId, modeProd)

    if(datas && datas!=="err" && datas!=="noUser"){
        return(
            <div className={Styles.banner}>
                {modeProd ? <> 
                        <p>Bonjour <span>{datas.userInfos.firstName.charAt(0).toUpperCase() + datas.userInfos.firstName.slice(1)}</span></p>
                        <p className={Styles.message}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                        </>
                        :<><p>Utilisateur: </p><p className={Styles.lastName}>IDENTITE : { datas.userInfos.lastName.charAt(0).toUpperCase() + datas.userInfos.lastName.slice(1)} {datas.userInfos.firstName.charAt(0).toUpperCase() + datas.userInfos.firstName.slice(1)}</p><p>AGE : {datas.userInfos.age} ans</p>
                        </>
                }
            </div>
        )
    }else {
        return (
            <><Error message={datas}/></>
        )
    } 
}

export default BannerUser