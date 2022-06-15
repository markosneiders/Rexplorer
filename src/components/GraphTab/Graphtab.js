import React, { useState, useTransition } from "react"
import "./GraphTab.css"
import title from "../../assets/images/Title.png"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"

const GraphTab = () => {
    const [position, setPosition] = useState(true)

    function handleClick() {
        setPosition(!position)
    }
    return (
        <div className="graphtab">
            <div className="menu"></div>
            <div className="logo-container" onClick={() => handleClick()}>
                <img className="logo" src={title} alt="Rexplorer" />
                {position ? (
                    <ArrowDropDownIcon
                        sx={{
                            color: "#ff3f81",
                            fontSize: 20,
                        }}
                    />
                ) : (
                    <ArrowDropUpIcon
                        sx={{
                            color: "#ff3f81",
                            fontSize: 20,
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default GraphTab
