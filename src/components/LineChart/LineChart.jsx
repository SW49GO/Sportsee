import { LineChart, ResponsiveContainer,XAxis,YAxis,Tooltip,Line, Rectangle} from 'recharts'
import { useFetchDatas } from '../../hooks/useFetchDatas'
import Styles from '../../styles/lineChart.module.css'
import { Context } from '../../context/Context'
import CustomToolTip from './CustomToolTip'
import PropTypes from 'prop-types'
import { useContext} from 'react'
import Error from '../Error'


/**
 * Component function to build a component LineChart
 * @returns {JSX.Element}
 */
function LineCharts(){
// Retrieving the context id user
  const {selectedUserId, modeProd } = useContext(Context)

// Checking the modeProd for the call and retrieving data using a custom hook
  const datas = useFetchDatas(selectedUserId, modeProd,'average-sessions')

  // Function to change each day value by a letter -> used by tickFormatter
   const formatDay = (value) => {
    const data = {1: ' L',2: 'M',3: 'M',4: 'J',5: 'V',6: 'S',7: 'D '}
    return data[value]
  }

// Cursor customization
  const CustomCursor = (props) => {
    const { points, width, height } = props
    const { x, y } = points[0]
      return (
        <Rectangle fill="#000000" opacity={0.1} x={x} y={y} width={width+50} height={height+50}/>
      )
  }
  CustomCursor.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    height: PropTypes.number
  }

  if(datas && datas!=="err"){
    return(
      <div className={Styles.lineChart}>  
        <h3 className={Styles.title}>Durée moyenne des sessions</h3>
        <ResponsiveContainer width="100%" height="100%" className={Styles.container}>
          <LineChart 
          data={datas}
          margin={{ top: 0, bottom: 15 }}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} interval="preserveStartEnd" tick={{fill:'#FFF', fillOpacity:0.7, fontSize:12}} tickFormatter={formatDay}/>
            <YAxis hide domain={['dataMin-15', 'dataMax+30']}/>
            {/* Outils pour customiser l'affichage du rectangle et le curseur*/}
            <Tooltip content={<CustomToolTip />} cursor={<CustomCursor />}/>
            {/* Définition d'un dégradé pour la ligne */}
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fff" stopOpacity={0.4} />
                <stop offset="30%" stopColor="#fff" stopOpacity={0.6} />
                <stop offset="60%" stopColor="#fff" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#fff" stopOpacity={1} />
              </linearGradient>
            </defs>
            {/*Paramètre de la ligne et du point actif*/}
          <Line type="natural" dataKey="sessionLength" strokeWidth={2} stroke="url(#grad)" activeDot={{ stroke: 'rgba(255, 255, 255, 0.25)', strokeWidth: 10, r: 4}} dot={false}/>
          </LineChart>
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

export default LineCharts

