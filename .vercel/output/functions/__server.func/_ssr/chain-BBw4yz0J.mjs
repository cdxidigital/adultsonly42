//#region node_modules/.nitro/vite/services/ssr/assets/chain-BBw4yz0J.js
/** House-owned mock chain. No production mint. Deterministic per pass. */
function mintFleshPass(passNumber) {
	const tokenId = passNumber.replace(/\D/g, "") || "1";
	return {
		tokenId,
		transactionHash: `0xmockfleshpass${tokenId.padStart(8, "0")}`
	};
}
function passNumberFor(userId) {
	let h = 0;
	for (let i = 0; i < userId.length; i++) h = h * 33 + userId.charCodeAt(i) >>> 0;
	return `FLESH PASS #${String(h % 1e6).padStart(6, "0")}`;
}
function embeddedAddressFor(userId) {
	let h = 0n;
	for (let i = 0; i < userId.length; i++) h = h * 131n + BigInt(userId.charCodeAt(i)) & (1n << 160n) - 1n;
	return `0x${h.toString(16).padStart(40, "0")}`;
}
//#endregion
export { mintFleshPass as n, passNumberFor as r, embeddedAddressFor as t };
