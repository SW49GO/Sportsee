import { useContext } from "react"
import { Context } from "../context/Context";
import Styles from '../styles/BannerUser.module.css'
import Error from "./Error";
import { useFetchMainData } from "../hooks/useFetchMainData";

function BannerUser(){

    const {selectedUserId, modeProd} = useContext(Context);
    // Vérification du modeProd pour l'appel et récupération des données par un hook personnalisé
    const datas = useFetchMainData(selectedUserId, modeProd)

if(datas){
    return(
        <div className={Styles.banner}>
            {modeProd ? <> 
                    <p>Bonjour <span>{datas.userInfos.firstName.charAt(0).toUpperCase() + datas.userInfos.firstName.slice(1)}</span></p>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                    </>
                    :<><p>Utilisateur: </p><p>{datas.userInfos.lastName.charAt(0).toUpperCase() + datas.userInfos.lastName.slice(1)} {datas.userInfos.firstName.charAt(0).toUpperCase() + datas.userInfos.firstName.slice(1)}</p><p>Age : {datas.userInfos.age} ans</p>
                    </>
            }
        </div>
    )
}else{
    return(
    <Error message="noUser"/>
    )
}
}

export default BannerUser