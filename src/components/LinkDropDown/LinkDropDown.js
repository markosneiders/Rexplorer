import React, { useState, useEffect } from "react"
import "./LinkDropDown.css"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"

const LinkDropDown = (props) => {
    useEffect(() => {
        setExpanded(false)
    }, [props.data])

    const [expanded, setExpanded] = useState(false)
    function handleClick() {
        setExpanded(!expanded)
        console.log(props.data)
    }
    return expanded ? (
        <div className="LinkDropDown__main">
            <div
                className="LinkDropDown__header_down"
                onClick={() => handleClick()}
            >
                <ArrowDropUpIcon
                    sx={{
                        color: "#ff3f81",
                        fontSize: 40,
                    }}
                />
                {props.data.block_signed_at}
            </div>
            <div className="LinkDropDown__body">
                <ul className="LinkDropDown__body_ul">
                    <li className="LinkDropDown__body_li">
                        <h4 className="LinkDropDown__body_ul_title">
                            From address:
                        </h4>
                        <h4 className="LinkDropDown__body_ul_text">
                            {` ${props.data.from_address.slice(
                                0,
                                6
                            )}...${props.data.from_address.slice(-4)}`}
                        </h4>
                    </li>
                    <li className="LinkDropDown__body_li">
                        <h4 className="LinkDropDown__body_ul_title">
                            To address:
                        </h4>
                        <h4 className="LinkDropDown__body_ul_text">
                            {` ${props.data.to_address.slice(
                                0,
                                6
                            )}...${props.data.to_address.slice(-4)}`}
                        </h4>
                    </li>
                    <li className="LinkDropDown__body_li">
                        <h4 className="LinkDropDown__body_ul_title">
                            Successful:
                        </h4>
                        <h4 className="LinkDropDown__body_ul_text">
                            {props.data.successful.toString()}
                        </h4>
                    </li>
                    <li className="LinkDropDown__body_li">
                        <h4 className="LinkDropDown__body_ul_title">
                            Gas spent:
                        </h4>
                        <h4 className="LinkDropDown__body_ul_text">
                            {`${props.data.gas_spent} GWEI`}
                        </h4>
                    </li>
                </ul>
            </div>
        </div>
    ) : (
        <div className="LinkDropDown__main">
            <div className="LinkDropDown__header" onClick={() => handleClick()}>
                <ArrowDropDownIcon
                    sx={{
                        color: "#ff3f81",
                        fontSize: 40,
                    }}
                />
                {props.data.block_signed_at}
            </div>
        </div>
    )
}

export default LinkDropDown
