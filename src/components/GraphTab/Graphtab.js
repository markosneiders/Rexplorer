import React, { useState } from "react"
import "./GraphTab.css"
import title from "../../assets/images/Title.png"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import Select from "react-select"

const GraphTab = (props) => {
    const [position, setPosition] = useState(true)
    const [address, setAddress] = useState(props.address)

    function handleClick() {
        setPosition(!position)
        props.click()
        setAddress(props.address)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.setAddress(address)
        handleClick()
    }

    const chains = [
        { value: 1, label: "Ethereum Mainnet" },
        { value: 42, label: "Ethereum Testnet Kovan" },
        { value: 137, label: "Matic (Polygon) Mainnet" },
        { value: 80001, label: "Matic (Polygon) Testnet Mumbai" },
        { value: 43114, label: "Avalanche C-Chain Mainnet" },
        { value: 43113, label: "Avalanche Fuji Testnet" },
        { value: 56, label: "Binance Smart Chain" },
        { value: 97, label: "Binance Smart Chain Testnet" },
        { value: 1284, label: "Moonbeam Mainnet" },
        { value: 1287, label: "Moonbeam Moonbase Alpha" },
        { value: 1285, label: "Moonbeam Moonriver" },
        { value: 30, label: "RSK Mainnet" },
        { value: 31, label: "RSK Testnet" },
        { value: 42161, label: "Arbitrum Mainnet" },
        { value: 421611, label: "Arbitrum Testnet" },
        { value: 250, label: "Fantom Opera" },
        { value: 4002, label: "Fantom Testnet" },
        { value: 11297108109, label: "Palm Mainnet" },
        { value: 11297108099, label: "Palm Testnet" },
        { value: 8217, label: "Klaytn Mainnet" },
        { value: 128, label: "HECO Mainnet" },
        { value: 256, label: "HECO Testnet" },
        { value: 71393, label: "Nervos Polyjuice Testnet" },
        { value: 2020, label: "Axie Mainnet" },
        { value: 9001, label: "EVMOS Mainnet" },
        { value: 9000, label: "EVMOS Testnet" },
        { value: 592, label: "Astar Mainnet" },
        { value: 336, label: "Astar Shiden" },
        { value: 4689, label: "IoTeX Mainnet" },
        { value: 4690, label: "IoTeX Testnet" },
        { value: 1666600000, label: "Harmony Mainnet" },
        { value: 1666700000, label: "Harmony Testnet" },
        { value: 1313161554, label: "Aurora Mainnet" },
        { value: 1313161555, label: "Aurora Testnet" },
        { value: 1131378225, label: "Covalent Internal V1" },
    ]

    const chainStyles = {
        // option: (provided, state) => ({
        //     ...provided,
        //     borderBottom: "1px dotted pink",
        //     color: state.isSelected ? "red" : "blue",
        //     padding: 20,
        // }),
        // control: () => ({
        //     // none of react-select's styles are passed to <Control />
        //     width: 200,
        // }),
        // singleValue: (provided, state) => {
        //     const opacity = state.isDisabled ? 0.5 : 1
        //     const transition = "opacity 300ms"
        //     return { ...provided, opacity, transition }
        // },
    }

    return (
        <div className="GraphTab">
            <div className="GraphTab__menuBack">
                <div className="GraphTab__menu">
                    <h3 className="GraphTab__menu-title">Graph settings</h3>
                    <div className="GraphTab__menu-container">
                        <form
                            onSubmit={handleSubmit}
                            onAbort={() => props.setAddress(address)}
                            className="GraphTab__menu-form"
                        >
                            <label className="GraphTab__menu-label">
                                Address:
                                <input
                                    className="GraphTab__menu-input"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </label>
                        </form>
                        <div style={{ height: "100px" }}>
                            <Select options={chains} styles={chainStyles} />
                        </div>

                        {/* <button
                            onClick={() =>
                                props.setConfig({
                                    ...props.config,
                                    directed: true,
                                })
                            }
                        ></button> */}
                    </div>
                </div>
            </div>

            <div
                className="GraphTab__menu_logoContainer"
                onClick={() => handleClick()}
            >
                <img
                    className="GraphTab__menu_logo"
                    src={title}
                    alt="Rexplorer"
                />
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
