import { useEffect, useState } from "react";
export function useTestScreenSize(theNameChart){

    const [option, setOption]= useState(null)
    const [paddingBar, setPaddingBar] = useState(-30)
    const [outerRadius, setOuterRadius] = useState(67)

    useEffect(() => {

        const handleResize = () => {
            const screenWidth = window.innerWidth
            const screenHeight = window.innerHeight
                if(theNameChart==='barChart'){
                    if (screenWidth <= 1024) {
                        setPaddingBar(-30)
                    }else{
                        setPaddingBar(-50)
                    }
                    setOption(paddingBar)
                }
                if(theNameChart==='radarChart'){
                    if (screenWidth <= 1024) {
                        setOuterRadius(33);
                    } else {
                        if(screenHeight===780){
                            setOuterRadius(55)
                        }else if(screenHeight===1024){
                            setOuterRadius(75);
                        }
                    }
                    setOption(outerRadius)
                }
            }
        
        // Event to detect screen size change
        window.addEventListener('resize', handleResize)
            handleResize()
        // Removed events when the component is dismount
        return () => {
        window.removeEventListener('resize', handleResize)
        }
    }, [theNameChart,paddingBar,outerRadius])
    return option

}
//    // Adjust the outerRadius of the RadarChart according to the screen size
//    const [outerRadius, setOuterRadius] = useState(75);

//    useEffect(() => {
//      const handleResize = () => {
//        const screenWidth = window.innerWidth;
//        const screenHeight = window.innerHeight;
//        if (screenWidth <= 1024) {
//          setOuterRadius(40);
//        } else {
//           if(screenHeight===780){
//               setOuterRadius(55)
//           }else{
//               setOuterRadius(65);
//           }
//        }
//      };
//      // Event to detect screen size change
//      window.addEventListener('resize', handleResize);
//         handleResize();
//      // Removed events when the component is dismount
//      return () => {
//        window.removeEventListener('resize', handleResize);
//      };
//    }, []);