import HeaderImg from '../assets/header-image.png'
import Toggle from './Toggle';

const Header = (props) => {
    return (
        <header>
            <h1 className='sr-only'>Back to the Acronym</h1>
            <img src={HeaderImg} alt="Back to the Acronym" />
            <Toggle theme={props.theme} toggleTheme={props.toggleTheme} />
        </header>
    )
}

export default Header;