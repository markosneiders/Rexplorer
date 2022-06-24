import React, { useState, useEffect } from "react"
import "./GraphTab.css"
import title from "../../assets/images/Title.png"
import Select from "react-select"
import { Slider } from "@mui/material"

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import RestoreIcon from "@mui/icons-material/Restore"
import CheckIcon from "@mui/icons-material/Check"
import UndoIcon from "@mui/icons-material/Undo"

import chains from "./chains"

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
        updateValues()
    }

    const findLabel = (object, id) => {
        const found = object.find((obj) => {
            return obj.value === id
        })
        return found.label
    }

    const linkTypes = [
        { value: "CURVE_SMOOTH", label: "Curved" },
        { value: "STRAIGHT", label: "Straight" },
        { value: "CURVE_FULL", label: "Extra curvy" },
    ]

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            width: 230,
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
            width: 230,
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
                    <button
                        style={{
                            position: "absolute",
                            right: 16,
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
                            right: 64,
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
                            right: 112,
                            bottom: 16,
                        }}
                        className="GraphTab__menu-button"
                        onClick={() => handleApply()}
                    >
                        <CheckIcon />
                    </button>
                    <h3 className="GraphTab__menu-title">Graph settings</h3>
                    <div
                        className="GraphTab__menu-container"
                        style={{ borderBottom: "1px solid #333" }}
                    >
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
                        <div className="GraphTab__menu-containerItem">
                            <h3 className="GraphTab__menu-label">Chain:</h3>
                            <Select
                                options={chains}
                                styles={selectStyles}
                                onChange={(e) => setChain(e.value)}
                                value={{
                                    label: findLabel(chains, chain),
                                    value: chain,
                                }}
                            />
                        </div>
                    </div>
                    <div className="GraphTab__menu-container">
                        <div className="GraphTab__menu-containerItem">
                            <h3 className="GraphTab__menu-label">
                                Transaction count:
                            </h3>
                            <Slider
                                defaultValue={100}
                                valueLabelDisplay="auto"
                                value={config.pageSize}
                                step={100}
                                min={100}
                                max={2000}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        pageSize: e.target.value,
                                    })
                                }
                                sx={{
                                    color: "#ff3f81",
                                    width: "230px",
                                    "& .MuiSlider-valueLabel": {
                                        color: "#fff",
                                        backgroundColor: "#444",
                                    },
                                    "& .MuiSlider-thumb": {
                                        boxShadow: "0 0px 0px #ff3f81",
                                    },
                                    "& .MuiSlider-track": {
                                        border: "none",
                                    },
                                }}
                            />
                        </div>
                        <div className="GraphTab__menu-containerItem">
                            <h3 className="GraphTab__menu-label">
                                Link length:
                            </h3>
                            <Slider
                                defaultValue={500}
                                valueLabelDisplay="auto"
                                value={config.d3.linkLength}
                                step={50}
                                min={50}
                                max={1000}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        d3: {
                                            ...config.d3,
                                            linkLength: e.target.value,
                                        },
                                    })
                                }
                                sx={{
                                    color: "#ff3f81",
                                    width: "230px",
                                    "& .MuiSlider-valueLabel": {
                                        color: "#fff",
                                        backgroundColor: "#444",
                                    },
                                    "& .MuiSlider-thumb": {
                                        boxShadow: "0 0px 0px #ff3f81",
                                    },
                                    "& .MuiSlider-track": {
                                        border: "none",
                                    },
                                }}
                            />
                        </div>
                        <div className="GraphTab__menu-containerItem">
                            <h3 className="GraphTab__menu-label">Link type:</h3>
                            <Select
                                options={linkTypes}
                                styles={selectStyles}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        link: {
                                            ...config.link,
                                            type: e.value,
                                        },
                                    })
                                }
                                value={{
                                    label: findLabel(
                                        linkTypes,
                                        config.link.type
                                    ),
                                    value: config.link.type,
                                }}
                            />
                        </div>
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
