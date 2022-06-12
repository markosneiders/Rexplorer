import React from "react"
import { NavLink } from "react-router-dom"
import "./NavBar.css"

const Navbar = () => {
    let activeStyle = {
        textDecoration: "underline",
    }
    return (
        <div className="nav-bar">
            <div className="links">
                <NavLink
                    className={"link"}
                    to="LandingPage"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Messages
                </NavLink>
                <NavLink
                    className={"link"}
                    to="messages"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Tasks
                </NavLink>
                <NavLink
                    className={"link"}
                    to="messages"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    About
                </NavLink>
                <NavLink
                    className={"link"}
                    to="messages"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Messages
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
