import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import NavBar from './NavBar'
import Connexion from './Connexion'
import Profil from '../pages/Profil'
import Error from '../components/Error'




function Router(){
    /**
     * Function to select the user
     */
    const RedirectConnexion=()=> {
        return <Navigate to='/user/connexion'/>;
      }

    return ( <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route exact path='/' element={<RedirectConnexion/>} />
                    <Route path='/user/connexion' element={<Connexion/>} />
                    <Route path='/user/:userId' element={<Profil/>} />
                    <Route path='/user/:userId/*' element={<Profil />} />
                    <Route path='*' element={<Error message="false"/>} />
                </Routes>
            </BrowserRouter>
            )
}


export default Router