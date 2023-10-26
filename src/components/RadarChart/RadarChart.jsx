import { RadarChart,Radar, ResponsiveContainer,PolarAngleAxis,PolarGrid, PolarRadiusAxis} from 'recharts'
import { useFetchDatas } from '../../hooks/useFetchDatas'
import { useTestScreenSize } from '../../hooks/useTestScreenSize'
import { useContext} from 'react'
import Styles from '../../styles/radarChart.module.css'
import { Context } from '../../context/Context'
import Error from "../Error"

/**
 * Function to build component RadarChart
 * @returns {JSX.Element}
 */
function RadarCharts(){
// Retrieving the Context id
    const {selectedUserId, modeProd } = useContext(Context);
    // Checking the modeProd for the call and retrieving data using a custom hook
    const datas = useFetchDatas(selectedUserId, modeProd,'performance')
     // Creating an object to reformat data from (kind and data)
    let newDatas={}
    if(datas!==null && datas!=="err"){
        const kindDatas = datas.kind
        newDatas = {
            data: datas.data.map((dataItem) => {
                return {
                    kind: kindDatas[dataItem.kind],
                    value: dataItem.value
                };
            })
        };
        // Reverse the order of kind objects in data
        newDatas.data.reverse();
    }
    // Check screen size to adjust outerRadius of RadarChart with custom hook
    const outerRadius = useTestScreenSize('radarChart')

    if(datas && datas!=="err"){
        return(
            <div className={Styles.radarChart}>
                <ResponsiveContainer  width="100%" height="100%" className={Styles.container}>
                    <RadarChart data={newDatas.data} outerRadius={outerRadius}>
                        {/* sans ligne vertical du centre vers l'extérieur*/}
                        <PolarGrid radialLines={false}/>
                        {/* 5 toiles sans gratuations ni traits */}
                        <PolarRadiusAxis tickCount={6} tick={false} axisLine={false}/>
                        {/*  tickFormatter-> fonction pour mettre la 1ere lettre en majuscule de value // cy-> recentrage des datas// tick->chaque catégorie des datas*/}
                        <PolarAngleAxis dataKey="kind" dy={2} tick = {{fill:'#FFF', fontSize: 12, fontWeight: 500}} tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}/>
                        <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7}/>
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        )
    }else if(datas===''){
        return(
            <><Error message="404"/></>
        )
    }else {
        return (
            <><Error message="err"/></>
        )
    } 
}
export default RadarCharts