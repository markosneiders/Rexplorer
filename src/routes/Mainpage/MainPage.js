//React and css import
import React from "react"
import "./MainPage.css"
import { useState, useEffect } from "react"

//Component import
import GraphTab from "../../components/GraphTab/Graphtab"
import LinkDropDown from "../../components/LinkDropDown/LinkDropDown"

//Graph default config
import defaultConfig from "./defaultConfig"

//Supported chain import
import chains from "../../components/GraphTab/chains"

//Asset packages
import LoadingSpin from "react-loading-spin"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"

//Packages
import { Graph } from "react-d3-graph"
import axios from "axios"
import { ethers } from "ethers"
import { Modal } from "@mui/material"
import { useSpring, animated } from "react-spring"

const Mainpage = () => {
    //States galore
    const [data, setData] = useState({})
    const graphLinks = []
    const [linkInfo, setLinkInfo] = useState({})
    const [currentLinkInfo, setCurrentLinkInfo] = useState([])
    const [tabDown, setTabDown] = useState(false)
    const [userAddress, setUserAddress] = useState("")
    const [graphAddress, setGraphAddress] = useState("")
    const [chain, setChain] = useState(1)
    const [loading, setLoading] = useState(true)
    const [help, setHelp] = useState(false)
    const [graphConfig, setGraphConfig] = useState(defaultConfig)

    useEffect(() => {
        checkIfWalletIsConnected()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getData()
        console.log(graphConfig)
        // eslint-disable-next-line
    }, [graphAddress, chain, graphConfig])

    //Helper functions
    //Formats address to a more readable format
    const formatAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
    //Returns chain name given id
    const findLabel = (id) => {
        const found = chains.find((obj) => {
            return obj.value === id
        })
        return found.label
    }

    //Animation for settings tab
    const tabAnimation = useSpring({
        to: { bottom: window.innerHeight - 64 },
        from: { bottom: 64 },
        reverse: tabDown,
    })

    //Functions that handle stuff
    //Handles node click
    const onClickNode = function (nodeId) {
        const found = data.nodes.find((obj) => {
            return obj.id === nodeId
        })
        setGraphAddress(found.fullId)
    }
    //Handles link click
    const onClickLink = function (source, target) {
        getLinkByAddress(source, target)
    }
    //Handles settings tab click
    function handleClick() {
        setTabDown(!tabDown)
    }
    //Handles help menu opening and closing
    function openHelp() {
        setHelp(true)
    }
    function closeHelp() {
        setHelp(false)
    }
    //Handles request to restore graph settings to default
    function restore() {
        detailsOn()
        setChain(1)
        setGraphConfig(defaultConfig)
    }

    //Renders link transaction drop down menus
    const dropDowns = currentLinkInfo.map((item) => (
        <LinkDropDown data={item} chain={chain} />
    ))

    //Gets all transactions contained in a link for use by link transaction
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
            // eslint-disable-next-line
            if (data1.indexOf(item[i].from_address) > -1 !== true) {
                data1.push(item[i].from_address)
            } // eslint-disable-next-line
            if (data1.indexOf(item[i].to_address) > -1 !== true) {
                data1.push(item[i].to_address)
            }
        }
        return data1
    }

    //Removes duplicate links
    const dupeLinkRemoval = (item) => {
        const data1 = []
        for (var i = 0; i < item.length; i++) {
            if (
                data1.indexOf(item[i].from_address + item[i].to_address) === -1
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

    //Fetches data from Covalent APIs (Thanks guys!)
    const getData = async () => {
        setLoading(true)
        let response
        try {
            response = await axios.get(
                `https://api.covalenthq.com/v1/${chain}/address/${graphAddress}/transactions_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}&page-size=${graphConfig.pageSize}`
            )

            //removes null from Covalent results
            const no_null_response = response.data.data.items.filter(
                (item) => item.to_address !== null
            )
            await setLinkInfo(no_null_response)

            // Calls functons and creates a list of nodes and links without duplicates to pass on to the graph
            const nodes = await nodeIdGen(no_null_response)
            dupeLinkRemoval(no_null_response)

            await setData({
                nodes: nodes.map((item) => ({
                    id: formatAddress(item),
                    fullId: item,
                })),
                links: graphLinks.map((item) => ({
                    source: item.from_address,
                    target: item.to_address,
                })),
            })
            setLoading(false)
        } catch (err) {
            console.error(err)
        }
    }

    //Gets logged in user address and updates states accordingly
    const detailsOn = async () => {
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const addr = await signer.getAddress()

        await setUserAddress(addr.toString())
        await setGraphAddress(addr.toString())
    }

    //Checks if wallet is connected
    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window

            if (!ethereum) {
                console.log("Use Metamask!")
            } else {
                console.log("Ethereum object found", ethereum)
                detailsOn()
            }

            const accounts = await ethereum.request({ method: "eth_accounts" })

            if (accounts !== 0) {
                const account = accounts[0]
                console.log("Found an authorized account ", account)
                detailsOn()
            } else {
                console.log("Could not find an authorized account")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="MainPage">
            <button
                style={{
                    position: "absolute",
                    right: 16,
                    top: 16,
                }}
                className="MainPage__helpButton"
                onClick={() => openHelp()}
            >
                <QuestionMarkIcon />
            </button>
            <Modal open={help} onClose={() => closeHelp()}>
                <div className="MainPage__help">
                    <h1 className="MainPage__help-title">Graph</h1>
                    <h1 className="MainPage__help-text">
                        Welcome to Rexplorer. Currently in the center of the
                        screen should be a graph displaying your recent
                        transactions. If not you haven't made any. Hovering over
                        a node will highlight all the connected nodes. To
                        navigate around the graph click and drag to pan around
                        and use the sroll whell to zoom. Each node can also be
                        repositioned by draging it.
                    </h1>
                    <h1 className="MainPage__help-title">Link transactions</h1>
                    <h1 className="MainPage__help-text">
                        To get started exploring click on a link. You should see
                        one or multiple items in the link transactions screen.
                        Clicking on one will expand it and show the transactions
                        info. From there you can copy the relevant data or click
                        on the top right icon to open in etherscan. (Only
                        avaivable on the ethereum mainnet)
                    </h1>
                    <h1 className="MainPage__help-title">Exploring</h1>
                    <h1 className="MainPage__help-text">
                        On the top left you can see the current address (by
                        default yours) you are viewing aswell as the chain.
                        (This will come in handy in a bit). Clicking on a node
                        will select it as the main address and change the graph
                        to show it's transactions. If you ever get lost you can
                        click the "Go Back To You" button and return to your
                        address.
                    </h1>
                    <h1 className="MainPage__help-title">Customization</h1>
                    <h1 className="MainPage__help-text">
                        Clicking on the top header will open the seetings tab.
                        From here you can manually enter and address to explore
                        aswell as the chain. Other options include changing the
                        amount of transactions, link length and type. (Be warned
                        high transaction counts will impact performance).
                    </h1>
                </div>
            </Modal>
            <div className="MainPage__GraphAddress">
                <h2 className="MainPage__GraphAddress-text">
                    Currently Viewing
                </h2>
                <h3
                    className="MainPage__GraphAddress-text"
                    style={{ color: "#ff3f81" }}
                >
                    {formatAddress(graphAddress)}
                </h3>
                <h3 className="MainPage__GraphAddress-text">{`On ${findLabel(
                    chain
                )}`}</h3>
                {graphAddress === userAddress ? (
                    <h5 className="MainPage__GraphAddress-text">
                        (Your Address)
                    </h5>
                ) : (
                    <h4
                        className="MainPage__GraphAddress-goBack"
                        onClick={() => setGraphAddress(userAddress)}
                    >
                        Go Back To You
                    </h4>
                )}
            </div>
            <div className="MainPage__GraphInfo">
                <h3 className="MainPage__GraphInfo-title">Link transactions</h3>
                <div className="MainPage__GraphInfo-dropDowns">{dropDowns}</div>
            </div>
            <animated.div className="MainPage__tab" style={tabAnimation}>
                <GraphTab
                    click={handleClick}
                    address={graphAddress}
                    setAddress={setGraphAddress}
                    config={graphConfig}
                    setConfig={setGraphConfig}
                    chain={chain}
                    setChain={setChain}
                    restore={restore}
                />
            </animated.div>
            {loading ? (
                <div
                    className="MainPage__loading"
                    style={{ height: window.innerHeight }}
                >
                    <LoadingSpin
                        primaryColor={"#ff3f81"}
                        secondaryColor={"#222"}
                    />
                </div>
            ) : (
                <Graph
                    id="graph-id"
                    data={data}
                    config={graphConfig}
                    onClickNode={onClickNode}
                    onClickLink={onClickLink}
                />
            )}
        </div>
    )
}

export default Mainpage
