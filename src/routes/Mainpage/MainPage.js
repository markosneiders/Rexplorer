import React from "react"
import "./MainPage.css"
import { Graph } from "react-d3-graph"
import axios from "axios"
import { useState, useEffect } from "react"
import GraphTab from "../../components/GraphTab/Graphtab"
import LinkDropDown from "../../components/LinkDropDown/LinkDropDown"

//const graphAddress = "0xa79E63e78Eec28741e711f89A672A4C40876Ebf3"
//const graphAddress = "0xf67026be4122B07259785C13adCeb0bAaBB3e068"
//const graphAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

const Mainpage = () => {
    const [data, setData] = useState({
        nodes: [{ id: "Loading" }],
        links: [],
        focusedNodeId: "nodeIdToTriggerZoomAnimation",
    })
    const graphLinks = []
    const [linkInfo, setLinkInfo] = useState({})
    const [currentLinkInfo, setCurrentLinkInfo] = useState([])
    const [tabDown, setTabDown] = useState(false)

    const [graphAddress, setGraphAddress] = useState(
        "0xf67026be4122B07259785C13adCeb0bAaBB3e068"
    )
    const myConfig = {
        automaticRearrangeAfterDropNode: false,
        collapsible: false,
        directed: false,
        focusAnimationDuration: 0.75,
        focusZoom: 1,
        freezeAllDragEvents: false,
        height: window.innerHeight,
        highlightDegree: 1,
        highlightOpacity: 0.2,
        linkHighlightBehavior: true,
        maxZoom: 8,
        minZoom: 0.1,
        nodeHighlightBehavior: true,
        panAndZoom: false,
        staticGraph: false,
        staticGraphWithDragAndDrop: false,
        width: window.innerWidth,
        d3: {
            alphaTarget: 1,
            gravity: -250,
            linkLength: 100,
            linkStrength: 1,
            disableLinkForce: false,
        },
        node: {
            color: "#ff3f81",
            fontColor: "white",
            fontSize: 12,
            fontWeight: "normal",
            highlightColor: "#ffffff",
            highlightFontSize: 18,
            highlightFontWeight: "bold",
            highlightStrokeColor: "#ff3f81",
            highlightStrokeWidth: 1.5,
            labelProperty: "id",
            mouseCursor: "pointer",
            opacity: 1,
            renderLabel: true,
            size: 450,
            strokeColor: "none",
            strokeWidth: 1.5,
            svg: "",
            symbolType: "circle",
        },
        link: {
            color: "#ffffff",
            fontColor: "red",
            fontSize: 10,
            fontWeight: "normal",
            highlightColor: "#ff3f81",
            highlightFontSize: 8,
            highlightFontWeight: "bold",
            mouseCursor: "pointer",
            opacity: 0.5,
            renderLabel: false,
            semanticStrokeWidth: true,
            strokeWidth: 5,
            markerHeight: 6,
            markerWidth: 6,
            strokeDasharray: 0,
            strokeDashoffset: 0,
            strokeLinecap: "round",
            type: "CURVE_SMOOTH",
        },
    }
    const formatAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    const onClickNode = function (nodeId) {
        window.alert(`Clicked node ${nodeId}`)
    }

    const onClickLink = function (source, target) {
        getLinkByAddress(source, target)
    }
    const getLinkByAddress = (address1, address2) => {
        const allId = []
        const returnData = []
        const inputId = formatAddress(address1) + formatAddress(address2)
        for (var i = 0; i < linkInfo.length; i++) {
            allId.push({
                id:
                    formatAddress(linkInfo[i].from_address) +
                    formatAddress(linkInfo[i].to_address),
                index: i,
            })
        }
        const filtered = allId.filter((trans) => {
            return trans.id === inputId
        })
        for (var x = 0; x < filtered.length; x++) {
            returnData[x] = linkInfo[filtered[x].index]
        }
        setCurrentLinkInfo(returnData)
    }
    //Generates a list of all nodes invovled with transactions (without duplicates)
    const nodeIdGen = (item) => {
        const data1 = []
        for (var i = 0; i < item.length; i++) {
            if (data1.indexOf(item[i].from_address) > -1 !== true) {
                data1.push(item[i].from_address)
            }
            if (data1.indexOf(item[i].to_address) > -1 !== true) {
                data1.push(item[i].to_address)
            }
        }
        return data1
    }

    const dupeLinkRemoval = (item) => {
        const data1 = []
        for (var i = 0; i < item.length; i++) {
            if (
                data1.indexOf(item[i].from_address + item[i].to_address) == -1
            ) {
                data1.push(item[i].from_address + item[i].to_address)
            }
        }
        for (var x = 0; x < data1.length; x++) {
            graphLinks.push({
                from_address: formatAddress(data1[x].slice(0, 42)),
                to_address: formatAddress(data1[x].slice(-42)),
            })
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get(
                `https://api.covalenthq.com/v1/1/address/${graphAddress}/transactions_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}&page-size=100`
            )
            console.log(response)
            //removes null from Covalent results
            const no_null_response = response.data.data.items.filter(
                (item) => item.to_address !== null
            )
            await setLinkInfo(no_null_response)

            // Calls functons and creates a list of nodes and links without duplicates to pass on to the graph
            const nodes = await nodeIdGen(no_null_response)
            dupeLinkRemoval(no_null_response)
            console.log(no_null_response)

            await setData({
                nodes: nodes.map((item) => ({
                    id: formatAddress(item),
                })),
                links: graphLinks.map((item) => ({
                    source: item.from_address,
                    target: item.to_address,
                })),
                focusedNodeId: "nodeIdToTriggerZoomAnimation",
            })
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getData()
        console.log("GetData")
    }, [graphAddress])

    function handleClick() {
        setTabDown(!tabDown)
    }
    const dropDowns = currentLinkInfo.map((item) => (
        <LinkDropDown data={item} />
    ))

    return (
        <div className="root">
            <div className="graph_info">
                <h3 className="graph_title">Link transactions</h3>
                <div className="drop_down_div">{dropDowns}</div>
            </div>
            <div
                className="tab_div"
                style={{
                    bottom: tabDown ? "64px" : window.innerHeight - 64,
                }}
            >
                <GraphTab
                    click={handleClick}
                    address={graphAddress}
                    setAddress={setGraphAddress}
                />
            </div>
            <Graph
                id="graph-id"
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
            />
        </div>
    )
}

export default Mainpage
