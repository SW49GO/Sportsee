import Styles from '../styles/navBar.module.css'; 
import {Context} from '../context/Context'
import { Link } from 'react-router-dom';
import {useContext} from 'react'


/**
 * Function to display the menus
 * @returns {JSX.Element}
 */
function NavBar() {
// Retrieve user Id from Context
  const { selectedUserId } = useContext(Context);

  return (
    <section>
      <div className={Styles.horizontal}>
        <article className={Styles.navLogo}>
          <div className={Styles.logo}>
            {/*static path to files from /public folder*/}
          <img src={process.env.PUBLIC_URL + '/assets/Logo.svg'} alt="Logo sportSee" />
          <img src={process.env.PUBLIC_URL + '/assets/sportsee.svg'} alt="SportSee" />
          </div>
        </article>
        <nav className={Styles.navHorizontal}>
        {selectedUserId ?
          <>
          <Link to={`/user/${selectedUserId.userId}/home`}>Accueil</Link>
          <Link to={`/user/${selectedUserId.userId}`}>Profil</Link>
          <Link to={`/user/${selectedUserId.userId}/settings`}>Réglage</Link>
          <Link to={`/user/${selectedUserId.userId}/community`}>Communauté</Link>
          </>
          : 
          <>
          <Link to=''>Accueil</Link>
          <Link to=''>Profil</Link>
          <Link to=''>Réglages</Link>
          <Link to=''>Communauté</Link>
          </>
          }
        </nav>
      </div>
      <div className={Styles.vertical}>
        <nav className={Styles.navVertical}>
        {selectedUserId ?
        <>
          <Link to={`/user/${selectedUserId.userId}/yoga`}><img src={process.env.PUBLIC_URL + '/assets/icon-zen.svg'} alt="Yoga" /></Link>
          <Link to={`/user/${selectedUserId.userId}/swimming`}><img src={process.env.PUBLIC_URL + '/assets/icon-swim.svg'} alt="Piscine" /></Link>
          <Link to={`/user/${selectedUserId.userId}/bike`}><img src={process.env.PUBLIC_URL + '/assets/icon-bike.svg'} alt="Vélo" /></Link>
          <Link to={`/user/${selectedUserId.userId}/alter`}><img src={process.env.PUBLIC_URL + '/assets/icon-alter.svg'} alt="Poids et haltères" /></Link>
          </>
          :
          <>
          <Link to=''><img src={process.env.PUBLIC_URL + '/assets/icon-zen.svg'} alt="Yoga" /></Link>
          <Link to=''><img src={process.env.PUBLIC_URL + '/assets/icon-swim.svg'} alt="Piscine" /></Link>
          <Link to=''><img src={process.env.PUBLIC_URL + '/assets/icon-bike.svg'} alt="Vélo" /></Link>
          <Link to=''><img src={process.env.PUBLIC_URL + '/assets/icon-alter.svg'} alt="Poids et haltères" /></Link></>}
        </nav>
        <small className={Styles.copiryght}>Copiryght, SportSee 2020</small>
      </div>
    </section>
  )
}

export default NavBar;
