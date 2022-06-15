import styles from "./ConnectWallet.module.css"
import Metamask from "../../assets/images/metamask.png"

const ConnectWalletButton = ({
    onPressLogout,
    onPressConnect,
    loading,
    address,
}) => {
    return (
        <>
            {address && !loading ? (
                <button
                    onClick={onPressLogout}
                    className={styles["connect-wallet"]}
                >
                    Disconnect
                </button>
            ) : loading ? (
                <button
                    className={`${styles["connect-wallet"]} ${styles["connect-button-loading"]}`}
                    disabled
                >
                    <div>Loading...</div>
                </button>
            ) : (
                <button
                    onClick={onPressConnect}
                    className={styles["connect-wallet"]}
                >
                    <p style={{ height: "fit-content", width: "fit-content" }}>
                        Metamask
                    </p>
                    <img
                        src={Metamask}
                        alt="mySvgImage"
                        style={{ width: "auto", height: "100%" }}
                    />
                </button>
            )}
        </>
    )
}

export default ConnectWalletButton
