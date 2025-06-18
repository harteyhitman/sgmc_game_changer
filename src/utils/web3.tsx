export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function formatBalance(balance: string, decimals = 18, precision = 4): string {
  const formatted = (parseInt(balance) / Math.pow(10, decimals)).toFixed(precision);
  return parseFloat(formatted).toString();
}

export function isSupportedChain(chainId: number): boolean {
  const supportedChains = [1, 56, 137]; // Ethereum, BSC, Polygon
  return supportedChains.includes(chainId);
}