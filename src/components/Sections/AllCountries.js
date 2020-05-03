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
import { percentage } from './percentage';
import { Details } from './Details';
import { Link } from 'react-router-dom';

const AllCountries = () => {
  const { data, getData } = useContext(GlobalContext);
  const [countries, setCountries] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [countryOfInterest, setCountryOfInterest] = useState({});

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

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCountryOfInterest = id => {
    const countryOfInterest = countries.filter((country, index) => country.CountryCode === id)
    setCountryOfInterest(countryOfInterest[0])
    setOpenDialog(true)
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
            <Link to="/" className={myClass.Link}>
              <Typography variant="h6" noWrap>
                Covid 19 Updates
              </Typography>
            </Link>

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
                <TableCell component="th" scope="row" onClick={() => handleCountryOfInterest(country.CountryCode)} style={{ cursor: 'pointer' }}>
                  {country.Country}
                </TableCell>
                <TableCell align="right">{country.TotalConfirmed}</TableCell>
                <TableCell align="right">{country.TotalRecovered}</TableCell>
                <TableCell align="right">{country.TotalDeaths}</TableCell>
                <TableCell align="right">{percentage(country.TotalRecovered, country.TotalConfirmed)}{"%"}</TableCell>
                <TableCell align="right">{percentage(country.TotalDeaths, country.TotalConfirmed)}{"%"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Details
        closeDialog={handleCloseDialog}
        openDialog={openDialog}
        countryOfInterest={countryOfInterest}
        countries={countries}
      />
    </div>
  )
}


export default AllCountries