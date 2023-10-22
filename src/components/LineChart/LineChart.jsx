import { LineChart, ResponsiveContainer,XAxis,YAxis,Tooltip,Line, Rectangle} from "recharts";
import { useContext} from 'react'
import { Context } from '../../context/Context'
import Styles from '../../styles/LineChart.module.css'
import CustomToolTip from './CustomToolTip'
import PropTypes from 'prop-types';
import Error from '../Error'
import { useFetchDatas } from "../../hooks/useFetchDatas";

/**
 * Function to build a component
 * @returns Component LineChart
 */
function LineCharts(){
// Retrieving the context id
     const {selectedUserId,modeProd } = useContext(Context);

// Vérification du modeProd pour l'appel et récupération des données par un hook personnalisé
const datas = useFetchDatas(selectedUserId, modeProd,'average-sessions')

     const formatDay = (item) => {
        const data = {1: '   L',2: 'M',3: 'M',4: 'J',5: 'V',6: 'S',7: 'D   '};
        return data[item]
      };

// Cursor customization
      const CustomCursor = (props) => {
        const { points, width, height } = props;
        const { x, y } = points[0];
        return (
          <Rectangle fill="#000000" opacity={0.1} x={x} y={y} width={width+50} height={height+50}/>
        );
      }
      CustomCursor.propTypes = {
        points: PropTypes.arrayOf(PropTypes.object),
        width: PropTypes.number,
        height: PropTypes.number
      }

    if(datas){
     return(
        <div className={Styles.lineChart}>  
          <h3 className={Styles.title}>Durée moyenne des sessions</h3>
          <ResponsiveContainer width="100%" height="100%" className={Styles.container}>
            <LineChart 
            data={datas}
            margin={{ top: 0, bottom: 15 }}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} interval="preserveStartEnd" tick={{fill:'#FFF', fillOpacity:0.7, fontSize:12}} tickFormatter={formatDay}/>
            <YAxis hide domain={['dataMin-20', 'dataMax+15']}/>
            {/* Outils pour customiser l'affichage du rectangle et le curseur */}
            <Tooltip content={<CustomToolTip />} cursor={<CustomCursor />}/>
            {/* Le point(billes) actif s'affiche lorsqu'un utilisateur entre dans un graphique linéaire et ce graphique comporte une info-bulle */}
            {/*stroke: couleur bordure avec opacity, strokeWidth:largeur de la bordure, r:rayon  */}
            <Line type="natural" dataKey="sessionLength" strokeWidth={2} stroke="#FFF" activeDot={{ stroke: 'rgba(255, 255, 255, 0.25)', strokeWidth: 10, r: 4}} dot={false}/>
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

