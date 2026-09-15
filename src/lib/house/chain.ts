export type MintResult = {
  tokenId: string;
  transactionHash: string;
};

/** House-owned mock chain. No production mint. Deterministic per pass. */
export function mintFleshPass(passNumber: string): MintResult {
  const tokenId = passNumber.replace(/\D/g, "") || "1";
  const transactionHash = `0xmockfleshpass${tokenId.padStart(8, "0")}`;
  return { tokenId, transactionHash };
}

export function passNumberFor(userId: string) {
  let h = 0;
  for (let i = 0; i < userId.length; i++) h = (h * 33 + userId.charCodeAt(i)) >>> 0;
  return `FLESH PASS #${String(h % 1_000_000).padStart(6, "0")}`;
}

export function embeddedAddressFor(userId: string) {
  let h = 0n;
  for (let i = 0; i < userId.length; i++) {
    h = (h * 131n + BigInt(userId.charCodeAt(i))) & ((1n << 160n) - 1n);
  }
  return `0x${h.toString(16).padStart(40, "0")}`;
}
