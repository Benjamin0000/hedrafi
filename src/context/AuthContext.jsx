import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAccountId, useWallet } from "@buidlerlabs/hashgraph-react-wallets";
import { toast } from 'react-toastify';
import api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const { data: accountId } = useAccountId();
    const [user, setUser] = useState(null);
   
    /*
     * Authentication challenge returned by Laravel.
     */
    const [challenge, setChallenge] = useState(null);

    /*
     * SignerSignature returned by HashPack.
     *
     * We keep the actual signature information in memory
     * until the user clicks Verify.
     */
    const [signerSignature, setSignerSignature] = useState(null);

    const [authLoading, setAuthLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);
    const hasChecked = useRef(false);

    const wallet = useWallet()

    const { isConnected } = wallet; 



    // 1. Wait a tick for the wallet provider to hydrate the accountId on reload
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsHydrated(true);
        }, 300); // 300ms grace period for wallet extension/session hydration

        return () => clearTimeout(timer);
    }, []);


    /**
     * Check whether Laravel already has an authenticated
     * Sanctum session, only after the wallet state is fully hydrated.
     */
    useEffect(() => {
      // Do nothing until the wallet provider has finished mounting/hydrating
      if (!isHydrated) {
          return;
      }

      if (!isConnected) {
          setUser(null);
          setAuthLoading(false);
          hasChecked.current = false;
          return;
      }

      if (!accountId) {
        // Still waiting for accountId to populate even after hydration
        return;
      }

      if (!hasChecked.current) {
        hasChecked.current = true;
        checkAuth();
      }

    }, [accountId, isConnected, isHydrated]);


    const loggedOut = useRef(false);
    useEffect(() => {

      async function handleLogout() {
        if (!isConnected && loggedOut.current == false) {
          loggedOut.current = true;
          await logout();
          hasChecked.current = false;
        }
      }
      
      handleLogout();
    }, [accountId, isConnected]);


    /**
     * Check existing Laravel authentication session.
     */
    const checkAuth = async () => {

        try {

            const response = await api.get("/api/user");

            /*
             * Make sure the authenticated Laravel user
             * belongs to the currently connected wallet.
             */
            if (
                response.data?.account_id &&
                response.data.account_id !== accountId
            ) {
                setUser(null);
                return;
            }

            setUser(response.data);

        } catch (error) {

            if (error.response?.status === 401) {
                setUser(null);
            } else {
                console.error(
                    "Authentication check failed:",
                    error
                );
            }

        } finally {
            setAuthLoading(false);
        }
    };


    /**
     * STEP 1
     *
     * Ask Laravel for a fresh authentication challenge.
     *
     * Nothing is signed here.
     */
    const getChallenge = async () => {

        if (!accountId) {
            throw new Error(
                "No Hedera wallet is connected."
            );
        }

        try {
            await api.get("/sanctum/csrf-cookie");
            const response = await api.post(
                "/api/auth/challenge",
                {
                    accountId,
                }
            );

            const challengeData = response.data;

            setChallenge(challengeData);

            /*
             * Clear any previous signature.
             */
            setSignerSignature(null);

            return challengeData;

        } catch (error) {

            console.error(
                "Unable to obtain authentication challenge:",
                error
            );

            throw error;
        }
    };


    /**
     * STEP 2
     *
     * Ask the connected wallet to sign the challenge.
     *
     * This function does NOT authenticate the user.
     *
     * It only obtains the wallet signature.
     */
    const signChallenge = async (signAuth) => {

        if (!challenge?.message) {
            throw new Error(
                "No authentication challenge available."
            );
        }

        try {

            const signature =
                await signAuth(
                    challenge.message
                );

            /*
             * Store the complete SignerSignature.
             */
            setSignerSignature(signature);

            return signature;

        } catch (error) {

            console.error(
                "Failed to sign authentication challenge:",
                error
            );

            throw error;
        }
    };


    /**
     * STEP 3
     *
     * Send the previously signed challenge to Laravel.
     *
     * This is the point where authentication actually happens.
     */
    const verifyAuthentication = async () => {

        if (!accountId) {
            throw new Error(
                "No Hedera wallet is connected."
            );
        }

        if (!challenge) {
            throw new Error(
                "No authentication challenge available."
            );
        }

        if (!signerSignature) {
            throw new Error(
                "No wallet signature available."
            );
        }

        try {

            /*
             * Convert the Hedera PublicKey to raw bytes.
             */
            const publicKeyBytes =
                signerSignature.publicKey.toBytes();

            /*
             * Convert bytes to hexadecimal.
             */
            const publicKey =
                Array
                    .from(publicKeyBytes)
                    .map(byte =>
                        byte
                            .toString(16)
                            .padStart(2, "0")
                    )
                    .join("");


            /*
             * Convert Uint8Array signature to Base64.
             */
            const signature =
                uint8ArrayToBase64(
                    signerSignature.signature
                );


            /*
             * Determine the key type.
             *
             * Hedera SDK's PublicKey.type gives us the
             * appropriate key type.
             */
            const keyType =
                signerSignature.publicKey.type === "ED25519"
                    ? "ED25519"
                    : "ECDSA";


            /*
             * Send everything to Laravel.
             */
            await api.get("/sanctum/csrf-cookie");
            const response =
                await api.post(
                    "/api/auth/verify",
                    {
                        accountId: accountId,

                        /*
                         * IMPORTANT:
                         * Use the exact challenge message.
                         */
                        message: challenge.message,

                        publicKey,

                        signature,

                        keyType,
                    }
                );


            /*
             * Laravel successfully authenticated us.
             */
            setUser(
                response.data.user
            );

            /*
             * Clear the authentication material.
             */
            setChallenge(null);
            setSignerSignature(null);
            toast.success('Authentication successful');
            return response.data.user;

        } catch (error) {

            console.error(
                "Hedera authentication verification failed",
                error
            );

            toast.error('Hedera authentication verification failed');

            throw error;
        }
    };


    /**
     * Logout from Laravel.
     */
    const logout = async () => {

        try {
            await api.get("/sanctum/csrf-cookie");

            await api.post(
                "/api/auth/logout"
            );

        }catch(error){

        } finally {
            setUser(null);

            /*
             * Clear any pending authentication data.
             */
            setChallenge(null);
            setSignerSignature(null);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                authLoading,

                /*
                 * Authentication flow.
                 */
                challenge,
                signerSignature,

                getChallenge,
                signChallenge,
                verifyAuthentication,

                logout,
                checkAuth,
                setUser,
                isAuthenticated:
                    Boolean(user),
                hasProfile: Boolean(user?.name),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}


/**
 * Convert Uint8Array -> Base64.
 */
function uint8ArrayToBase64(bytes) {

    let binary = "";

    const chunkSize = 0x8000;

    for (
        let i = 0;
        i < bytes.length;
        i += chunkSize
    ) {

        binary += String.fromCharCode(
            ...bytes.subarray(
                i,
                i + chunkSize
            )
        );
    }

    return btoa(binary);
}
