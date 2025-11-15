import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const PartnerContext = createContext(null);

export const PartnerProvider = ({ children }) => {
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        // The browser will automatically send the httpOnly cookie
        const res = await axios.get('/api/auth/food-partner/me');
        setPartner(res.data.partner);
      } catch (err) {
        console.debug('Silent partner auth failed:', err);
        // This is expected if the user is not logged in, so we just ensure partner is null.
        setPartner(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

  const login = (partnerData) => {
    setPartner(partnerData);
    setToken(Cookies.get('partner_token'));
    // No need to handle token here, state update will trigger re-renders
  };

  const logout = () => {
    // Call the server to clear the httpOnly cookie
    axios.post('/api/auth/food-partner/logout')
      .finally(() => {
        setPartner(null);
      });
  };

  return (
    <PartnerContext.Provider value={{ partner, loading, login, logout, token }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => useContext(PartnerContext);