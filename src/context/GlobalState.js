import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

const initialState = {
  data: [],
  history: [],
  error: null,
  loading: true,
  searchString: ''
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getData = async () => {
    try {
      // const res = await axios.get('https://coronavirus-tracker-api.herokuapp.com/all');
      const res = await axios.get('https://api.covid19api.com/summary');

      dispatch({
        type: 'GET_DATA',
        payload: res.data.Countries
      })

    } catch (err) {
      dispatch({
        type: 'DATA_ERROR',
        payload: err.response
      })
    }
  }

  const getHistory = async (country, from, to) => {

    try {
      const res = await axios.get(`https://api.covid19api.com/${country}/nigeria/status/confirmed/live?from=${from}T00:00:00Z&to=${to}T00:00:00Z`);
      dispatch({
        type: 'GET_HISTORY',
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: 'DATA_ERROR',
        payload: err.response
      })
    }

  }

  return (<GlobalContext.Provider value={{
    data: state.data,
    getData,
    getHistory
  }}>
    {children}
  </GlobalContext.Provider>)
}