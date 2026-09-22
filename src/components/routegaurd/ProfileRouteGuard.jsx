import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ProfileRouteGuard = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [hasProfile, setHasProfile] = useState(false);
    const { user, authLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        const checkProfile = () => {
            if(authLoading) { return ; }

            if (isAuthenticated) {
                setHasProfile(!!user.name);
            } else {
                setHasProfile(false);
            }
            setLoading(false);
        }
        checkProfile();
    }, [authLoading, user, isAuthenticated]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030712] flex items-center justify-center">
                <div className="text-emerald-400 text-sm font-black uppercase tracking-widest">
                    Loading Profile...
                </div>
            </div>
        );
    }

    if (!hasProfile) {
        return (
            <Navigate
                to="/profile/intro"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    return <Outlet />;
};

export default ProfileRouteGuard;