import React from "react"
import "./Header.css"
import title from "../../assets/images/Title.png"

const Header = () => {
    return (
        <div className="header__header">
            <div className="header__logo-container">
                <img className="header__logo" src={title} alt="Rexplorer" />
            </div>
        </div>
    )
}

export default Header
