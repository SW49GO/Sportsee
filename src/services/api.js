import {USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE} from '../dataMocked/datasMocked'
import { TranslateUserPerformance } from './translateUserPerformance'
import {ChangeUserMainData} from './changeUserMainData'

/**
 * Function to retrieve all users for simulation connexion
 * @returns {object} 
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
    // Standardize User ID
    if(userId && userId.userId){
        userId=userId.userId
    }

    if(process.env.REACT_APP_DATA_MOCKED){

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
                // [200-299] réponse ok from network
                if(response.ok) {
                    const results = await response.json()
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
     // Standardize User ID
     if(userId && userId.userId){
        userId=userId.userId
        }

    if(process.env.REACT_APP_DATA_MOCKED){

        if(endpoint === "activity" && userId){
            const userActivity = USER_ACTIVITY.filter((user)=>{
                    if(user.userId === parseInt(userId)){
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
                        // Translate English to French data kind
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
            const response = await fetch (`http://localhost:3000/user/${userId}/${endpoint}`)
            if(response.ok) {
                const results = await response.json()

                if(endpoint === "activity"){
                    setDatas(results.data.sessions)
                    }
                if(endpoint === "average-sessions"){
                    setDatas(results.data.sessions)
                    }
                if(endpoint === "performance"){
                    if(results.data!==null){
                        TranslateUserPerformance(results.data)
                    }
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