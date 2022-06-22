import styles from "./ConnectWallet.module.css"

const ConnectWalletButton = ({
    onPressLogout,
    onPressConnect,
    loading,
    address,
    name,
    image,
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
                    <div className={styles["loading"]}>Loading...</div>
                </button>
            ) : (
                <button
                    onClick={onPressConnect}
                    className={styles["connect-wallet"]}
                >
                    <p
                        style={{
                            height: "fit-content",
                            width: "fit-content",
                            fontFamily: ["Inter custom", "sans - serif"],
                            fontWeight: "lighter",
                            fontSize: "16px",
                        }}
                    >
                        {name}
                    </p>
                    <img
                        src={image}
                        alt="mySvgImage"
                        style={{ width: "auto", height: "100%" }}
                    />
                </button>
            )}
        </>
    )
}

export default ConnectWalletButton
