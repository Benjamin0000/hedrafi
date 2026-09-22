const { PrivateKey } = require("@hashgraph/sdk");

const MESSAGE = "HedraFi authentication test";

async function main() {
    console.log("=== HedraFi Signature Test ===\n");

    // Generate a throwaway ECDSA key.
    // DO NOT use a real HashPack/private key here.
    const privateKey = PrivateKey.generateED25519();
    const publicKey = privateKey.publicKey;

    // This is exactly the kind of byte conversion
    // your HashPack flow uses:
    //
    // new TextEncoder().encode(message)
    const messageBytes = new TextEncoder().encode(MESSAGE);

    // Sign the raw message bytes.
    const signature = privateKey.sign(messageBytes);

    console.log("Message:");
    console.log(MESSAGE);

    console.log("\nPrivate key:");
    console.log(privateKey.toString());

    console.log("\nPublic key:");
    console.log(publicKey.toString());

    console.log("\nPublic key bytes:");
    console.log(Buffer.from(publicKey.toBytes()).toString("hex"));

    console.log("\nSignature length:");
    console.log(signature.length);

    console.log("\nSignature:");
    console.log(Buffer.from(signature).toString("base64"));

    // Verify the signature against the ORIGINAL message bytes.
    const valid = publicKey.verify(
        messageBytes,
        signature
    );

    console.log("\nSignature valid:");
    console.log(valid);

    // Make sure verification fails if the message changes.
    const tamperedMessage = new TextEncoder().encode(
        "HedraFi authentication test modified"
    );

    const tamperedValid = publicKey.verify(
        tamperedMessage,
        signature
    );

    console.log("\nTampered message valid:");
    console.log(tamperedValid);

    console.log("\n=== Result ===");

    if (valid === true && tamperedValid === false) {
        console.log("SUCCESS: Hedera signature verification works correctly.");
    } else {
        console.log("FAILED: Unexpected verification result.");
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("\nTest failed:");
    console.error(error);
    process.exit(1);
});

// const {
//     PublicKey
// } = require("@hashgraph/sdk");

// const message = "\x19Hedera Signed Message:\nHedraFi authentication test";

// // Paste the public key string returned by:
// // signed.publicKey.toString()
// const publicKeyString = "302d300706052b8104000a03220003e8eb0b97d8fb0ed3fa934ee241f3f9fbe3e762c46566461140b422262c3297a6";

// // Convert your Base64 signature back into bytes.
// const signature = Uint8Array.from(
//     Buffer.from("GD8i9yTrigulN4DxjG+GKS/e9yuafdLlGIbJ7WaUSSZ92SiJuTESxm/YmnN2a4dLSVwe1igmPMYV9RkunPNOqA==", "base64")
// );

// // IMPORTANT:
// // This must be the exact same byte representation
// // used by signAuthentication().
// const messageBytes = new TextEncoder().encode(message);

// const publicKey = PublicKey.fromString(publicKeyString);

// const valid = publicKey.verify(
//     messageBytes,
//     signature
// );

// console.log("Valid:", valid);