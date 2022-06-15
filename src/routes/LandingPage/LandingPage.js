import React, { useState, useEffect, useRef } from "react"
import Header from "../../components/Header/Header"
import ConnectWalletButton from "../../components/MetaMaskAuth/ConnectWalletButton"
import "./LandingPage.css"
import NET from "vanta/dist/vanta.net.min"
import Web3 from "web3"
import * as THREE from "three"

const LandingPage = () => {
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState("")

    const [vantaEffect, setVantaEffect] = useState(0)
    const vantaRef = useRef(null)

    useEffect(() => {
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
                })
            )
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

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
        <div className="root">
            <div ref={vantaRef}>
                <div>
                    <Header />
                    <div className="mainScreen">
                        <ConnectWalletButton
                            onPressConnect={onPressConnect}
                            onPressLogout={onPressLogout}
                            loading={loading}
                            address={address}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
