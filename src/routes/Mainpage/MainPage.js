import React from "react"
import "./MainPage.css"
import { Graph } from "react-d3-graph"
import axios from "axios"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import GraphTab from "../../components/GraphTab/Graphtab"
import LinkDropDown from "../../components/LinkDropDown/LinkDropDown"
import defaultConfig from "./defaultConfig"
import LoadingSpin from "react-loading-spin"
import chains from "../../components/GraphTab/chains"

//const graphAddress = "0xa79E63e78Eec28741e711f89A672A4C40876Ebf3"
//const graphAddress = "0xf67026be4122B07259785C13adCeb0bAaBB3e068"
//const graphAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

const Mainpage = () => {
    const [data, setData] = useState({})
    const graphLinks = []
    const [linkInfo, setLinkInfo] = useState({})
    const [currentLinkInfo, setCurrentLinkInfo] = useState([])
    const [tabDown, setTabDown] = useState(false)
    const [userAddress, setUserAddress] = useState("")
    const [graphAddress, setGraphAddress] = useState("")
    const [chain, setChain] = useState(1)
    const [loading, setLoading] = useState(true)
    const [graphConfig, setGraphConfig] = useState(defaultConfig)

    const formatAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    const onClickNode = function (nodeId) {
        const found = data.nodes.find((obj) => {
            return obj.id === nodeId
        })
        setGraphAddress(found.fullId)
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

    const detailsOn = async () => {
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const addr = await signer.getAddress()

        await setUserAddress(addr.toString())
        await setGraphAddress(addr.toString())
    }

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

    useEffect(() => {
        checkIfWalletIsConnected()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getData()
        console.log(graphConfig)
        // eslint-disable-next-line
    }, [graphAddress, chain, graphConfig])

    function handleClick() {
        setTabDown(!tabDown)
    }
    function restore() {
        detailsOn()
        setChain(1)
        setGraphConfig(defaultConfig)
    }
    const dropDowns = currentLinkInfo.map((item) => (
        <LinkDropDown data={item} chain={chain} />
    ))

    const findLabel = (id) => {
        const found = chains.find((obj) => {
            return obj.value === id
        })
        return found.label
    }

    return (
        <div className="MainPage">
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
            <div
                className="MainPage__tab"
                style={{
                    bottom: tabDown ? "64px" : window.innerHeight - 64,
                }}
            >
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
            </div>
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
