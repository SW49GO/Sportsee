import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import Error from '../components/Error'
import Profil from '../pages/Profil'
import Connexion from './Connexion'
import NavBar from './NavBar'

/**
 * Component function for routing
 * @returns {JSX.Element}
 */
function Router(){

    /**
     * Function to redirect the path '/' to '/user/connexion'
     * @returns {JSX.Element}
     */
    const RedirectConnexion=()=> {
        return <Navigate to='/user/connexion'/>
      }

    return ( <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route exact path='/' element={<RedirectConnexion/>} />
                    <Route path='/user/connexion' element={<Connexion/>} />
                    <Route path='/user/:userId' element={<Profil/>} />
                    <Route path='/user/:userId/*' element={<Profil />}/>
                    <Route path='*' element={<Error message="false"/>}/>
                </Routes>
            </BrowserRouter>
            )
}


export default Router