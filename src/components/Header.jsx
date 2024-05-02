import { Link } from 'react-router-dom';
import Logo from '../assets/pokemartlogo.png';

function Header() {
    return (
        <header className="header">
            <div>
                <Link to="/" >
                    <img src={Logo} style={{ width: 150 }} alt="Pokemart Logo" />
                </Link>
            </div>
        </header>
    );
}

export default Header;
