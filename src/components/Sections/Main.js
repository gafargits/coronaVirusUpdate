import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import myClass from './Main.module.css';
import { Details } from './Details';
import { percentage } from './percentage'
import { GlobalContext } from "../../context/GlobalState";

const Main = () => {

  const { data, getData } = useContext(GlobalContext);
  const [topSix, setTopSix] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [countryOfInterest, setCountryOfInterest] = useState({})


  useEffect(() => {
    getData()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!data) {
      return;
    }
    const affectedCountryByNumber = data.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? -1 : 1);
    const topSix = affectedCountryByNumber.slice(0, 6);
    setTopSix(topSix)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const countryDetailsHandler = id => {
    const country = topSix.filter(country => country.CountryCode === id)
    setCountryOfInterest(country[0])
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Grid container className={myClass.Main}>
      {topSix.map(country => (
        <Fragment key={country.CountryCode}>
          <Grid item xs={12} sm={4} m={4}>
            <Paper className={myClass.Paper} onClick={() => countryDetailsHandler(country.CountryCode)}>
              <Typography variant="h5" gutterBottom>
                {country.Country}
              </Typography>
              <Typography variant="subtitle1" gutterBottom className={myClass.Row}>
                <span className={myClass.Subtitle}>Confirmed:</span>
                <span className={myClass.ValueAlign}>
                  <SwapVertIcon color="primary" />
                  {country.TotalConfirmed}
                </span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom className={myClass.Row}>
                <span className={myClass.Subtitle}>Recovered: </span>
                <span className={myClass.ValueAlign}>
                  <ArrowUpwardIcon color="primary" />
                  {country.TotalRecovered}
                </span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom className={myClass.Row}>
                <span className={myClass.Subtitle}>Death:</span>
                <span className={myClass.ValueAlign}>
                  <ArrowDownwardIcon color="secondary" />
                  {country.TotalDeaths}
                </span>
              </Typography>
              <hr />
              <Typography variant="subtitle1" gutterBottom className={myClass.Row}>
                <span className={myClass.Subtitle}>Percentage Recovered:</span>
                <span className={myClass.ValueAlign}>
                  <ArrowUpwardIcon color="primary" />
                  {percentage(country.TotalRecovered, country.TotalConfirmed)}{"%"}
                </span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom className={myClass.Row}>
                <span className={myClass.Subtitle}>Percentage Death:</span>
                <span className={myClass.ValueAlign}>
                  <ArrowDownwardIcon color="secondary" />
                  {percentage(country.TotalDeaths, country.TotalConfirmed)}{"%"}
                </span>
              </Typography>
            </Paper>
          </Grid>
        </Fragment>
      ))}
      <Link to="/all" className={myClass.Link}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          className={myClass.Button}
        >
          See More...
      </Button>
      </Link>
      <Details
        openDialog={openDialog}
        closeDialog={handleCloseDialog}
        countryOfInterest={countryOfInterest}
      />
    </Grid>
  )
}

export default Main
