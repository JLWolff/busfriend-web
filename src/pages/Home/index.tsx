import './styles.css';
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

const Home = () => {
    return(
        <div id="page-home">
            <div className="header">
                <header>
                    <img src={logo} alt="EcoletaIMG"/>

                    
                </header>
            </div>    
            <div className="content">
                <main>
                    <h1>Sua melhor forma de chegar na paragem sempre na hora.</h1>
                    <p>Organizamos o tempo dos autocarros nas paragens em tempo real para que tornar o transporte no porto mais eficiente.</p>
                    <Link to="/busfriend-web/stops">
                        <span>
                            <FiSearch />
                        </span>
                        <strong>
                            Procurar uma paragem
                        </strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;