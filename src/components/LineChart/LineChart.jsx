import { LineChart, ResponsiveContainer,XAxis,YAxis,Tooltip,Line, Rectangle} from "recharts";
import { fetchData } from '../../services/api'
import { useContext, useState,useEffect} from 'react'
import { Context } from '../../context/Context'
import Styles from '../../styles/LineChart.module.css'
import CustomToolTip from './CustomToolTip'
import Error from '../Error'


function LineCharts(){
     // récupération de l'id du context
     const {selectedUserId } = useContext(Context);
     const [datas, setDatas] = useState(null)

     // récupération des données de l'utilisteur
     useEffect(()=>{
       fetchData(selectedUserId, setDatas, 'average-sessions')
     },[selectedUserId])
    
     const formatDay = (item) => {
        const data = {1: 'L',2: 'M',3: 'M',4: 'J',5: 'V',6: 'S',7: 'D'};
        return data[item]
      };

      const CustomCursor = (props) => {
        const { points, width, height } = props;
        const { x, y } = points[0];
        console.log(props);
        return (
          <Rectangle fill="#000000" opacity={0.1} x={x} y={y} width={width+50} height={height+50}/>
        );
      }

    if(datas){
     return(
        <div className={Styles.lineChart}>  
          <h3 className={Styles.title}>Durée moyenne des sessions</h3>
          <ResponsiveContainer width="100%" height="100%" className={Styles.container}>
            <LineChart 
            // width={500} 
            // height={300} 
            data={datas}
            margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
            >
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:'#FFF'}} tickFormatter={formatDay} padding={{ right: -20, left: -10 }}/>
            <YAxis hide domain={['dataMin-10', 'dataMax+10']}  />
            {/* Outils pour customiser l'affichage du rectangle et le curseur */}
            <Tooltip content={<CustomToolTip />} cursor={<CustomCursor />}/>
            {/* Le point(billes) actif s'affiche lorsqu'un utilisateur entre dans un graphique linéaire et ce graphique comporte une info-bulle */}
            {/*stroke: couleur bordure avec opacity, strokeWidth:largeur de la bordure, r:rayon  */}
            <Line type="natural" dataKey="sessionLength" strokeWidth={2} stroke="#FFF" activeDot={{ stroke: 'rgba(255, 255, 255, 0.25)', strokeWidth: 10, r: 4}} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
     )
    }else{
        return(
            <Error message="404"/>
        )
    }
}
export default LineCharts

