import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { GlobalContext } from "../../context/GlobalState";

import myClass from './AllCountries.module.css';


const AllCountries = () => {
  const { data, getData } = useContext(GlobalContext);
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState('');
  useEffect(() => {
    getData()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!data) {
      return;
    }
    const countryOfInterest = searchString === '' ? data : data.filter(country => country.Country.toLowerCase().indexOf(searchString.toLowerCase()) >= 0)

    const affectedCountry = countryOfInterest.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? -1 : 1);
    setCountries(affectedCountry)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchString])

  const handleChangeSetString = (e) => {
    setSearchString(e.target.value)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={myClass.PageHeader}>
          <div className={myClass.LeftSide}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Covid 19 Updates
        </Typography>
          </div>
          <div className={myClass.RightSide}>
            <div className={myClass.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={searchString}
              onChange={handleChangeSetString}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>


      <TableContainer component={Paper}>
        <Table aria-label="All Countries">
          <TableHead className={myClass.TableHeader}>
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
          <TableBody className={myClass.TableContent}>
            {countries.map((country, index) => (
              <TableRow key={country.Country}>
                <TableCell component="th" scope="row">
                  {+index + 1}
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