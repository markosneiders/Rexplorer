import React from "react"
import "./MainPage.css"
import { Graph } from "react-d3-graph"

const Mainpage = () => {
    // graph payload (with minimalist structure)
    const data = {
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
        ],
        focusedNodeId: "nodeIdToTriggerZoomAnimation",
    }

    // the graph configuration, just override the ones you need
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
            alphaTarget: 0.05,
            gravity: -400,
            linkLength: 300,
            linkStrength: 1,
            disableLinkForce: false,
        },
        node: {
            color: "#d3d3d3",
            fontColor: "black",
            fontSize: 12,
            fontWeight: "normal",
            highlightColor: "red",
            highlightFontSize: 12,
            highlightFontWeight: "bold",
            highlightStrokeColor: "SAME",
            highlightStrokeWidth: 1.5,
            labelProperty: "name",
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
            color: "#d3d3d3",
            fontColor: "red",
            fontSize: 10,
            fontWeight: "normal",
            highlightColor: "blue",
            highlightFontSize: 8,
            highlightFontWeight: "bold",
            mouseCursor: "pointer",
            opacity: 1,
            renderLabel: false,
            semanticStrokeWidth: false,
            strokeWidth: 4,
            markerHeight: 6,
            markerWidth: 6,
            strokeDasharray: 0,
            strokeDashoffset: 0,
            strokeLinecap: "butt",
        },
    }

    const onClickNode = function (nodeId) {
        window.alert(`Clicked node ${nodeId}`)
    }

    const onClickLink = function (source, target) {
        window.alert(`Clicked link between ${source} and ${target}`)
    }
    return (
        <div className="root">
            <div className="graph_div">
                <h1 className="graph_title">Currently viewing: Transactions</h1>
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
}

export default Mainpage
