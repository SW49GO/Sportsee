import { useEffect, useState, useContext } from "react"
import { Context } from "../context/Context";
import { fetchMainData } from "../services/api"
import PropTypes from 'prop-types';
import Styles from '../styles/BannerUser.module.css'
import Error from "./Error";

function BannerUser(props){
    const users = props.user
    // Récupération du mode Dev ou Prod
    const {mode} = useContext(Context);

    // State pour stocker les données
    const [datas, setDatas] = useState(null)
    // console.log('datasBANNER:', datas)

    // récupération des données selon l'id de l'utilisateur
    useEffect(()=>{
        fetchMainData(users.userId,setDatas)
    },[users.userId])


if(datas){
    return(
        <div className={Styles.banner}>
            {!mode ? <> 
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

BannerUser.propTypes = {
    user: PropTypes.object.isRequired
}


export default BannerUser