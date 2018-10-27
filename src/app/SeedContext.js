import React from 'react';

/**
 * Seed context represents the initial context sent throughout the
 * server express application per request.
 * 
 * This context should not change once initialised in the ReactDOM.
 * This is true for both server and client side. This context is 
 * designed to be read-only to enable consistency across server and client.
 */
export const SeedContext = React.createContext();