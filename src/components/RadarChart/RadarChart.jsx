import { RadarChart,Radar, ResponsiveContainer,PolarAngleAxis,PolarGrid, PolarRadiusAxis} from "recharts";
import { useState, useContext,useEffect } from "react";
import { Context } from '../../context/Context';
import Styles from '../../styles/RadarChart.module.css'
import Error from "../Error";
import { useFetchDatas } from "../../hooks/useFetchDatas";

/**
 * Function to build component
 * @returns Component RadarChart
 */
function RadarCharts(){
// Retrieving the Context id
     const {selectedUserId, modeProd } = useContext(Context);
    // Vérification du modeProd pour l'appel et récupération des données par un hook personnalisé
     const datas = useFetchDatas(selectedUserId, modeProd,'performance')
     // Creating an object to reformat data from (kind and data)
    let newDatas={}
    if(datas!==null){
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

    // Adjust the outerRadius of the RadarChart according to the screen size
     const [outerRadius, setOuterRadius] = useState(75);

     useEffect(() => {
       const handleResize = () => {
         const screenWidth = window.innerWidth;
         const screenHeight = window.innerHeight;
         if (screenWidth <= 1024) {
           setOuterRadius(40);
         } else {
            if(screenHeight===780){
                setOuterRadius(55)
            }else{
                setOuterRadius(65);
            }
         }
       };
       // Event to detect screen size change
       window.addEventListener('resize', handleResize);
          handleResize();
       // Removed events when the component is dismount
       return () => {
         window.removeEventListener('resize', handleResize);
       };
     }, []);

     if(datas){
        return(
            <div className={Styles.radarChart}>
                <ResponsiveContainer  width="100%" height="100%" className={Styles.container}>
                    <RadarChart data={newDatas.data} outerRadius={outerRadius}>
                        {/* sans ligne vertical du centre vers l'extérieur*/}
                        <PolarGrid radialLines={false}/>
                        {/* 5 toiles sans gratuations ni traits */}
                        <PolarRadiusAxis tickCount={6} tick={false} axisLine={false}/>
                        {/*  tickFormatter-> fonction pour mettre la 1ere lettre en majuscule de value // dy-> recentrage des datas// tick->chaque catégorie des datas*/}
                        <PolarAngleAxis dataKey="kind" dy={2} tick = {{fill:'#FFF', fontSize: 12, fontWeight: 500}} tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}/>
                        <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7}/>
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        )
    }else{
        return(
            <Error message="404"/>
        )
    }
}
export default RadarCharts