import React, { useEffect, useState } from "react";
import "./MetaMaskAuth.css";

function checkIfWalletIsConnected(onConnected) {}

const MetaMaskAuth = ({ onAddressChanged }) => {
	const [userAddress, setUserAddress] = useState("");

	useEffect(() => {
		checkIfWalletIsConnected(setUserAddress);
	}, []);

	useEffect(() => {
		onAddressChanged(userAddress);
	}, [userAddress]);

	function connect(onConnected) {}

	function Connect({ setUserAddress }) {
		return (
			<button className="button" onClick={() => connect(setUserAddress)}>
				Connect to MetaMask
			</button>
		);
	}

	function Address({ userAddress }) {
		return (
			<span className="address">
				{userAddress.substring(0, 5)}…
				{userAddress.substring(userAddress.length - 4)}
			</span>
		);
	}

	return userAddress ? (
		<div>
			Connected with <Address userAddress={userAddress} />
		</div>
	) : (
		<Connect setUserAddress={setUserAddress} />
	);
};

export default MetaMaskAuth;
