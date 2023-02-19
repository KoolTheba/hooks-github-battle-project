import React, {useContext} from "react"
import ThemeContext from "../contexts/theme"
import { NavLink } from 'react-router-dom'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

const Nav = ({toggleTheme}) => {
    const theme = useContext(ThemeContext)

    return (
        <nav className="row space-between">
            <ul className="row nav">
                <li>
                    <NavLink
                        to={'/'}
                        exact
                        className='nav-link'
                        activeStyle={activeStyle}
                    >
                    Popular
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'/battle'} 
                        className='nav-link'
                        activeStyle={activeStyle}
                    >
                    Battle
                    </NavLink>
                </li>
            </ul>
            <button
                style={{ fontSize: 30}}
                className="btn-clear"
                onClick={toggleTheme}
            >
            {theme === 'light' ? '🔦' : '💡'}
            </button>
        </nav>
    )
}

export default Nav
