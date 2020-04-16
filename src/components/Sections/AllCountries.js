import React, { useContext, useEffect, useState } from 'react';
import { 
      Table, 
      TableContainer, 
      TableHead, 
      TableRow, 
      TableCell, 
      TableBody, 
      Paper 
    } from '@material-ui/core';

import { GlobalContext } from "../../context/GlobalState";

const AllCountries = () => {
  const { data, getData } = useContext(GlobalContext);
  const [countries, setCountries] = useState([])
  useEffect(() => {
    getData()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!data) {
      return;
    }
    const affectedCountryByNumber = data.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? -1 : 1);
    setCountries(affectedCountryByNumber)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="All Countries">
          <TableHead>
            <TableRow>
            <TableCell>Rank</TableCell>
              <TableCell>Country</TableCell>
              <TableCell align="right">Confirmed</TableCell>
              <TableCell align="right">Recovered</TableCell>
              <TableCell align="right">Death</TableCell>
              <TableCell align="right">{"%"} Recovered</TableCell>
              <TableCell align="right">{"%"} Death</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country, index) => (
              <TableRow key={country.Country}>
              <TableCell component="th" scope="row">
                  {+index+1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {country.Country}
                </TableCell>
                <TableCell align="right">{country.TotalConfirmed}</TableCell>
                <TableCell align="right">{country.TotalRecovered}</TableCell>
                <TableCell align="right">{country.TotalDeaths}</TableCell>
                <TableCell align="right">{((+country.TotalRecovered / +country.TotalConfirmed) * 100).toFixed(2)}{"%"}</TableCell>
                <TableCell align="right">{((+country.TotalDeaths / +country.TotalConfirmed) * 100).toFixed(2)}{"%"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default AllCountries