
const API_BASE = process.env.REACT_APP_API_URL;

export const truncateAddress = (hash) =>
  !hash ? "" : `${hash.slice(0, 6)}...${hash.slice(-4)}`;


export const checkTokenAssociation = async (accountId, tokenId) => {
    try {
        // Now calls YOUR server, not mirror node directly
        const url = `${API_BASE}/api/check-token-association?accountId=${accountId}&tokenId=${tokenId}`;
        const response = await fetch(url);
        const data = await response.json();

        // Your Laravel returns { isAssociated: true/false }
        const isAssociated = data.isAssociated?? false;

        console.log(`Account ${accountId} Token ${tokenId} is associated: ${isAssociated}`);
        return isAssociated;

    } catch (error) {
        console.error("Error checking token association:", error);
        return false; // safe fallback - same as before
    }
};

export const checkTokenAllowance = async (ownerAccountId, spenderId, tokenId) => {
  try {
    const url = `${API_BASE}/api/check-token-allowance?ownerAccountId=${ownerAccountId}&spenderId=${spenderId}&tokenId=${tokenId}`;
    const res = await fetch(url);
    const data = await res.json();

    // Laravel returns { allowance: number, raw_amount: number }
    // We return the formatted number exactly like before
    if (data.allowance === undefined) return 0;

    return Number(data.allowance);
  } catch (e) {
    console.error("Allowance check failed", e);
    return 0;
  }
};