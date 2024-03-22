import React, { useEffect, useState } from 'react'
import { useService } from '../../hooks/useService';
import { useAuthContext } from '../../hooks/useAuthContext';

function GetWalletBalance() {
    const [walletBalance, setWalletBalance] = useState(null);
    const service = useService()
    const { user } = useAuthContext();
    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(user.userID);
                const response = await service.get(`/getWalletBalance/${user.userID}`);
                if (!response.data) {
                    console.log("Response Data Not Received.");
                } else {
                    setWalletBalance(response.data.walletBalance);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const interval = setInterval(async () => {
            await fetchData();
        }, 3000);
        // Fetch initial data when the component mounts
        fetchData();
        // Cleanup the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, [user.userID, service]);

    return (
        <div className="flex w-auto h-auto items-center ml-4">
            {walletBalance !== null ? (
                <p>{walletBalance}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div >
    )
}

export default GetWalletBalance;