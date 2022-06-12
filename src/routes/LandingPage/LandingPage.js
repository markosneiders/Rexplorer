import React, { useState, useEffect, useRef } from "react"
import Navbar from "../../components/NavBar/Navbar"
import "./LandingPage.css"
import NET from "vanta/dist/vanta.net.min"
import MetaConnect from "../../components/MetaMaskAuth/MetaConnect"
import * as THREE from "three"

const LandingPage = () => {
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

    return (
        <div ref={vantaRef}>
            <div className="root">
                <Navbar />
                <div className="mainScreen">
                    <div className="mainScreen__authBox">
                        <div className="metamaskButton">
                            <MetaConnect />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
