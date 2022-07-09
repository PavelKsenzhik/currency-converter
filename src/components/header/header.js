import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../icons/logo.svg'
import './header.scss'

function Header() {

    return (
        <header className="header">
            <Link to="/main">
                <Logo className="header__logo"/>
            </Link>

        </header>
    )
}

export default Header;