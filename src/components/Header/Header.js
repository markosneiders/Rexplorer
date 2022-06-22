import React from "react"
import "./Header.css"
import title from "../../assets/images/Title.png"

const Header = () => {
    return (
        <div className="Header">
            <div className="Header__container">
                <img
                    className="Header__container-logo"
                    src={title}
                    alt="Rexplorer"
                />
            </div>
        </div>
    )
}

export default Header
