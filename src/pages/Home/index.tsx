import './styles.css';
import { FiSearch, FiLinkedin, FiGithub } from 'react-icons/fi'
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
                    <Link to="/stops">
                        <span>
                            <FiSearch />
                        </span>
                        <strong>
                            Procurar uma paragem
                        </strong>
                    </Link>
                </main>
            </div>
            <div className='footer-class'>
            <footer>
                Developed by Joao Wolff
                <a href="https://www.linkedin.com/in/joao-lucas-wolff-3465131aa/" target="_blank">
                    <span><FiLinkedin/></span>
                </a>
                <a href="https://github.com/JLWolff" target="_blank">
                <span><FiGithub/></span>
                </a>
            </footer>
            </div>
        </div>
    );
}

export default Home;