import { Button, Paper, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

const MetaConnect = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [account, setAccount] = useState(null)

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", accountsChanged)
            window.ethereum.on("chainChanged", chainChanged)
        }
    }, [])

    const connectHandler = async () => {
        if (window.ethereum) {
            try {
                const res = await window.ethereum.request({
                    method: "eth_requestAccounts",
                })
                await accountsChanged(res[0])
            } catch (err) {
                console.error(err)
                setErrorMessage("There was a problem connecting to MetaMask")
            }
        } else {
            setErrorMessage("Install MetaMask")
        }
    }

    const accountsChanged = async (newAccount) => {
        setAccount(newAccount)
    }

    const chainChanged = () => {
        setErrorMessage(null)
        setAccount(null)
    }

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Stack spacing={2}>
                <Typography variant="h6"> Account: {account} </Typography>
                <Button onClick={connectHandler}>Connect Account</Button>
                {errorMessage ? (
                    <Typography variant="body1" color="red">
                        Error: {errorMessage}
                    </Typography>
                ) : null}
            </Stack>
        </Paper>
    )
}

export default MetaConnect
