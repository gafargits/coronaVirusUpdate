import React, {createContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

const initialState = {
  data: [],
  error: null,
  loading: true,
  searchString: ''
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getData = async () => {
    try{
      // const res = await axios.get('https://coronavirus-tracker-api.herokuapp.com/all');
      const res = await axios.get('https://api.covid19api.com/summary');

      dispatch({
        type: 'GET_DATA',
        payload: res.data.Countries
      })

    } catch(err){
      dispatch({
        type: 'DATA_ERROR',
        payload: err.response
      })
    }
  }

  // const searchData = searchString => {
  //   dispatch({
  //     type: 'SEARCH_DATA',
  //     payload: ''
  //   })
  // }

  return(<GlobalContext.Provider value={{
    data: state.data,
    getData
  }}>
    {children}
  </GlobalContext.Provider>)
}