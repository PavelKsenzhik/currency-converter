import { ReactComponent as Logo } from '../../icons/logo.svg'
import './header.scss'

function Header() {

    return (
        <header className="header">
            <Logo className="header__logo"/>
        </header>
    )
}

export default Header;