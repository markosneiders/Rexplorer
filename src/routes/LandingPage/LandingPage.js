import React, { useState, useEffect, useRef } from "react"
import Header from "../../components/Header/Header"
import ConnectWalletButton from "../../components/MetaMaskAuth/ConnectWalletButton"
import "./LandingPage.css"
import NET from "vanta/dist/vanta.net.min"
import UAuth from "@uauth/js"
import Web3 from "web3"
import * as THREE from "three"
import Metamask from "../../assets/images/metamask.png"
import Unstoppable from "../../assets/images/unstoppable.png"

const LandingPage = () => {
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState("")

    const [vantaEffect, setVantaEffect] = useState(0)
    const vantaRef = useRef(null)

    const uauth = new UAuth({
        clientID: `${process.env.REACT_APP_CLIENT_ID}`,
        redirectUri: "http://localhost:3000",
        scope: "openid wallet",
    })

    const login = async () => {
        try {
            uauth.loginWithPopup()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (address !== "") {
            window.location.href = "/MainPage"
        }
        if (!vantaEffect) {
            setVantaEffect(
                NET({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 600.0,
                    minWidth: 600.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    points: 18.0,
                    maxDistance: 24.0,
                    backgroundColor: "#222",
                })
            )
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect, address])

    const onPressConnect = async () => {
        setLoading(true)

        try {
            if (window?.ethereum?.isMetaMask) {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                })

                const account = Web3.utils.toChecksumAddress(accounts[0])
                setAddress(account)
            }
        } catch (error) {
            console.log(error)
        }

        setLoading(false)
    }
    const onPressLogout = () => setAddress("")

    return (
        <div
            ref={vantaRef}
            style={{
                height: window.innerHeight,
                width: window.innerWidth,
            }}
        >
            <Header />
            <div className="LandingPage">
                <div className="LandingPage__authBox">
                    <div className="LandingPage__authBox-header">
                        <p
                            style={{
                                height: "fit-content",
                                display: "flex",
                                justifyContent: "start",
                                fontWeight: "bold",
                                fontSize: "large",
                                marginLeft: "16px",
                                marginBottom: "8px",
                            }}
                        >
                            Connect a wallet
                        </p>
                    </div>
                    <div className="LandingPage__authBox-wallets">
                        <ConnectWalletButton
                            onPressConnect={onPressConnect}
                            onPressLogout={onPressLogout}
                            loading={loading}
                            address={address}
                            name={"MetaMask"}
                            image={Metamask}
                        />
                        {/* <ConnectWalletButton
                            onPressConnect={login}
                            name={"Unstoppable"}
                            image={Unstoppable}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
