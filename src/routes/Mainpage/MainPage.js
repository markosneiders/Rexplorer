import React from "react"
import "./MainPage.css"
import { Graph } from "react-d3-graph"
import axios from "axios"
import { useState, useEffect } from "react"

const graphAddress = "0xa79E63e78Eec28741e711f89A672A4C40876Ebf3"

const Mainpage = () => {
    const [data, setData] = useState({
        nodes: [{ id: "Loading" }],
        links: [],
        focusedNodeId: "nodeIdToTriggerZoomAnimation",
    })
    const [currentNode, setCurrentNode] = useState({
        name: "",
    })

    const myConfig = {
        automaticRearrangeAfterDropNode: false,
        collapsible: false,
        directed: false,
        focusAnimationDuration: 0.75,
        focusZoom: 1,
        freezeAllDragEvents: false,
        height: 800,
        highlightDegree: 1,
        highlightOpacity: 0.2,
        linkHighlightBehavior: true,
        maxZoom: 8,
        minZoom: 0.1,
        nodeHighlightBehavior: true,
        panAndZoom: false,
        staticGraph: false,
        staticGraphWithDragAndDrop: false,
        width: 800,
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
            strokeWidth: 1,
            markerHeight: 6,
            markerWidth: 6,
            strokeDasharray: 0,
            strokeDashoffset: 0,
            strokeLinecap: "round",
            type: "CURVE_SMOOTH",
        },
    }

    const onClickNode = function (nodeId) {
        window.alert(`Clicked node ${nodeId}`)
    }

    const onClickLink = function (source, target) {
        window.alert(`Clicked link between ${source} and ${target}`)
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

    // Removes duplicate transactions for graph pourposes (react freaks out about objects having the same keys)
    const dupeLinkRemoval = (item) => {
        const data1 = []
        const data2 = []
        for (var i = 0; i < item.length; i++) {
            if (
                data1.indexOf(item[i].from_address + item[i].to_address) >
                    -1 !==
                true
            ) {
                data1.push(item[i].from_address + item[i].to_address)
            }
        }
        for (var i = 0; i < data1.length; i++) {
            data2.push({
                from_address: data1[i].slice(0, 42),
                to_address: data1[i].slice(-42),
            })
        }
        return data2
    }

    const getData = async () => {
        try {
            const response = await axios.get(
                `https://api.covalenthq.com/v1/1/address/${graphAddress}/transactions_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}`
            )
            //removes null from Covalent results
            const no_null_response = response.data.data.items.filter(
                (item) => item.to_address !== null
            )

            // Calls functons and creates a list of nodes and links without duplicates to pass on to the graph
            const nodes = await nodeIdGen(no_null_response)
            const links = await dupeLinkRemoval(no_null_response)

            await setData({
                nodes: nodes.map((item) => ({
                    id: `${item.slice(0, 6)}...${item.slice(-4)}`,
                    symbolType: item == graphAddress ? "square" : "",
                })),
                links: [],
                links: links.map((item) => ({
                    source: `${item.from_address.slice(
                        0,
                        6
                    )}...${item.from_address.slice(-4)}`,
                    target: `${item.to_address.slice(
                        0,
                        6
                    )}...${item.to_address.slice(-4)}`,
                })),
                focusedNodeId: "nodeIdToTriggerZoomAnimation",
            })
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    // the graph configuration, just override the ones you need

    try {
        return (
            <div className="root">
                <div className="graph_div" style={{ width: 580, height: 800 }}>
                    <h1 className="graph_title">Graph configuration</h1>
                </div>
                <div className="info_div">
                    <div className="graph_info">
                        <h3 className="graph_title">Current node</h3>
                    </div>
                    <div className="graph_settings">
                        <h3 className="graph_title">Graph customization</h3>
                    </div>
                </div>
                <div className="graph_div">
                    <h1
                        className="graph_title"
                        style={{ position: "absolute" }}
                    >
                        Currently viewing: Transactions
                    </h1>
                    <Graph
                        id="graph-id" // id is mandatory
                        data={data}
                        config={myConfig}
                        onClickNode={onClickNode}
                        onClickLink={onClickLink}
                    />
                </div>
            </div>
        )
    } catch {}
}

export default Mainpage
