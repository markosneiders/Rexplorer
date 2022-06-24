const defaultConfig = {
    pageSize: 100,
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
        linkLength: 500,
        linkStrength: 1,
        disableLinkForce: false,
    },
    node: {
        color: "#ff3f81",
        fontColor: "white",
        fontSize: 12,
        fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: "bold",
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
export default defaultConfig