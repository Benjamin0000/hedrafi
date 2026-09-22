export const truncateAddress = (hash) =>
  !hash ? "" : `${hash.slice(0, 6)}...${hash.slice(-4)}`;




export const checkTokenAssociation = async (accountId, tokenId) => {
    // 1. Construct the Mirror Node URL for mainnet
    const mirrorNodeUrl = `https://mainnet.mirrornode.hedera.com/api/v1/accounts/${accountId}/tokens`;

    try {
        const response = await fetch(mirrorNodeUrl);
        const data = await response.json();

        // 2. Check if the account is associated with the specific token
        const isAssociated = data.tokens.some(
            (token) => token.token_id == tokenId
        );

        console.log("Account "+accountId +"Token " + tokenId+" is associated: " + isAssociated)
        return isAssociated;

    } catch (error) {
        console.error("Error checking token association:", error);
        // Safe fallback: assume not associated
        return false; 
    }
};



export const checkTokenAllowance = async (ownerAccountId, spenderId, tokenId) => {
  try {
    const url = `https://mainnet.mirrornode.hedera.com/api/v1/accounts/${ownerAccountId}/allowances/tokens?spender.id=${spenderId}&token.id=${tokenId}`;
    const res = await fetch(url);
    const data = await res.json();

    // data.allowances = [{ amount, owner, spender, token_id }]
    if (!data.allowances || data.allowances.length === 0) return 0;

    // amount is in tinybars (with decimals)
    return Number(data.allowances[0].amount) / 1e8; // your $HRT has 8 decimals
  } catch (e) {
    console.error("Allowance check failed", e);
    return 0;
  }
};