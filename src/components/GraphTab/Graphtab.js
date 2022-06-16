import React, { useState, useTransition } from "react"
import "./GraphTab.css"
import title from "../../assets/images/Title.png"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"

const GraphTab = (props) => {
    const [position, setPosition] = useState(true)
    const [address, setAddress] = useState(props.address)

    function handleClick() {
        setPosition(!position)
        props.click()
        props.setAddress(address)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.setAddress(address)
        handleClick()
    }
    return (
        <div className="graphtab">
            <div className="menu">
                <form
                    onSubmit={handleSubmit}
                    onAbort={() => props.setAddress(address)}
                    className="GraphTab__form"
                >
                    <label>
                        Address:
                        <input
                            className="GraphTab__input"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                </form>
            </div>
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