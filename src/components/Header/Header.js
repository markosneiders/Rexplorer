import React from "react"
import "./Header.css"
import title from "../../assets/images/Title.png"

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={title} />
            </div>
        </div>
    )
}

export default Header
