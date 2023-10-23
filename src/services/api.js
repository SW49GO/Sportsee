import {USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE} from '../dataMocked/datasMocked'
import {ChangeUserMainData} from './changeUserMainData'
import { TranslateUserPerformance } from './translateUserPerformance'


// Bascule entre Environnement Dev (dataMocked) et Prod (Api)
const modeDataMocked = 'false'

/**
 * Function to retrieve all users for simulation connexion
 * @returns object 
 */
export async function getAllUser(){
    return USER_MAIN_DATA
}

/**
 * Function to retrieve datas from USER_MAIN_DATA
 * @param {string or object} userId the id of user
 * @param {function} setDatas to initialize 'datas'
 */
export async function fetchMainData(userId, setDatas) {
    console.log('userIdFETCHMAIN:', userId)
    // récupérer l'id en cas d'envoi d'un objet au lien d'un string
    if(userId && userId.userId){
    userId=userId.userId
    }
   

    if(process.env.REACT_APP_API_DEV === modeDataMocked){

        const userMainData = USER_MAIN_DATA.find((user)=>{
            if(userId && user.id === parseInt(userId)){
                if(user!== null){
                    // Replace todayScore and translate keyData
                    ChangeUserMainData(user)
                }
                return user
            }
            return false
          })
        setDatas(userMainData)
    }else{
        try{
            const response = await fetch (`http://localhost:3000/user/${userId}`)
            // Plage en 200-299 réponse ok serveur
            if(response.ok) {
                const results = await response.json();
                ChangeUserMainData(results.data)
                setDatas(results.data)
            }else if(response.status===404){
                setDatas('')
            }
        }catch(err){
            console.log(err)
                setDatas('err')
          }
        }
    }

    /**
     * Function to retrieve Datas
     * @param {object} userId ex:{'userId','12'}
     * @param {function} setDatas to initialize State "datas"
     * @param {string} endpoint the end of url
     */
    export async function fetchData(userId, setDatas, endpoint) {
    // récupérer l'id en cas d'envoi d'un objet au lien d'un string
     if(userId && userId.userId){
        userId=userId.userId
        }
        console.log('userIdFETCHDATA:', userId)
    if(process.env.REACT_APP_API_DEV === modeDataMocked){
        if(endpoint === "activity" && userId){
            const userActivity = USER_ACTIVITY.filter((user)=>{
                    if(user.userId === parseInt(userId)){
                      console.log(user)
                        return user
                    }
                    return false
                    })
                setDatas(userActivity[0].sessions)
        }
        if(endpoint === "average-sessions"  && userId){
        const userSessions = USER_AVERAGE_SESSIONS.filter((user)=>{
            if(user.userId === parseInt(userId)){
                return user
            }
        return false
        })
        setDatas(userSessions[0].sessions)
        }
        if(endpoint === "performance" && userId){
            const userPerformance = USER_PERFORMANCE.filter((user)=>{
                if(user.userId === parseInt(userId)){
                    if(user!==null){
                        TranslateUserPerformance(user)
                    }
                    return user
                }
                return false
                })
        setDatas( userPerformance[0])
        }
    }else{
        try{
            console.log("FETCHUSER_ID",userId)
            const response = await fetch (`http://localhost:3000/user/${userId}/${endpoint}`)
            if(response.ok) {
                const results = await response.json()

                if(endpoint === "activity"){
                    console.log('FETCHAVTIVITY',results.data)
                    setDatas(results.data.sessions)
                    }
                if(endpoint === "average-sessions"){
                    console.log('FETCHAVERAGE',results.data)
                    setDatas(results.data.sessions)
                    }
                if(endpoint === "performance"){
                    if(results.data!==null){
                        TranslateUserPerformance(results.data)
                    }
                    console.log('FETCHPERFORMANCE',results.data)
                    setDatas(results.data)
                }
            }else if(response.status===404){
                    setDatas('')
            }
        } catch(err){
              console.log(err)
              setDatas('err')
            }
    }
}