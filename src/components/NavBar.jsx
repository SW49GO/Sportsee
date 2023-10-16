import { Link} from 'react-router-dom';
import {useContext} from 'react'
import Styles from '../styles/NavBar.module.css'; 
import {Context} from '../components/Context'


function NavBar() {
// récupération de l'Id de l'utilisateur
  const { selectedUserId } = useContext(Context);
  console.log('selectedUserIdNAVBAR:', selectedUserId)

  return (
    <section>
      <div className={Styles.horizontal}>
        <article className={Styles.navLogo}>
          <div className={Styles.logo}>
            {/* chemin d'accès statique aux fichiers à partir du dossier /public*/}
          <img src={process.env.PUBLIC_URL + '/assets/Logo.svg'} alt="Logo sportSee" />
          <img src={process.env.PUBLIC_URL + '/assets/sportsee.svg'} alt="SportSee" />
          </div>
        </article>
        <nav className={Styles.navHorizontal}>
        {selectedUserId ?
          <>
          <Link to={`/user/${selectedUserId.userId}/home`}>Accueil</Link>
          <Link to={`/user/${selectedUserId.userId}`}>Profil</Link> 
          <Link to={`/user/${selectedUserId.userId}/settings`}>Réglages</Link>
          <Link to={`/user/${selectedUserId.userId}/community`}>Communauté</Link>
          </>
          : 
          <>
          <Link to="">Accueil</Link>
          <Link to="">Profil</Link>
          <Link to="">Réglages</Link>
          <Link to="">Communauté</Link>
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
          <Link><img src={process.env.PUBLIC_URL + '/assets/icon-zen.svg'} alt="Yoga" /></Link>
          <Link><img src={process.env.PUBLIC_URL + '/assets/icon-swim.svg'} alt="Piscine" /></Link>
          <Link><img src={process.env.PUBLIC_URL + '/assets/icon-bike.svg'} alt="Vélo" /></Link>
          <Link><img src={process.env.PUBLIC_URL + '/assets/icon-alter.svg'} alt="Poids et haltères" /></Link></>}
        </nav>
        <small className={Styles.copiryght}>Copiryght, SportSee 2020</small>
      </div>
    </section>
  )
}

export default NavBar;
