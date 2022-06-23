import React, { useState, useEffect } from "react"
import "./LinkDropDown.css"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

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
        <div className="LinkDropDown">
            <div
                className="LinkDropDown__header-down"
                onClick={() => handleClick()}
            >
                <ArrowDropUpIcon
                    sx={{
                        color: "#ff3f81",
                        fontSize: 50,
                    }}
                />
                {`${props.data.block_signed_at.slice(
                    0,
                    10
                )} ${props.data.block_signed_at.slice(11, 19)}`}

                {/* Check if currently on ethereum mainnet for open in etherscan */}
                {props.chain === 1 ? (
                    <a
                        href={`https://etherscan.io/tx/${props.data.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ position: "absolute", right: 4, top: 3 }}
                    >
                        <OpenInNewIcon
                            sx={{
                                color: "#ff3f81",
                                fontSize: 25,
                            }}
                        />
                    </a>
                ) : null}
            </div>
            <div className="LinkDropDown__body">
                <ul className="LinkDropDown__body-ul">
                    <li className="LinkDropDown__body-li">
                        <h4 className="LinkDropDown__body-ul-title">
                            From address:
                        </h4>
                        <h4 className="LinkDropDown__body-ul-text">
                            {` ${props.data.from_address.slice(
                                0,
                                6
                            )}...${props.data.from_address.slice(-4)}`}
                            <ContentCopyIcon
                                sx={{
                                    color: "#ff3f81",
                                    fontSize: 15,
                                    marginLeft: "4px",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        props.data.from_address
                                    )
                                }
                            />
                        </h4>
                    </li>
                    <li className="LinkDropDown__body-li">
                        <h4 className="LinkDropDown__body-ul-title">
                            To address:
                        </h4>
                        <h4 className="LinkDropDown__body-ul-text">
                            {` ${props.data.to_address.slice(
                                0,
                                6
                            )}...${props.data.to_address.slice(-4)}`}
                            <ContentCopyIcon
                                sx={{
                                    color: "#ff3f81",
                                    fontSize: 15,
                                    marginLeft: "4px",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        props.data.to_address
                                    )
                                }
                            />
                        </h4>
                    </li>
                    <li className="LinkDropDown__body-li">
                        <h4 className="LinkDropDown__body-ul-title">
                            Tx hash:
                        </h4>
                        <h4 className="LinkDropDown__body-ul-text">
                            {` ${props.data.tx_hash.slice(
                                0,
                                6
                            )}...${props.data.tx_hash.slice(-4)}`}
                            <ContentCopyIcon
                                sx={{
                                    color: "#ff3f81",
                                    fontSize: 15,
                                    marginLeft: "4px",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        props.data.tx_hash
                                    )
                                }
                            />
                        </h4>
                    </li>
                    <li className="LinkDropDown__body-li">
                        <h4 className="LinkDropDown__body-ul-title">
                            Block height:
                        </h4>
                        <h4 className="LinkDropDown__body-ul-text">
                            {props.data.block_height}
                        </h4>
                    </li>
                    <li className="LinkDropDown__body-li">
                        <h4 className="LinkDropDown__body-ul-title">
                            Successful:
                        </h4>
                        <h4 className="LinkDropDown__body-ul-text">
                            {props.data.successful.toString()}
                        </h4>
                    </li>
                    <li className="LinkDropDown__body-li">
                        <h4 className="LinkDropDown__body-ul-title">
                            Gas spent:
                        </h4>
                        <h4 className="LinkDropDown__body-ul-text">
                            {`${props.data.gas_spent} GWEI`}
                        </h4>
                    </li>
                    <li className="LinkDropDown__body-li">
                        <h4 className="LinkDropDown__body-ul-title">
                            Currency:
                        </h4>
                        <h4 className="LinkDropDown__body-ul-text">
                            {props.data.to_address_label}
                        </h4>
                    </li>
                </ul>
            </div>
        </div>
    ) : (
        <div className="LinkDropDown">
            <div
                className="LinkDropDown__header-up"
                onClick={() => handleClick()}
            >
                <ArrowDropDownIcon
                    sx={{
                        color: "#ff3f81",
                        fontSize: 50,
                    }}
                />
                {`${props.data.block_signed_at.slice(
                    0,
                    10
                )} ${props.data.block_signed_at.slice(11, 19)}`}
            </div>
        </div>
    )
}

export default LinkDropDown
