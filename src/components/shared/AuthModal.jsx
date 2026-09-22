import { useState, useEffect } from "react";
import { useAccountId, useWallet, useAuthSignature, UserRefusedToSignAuthError } from "@buidlerlabs/hashgraph-react-wallets";
import { useAuth } from "../../context/AuthContext";


export default function AuthModal() {

    const {
        user,
        authLoading,
        challenge,
        signerSignature,

        getChallenge,
        signChallenge,
        verifyAuthentication,
        isAuthenticated,

    } = useAuth();

        const wallet = useWallet()
    
        const { isConnected } = wallet; 


    const { data: accountId } = useAccountId();

    const { signAuth } = useAuthSignature();

    const [isOpen, setIsOpen] = useState(false);


    /*
     * checking
     * signing
     * signed
     * verifying
     * success
     */
    const [status, setStatus] = useState("checking");

    const [error, setError] = useState(null);


    /**
     * Open authentication modal when a wallet
     * connects and the user isn't authenticated.
     */
    useEffect(() => {

        if (!isConnected) {
            setIsOpen(false);
            return;
        }

        if (authLoading) {
            return;
        }

        if ( accountId && !isAuthenticated ) {

            setIsOpen(true);
            setStatus("checking");
            setError(null);
        } else {
            setIsOpen(false);
        }

    }, [
        accountId,
        isAuthenticated,
        isConnected,
        authLoading
    ]);


    /**
     * Once the modal opens, obtain the challenge.
     */
    useEffect(() => {

        if (
            !isOpen ||
            !accountId ||
            isAuthenticated
        ) {
            return;
        }


        const initializeAuthentication =
            async () => {

                try {

                    setStatus("checking");
                    setError(null);

                    /*
                     * Get the message from Laravel.
                     */
                    await getChallenge();

                    /*
                     * We now have a challenge and
                     * can show it to the user.
                     */
                    setStatus("signing");

                } catch (error) {

                    console.error(
                        "Failed to initialize authentication:",
                        error
                    );

                    setError(
                        error.response?.data?.message ||
                        error.message ||
                        "Unable to initialize authentication."
                    );

                    setStatus("checking");
                }
            };


        initializeAuthentication();

    }, [
        isOpen,
        accountId,
        isAuthenticated,
    ]);


    /**
     * User clicked:
     *
     * "Sign Message in Wallet"
     */
    const onSign = async () => {

        try {

            setError(null);

            /*
             * Open HashPack.
             */
            await signChallenge(
                signAuth
            );

            /*
             * Signature has now been received.
             *
             * Do NOT verify yet.
             *
             * Give the user another confirmation step.
             */
            setStatus("signed");

        } catch (error) {

            console.error(
                "Error during signing:",
                error
            );


            if (
                error instanceof
                UserRefusedToSignAuthError
            ) {

                setError(
                    "You cancelled the signature request."
                );

            } else {

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to sign the authentication message."
                );
            }

            setStatus("signing");
        }
    };


    /**
     * User clicked:
     *
     * "Verify Authentication"
     */
    const onVerify = async () => {

        try {

            setError(null);

            setStatus("verifying");

            /*
             * Send the stored signature to Laravel.
             */
            await verifyAuthentication();

            /*
             * Laravel has now authenticated
             * the user.
             */
            setStatus("success");

        } catch (error) {

            console.error(
                "Error during verification:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Signature verification failed."
            );

            setStatus("signed");
        }
    };


    const onClose = () => {

        /*
         * Don't allow closing while the server
         * is verifying.
         */
        if (status === "verifying") {
            return;
        }

        setIsOpen(false);
    };


    if (!isOpen) {
        return null;
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 p-6 space-y-6">


                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">

                    <h3 className="text-lg font-semibold tracking-wide text-emerald-400">
                        HedraFi Authentication
                    </h3>


                    {status !== "verifying" && (
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-200 text-sm font-medium transition"
                        >
                            Cancel
                        </button>
                    )}

                </div>


                {/* Error */}
                {error && (
                    <div className="bg-red-950/40 border border-red-900 rounded-xl p-3 text-sm text-red-300">
                        {error}
                    </div>
                )}


                {/* Checking */}
                {status === "checking" && (

                    <div className="flex flex-col items-center justify-center py-8 space-y-3">

                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />

                        <p className="text-sm text-slate-400">
                            Preparing authentication...
                        </p>

                    </div>
                )}


                {/* Sign */}
                {status === "signing" && (

                    <div className="space-y-4">

                        <div>
                            <p className="text-sm font-medium text-slate-200">
                                Review this message
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                Your wallet will ask you to sign the following message.
                            </p>
                        </div>


                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">

                            {challenge?.message}

                        </div>


                        <button
                            onClick={onSign}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-emerald-900/20"
                        >
                            Sign Message in Wallet
                        </button>

                    </div>
                )}


                {/* Signed */}
                {status === "signed" && (

                    <div className="space-y-4">

                        <div className="flex items-center gap-3">

                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-900/40 text-emerald-400">
                                ✓
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-200">
                                    Signature received
                                </p>

                                <p className="text-xs text-slate-400">
                                    Your wallet has signed the message.
                                </p>
                            </div>

                        </div>


                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">

                            <p className="text-xs text-slate-400 mb-2">
                                Message you signed
                            </p>

                            <p className="font-mono text-xs text-slate-300 break-words">
                                {challenge?.message}
                            </p>

                        </div>


                        <button
                            onClick={onVerify}
                            disabled={!signerSignature}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-emerald-900/20"
                        >
                            Verify Authentication
                        </button>

                    </div>
                )}


                {/* Verifying */}
                {status === "verifying" && (

                    <div className="flex flex-col items-center justify-center py-8 space-y-3">

                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />

                        <p className="text-sm text-slate-400">
                            Verifying your signature...
                        </p>

                    </div>
                )}


                {/* Success */}
                {status === "success" && (

                    <div className="flex flex-col items-center justify-center py-8 space-y-4">

                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-900/40 text-emerald-400 text-2xl">
                            ✓
                        </div>

                        <div className="text-center">

                            <p className="font-medium text-slate-100">
                                Authentication successful
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                You are now signed in to HedraFi.
                            </p>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}
