import React, { useState, useEffect } from "react"
import "./GraphTab.css"
import title from "../../assets/images/Title.png"
import Select from "react-select"

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import RestoreIcon from "@mui/icons-material/Restore"
import CheckIcon from "@mui/icons-material/Check"
import UndoIcon from "@mui/icons-material/Undo"
const GraphTab = (props) => {
    const [position, setPosition] = useState(true)

    const [address, setAddress] = useState(props.address)
    const [chain, setChain] = useState(props.chain)
    const [config, setConfig] = useState(props.config)

    useEffect(() => {
        updateValues()
        // eslint-disable-next-line
    }, [props.chain, props.address, props.config])

    const handleClick = () => {
        setPosition(!position)
        props.click()
    }
    const updateValues = () => {
        setChain(props.chain)
        setAddress(props.address)
        setConfig(props.config)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.setAddress(address)
        handleClick()
    }

    const handleApply = () => {
        props.setAddress(address)
        props.setChain(chain)
        props.setConfig(config)
        handleClick()
    }
    const handleUndo = () => {
        updateValues()
    }
    const handleRestore = () => {
        props.restore()
    }

    const findLabel = (id) => {
        const found = chains.find((obj) => {
            return obj.value === id
        })
        return found.label
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
        control: (provided) => ({
            ...provided,
            width: 371,
            borderRadius: 8,
            backgroundColor: "#222",
            border: "1px solid #444",
            fontFamily: "Arial, Helvetica, sans-serif",
            boxShadow: "none",
            "&:hover": {
                border: "1px solid #ff3f81",
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14,
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            border: "1px solid #444",
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: 8,
            width: 371,
            backgroundColor: "#222",
            border: "1px solid #444",
        }),
        menuList: (provided) => ({
            ...provided,
            "&::-webkit-scrollbar": {
                width: "0.3em",
            },
            "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px #222",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#666",
                borderRadius: "20px",
            },
        }),
        option: (provided) => ({
            ...provided,
            backgroundColor: "#222",
            fontWeight: "bold",
            color: "#fff",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 14,
            "&:hover": {
                color: "#ff3f81",
            },
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#ff3f81",
        }),
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
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignContent: "center",
                                justifyContent: "space-between",
                                marginTop: "16px",
                            }}
                        >
                            <h3 className="GraphTab__menu-label">Chain:</h3>
                            <Select
                                options={chains}
                                styles={chainStyles}
                                onChange={(e) => setChain(e.value)}
                                value={{
                                    label: findLabel(chain),
                                    value: chain,
                                }}
                            />
                        </div>

                        {/* <button
                            onClick={() =>
                                props.setConfig({
                                    ...props.config,
                                    directed: true,
                                })
                            }
                        ></button> */}
                        <button
                            style={{
                                position: "absolute",
                                right: 0,
                                bottom: 16,
                            }}
                            className="GraphTab__menu-button"
                            onClick={() => handleRestore()}
                        >
                            <RestoreIcon />
                        </button>
                        <button
                            style={{
                                position: "absolute",
                                right: 48,
                                bottom: 16,
                            }}
                            className="GraphTab__menu-button"
                            onClick={() => handleUndo()}
                        >
                            <UndoIcon />
                        </button>
                        <button
                            style={{
                                position: "absolute",
                                right: 96,
                                bottom: 16,
                            }}
                            className="GraphTab__menu-button"
                            onClick={() => handleApply()}
                        >
                            <CheckIcon />
                        </button>
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
