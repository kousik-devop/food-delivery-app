import React, { createContext, useContext, useState, useEffect } from 'react';
import GetFood from '../axios-connection/GetFood';
import { useUser } from './UserContext';
import { usePartner } from './PartnerContext';

// 1. Create the context
const FoodContext = createContext();

// 2. Create a custom hook for easy consumption of the context
export const useFood = () => {
  return useContext(FoodContext);
};

// 3. Create the Provider component
export const FoodProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { loading: userLoading } = useUser();
    const { loading: partnerLoading } = usePartner();

    const fetchFoods = async () => {
        try {
            // Don't set loading to true on refetch to avoid UI jumps,
            // but do set it on initial load.
            setLoading(true);
            setError(null);
            const foodData = await GetFood();
            setFoods(foodData || []);
        } catch (err) {
            setError(err.message || "Failed to fetch food items.");
            console.error("Error in FoodProvider:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Wait until both user and partner auth checks are complete
        if (!userLoading && !partnerLoading) {
            fetchFoods();
        }
    }, [userLoading, partnerLoading]);

    const value = {
        foods,
        loading,
        error,
        refetchFoods: fetchFoods, // Expose the refetch function
        setFoods,
    };

    return (
        <FoodContext.Provider value={value}>{children}</FoodContext.Provider>
    );
};