import React, { useEffect, useContext, useState, Fragment } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import myClass from './Main.module.css';

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
    console.log(data)
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
          <Grid item xs={12} sm={4} m={3}>
            <Paper className={myClass.Paper} onClick={() => countryDetailsHandler(country.CountryCode)}>
              <Typography variant="h5" gutterBottom>
                {country.Country}
              </Typography>
              <Typography variant="h6" gutterBottom className={myClass.Row}>
                <span>Confirmed:</span>
                <span className={myClass.ValueAlign}>
                  <SwapVertIcon color="primary" />
                  {country.TotalConfirmed}
                </span>
              </Typography>
              <Typography variant="h6" gutterBottom className={myClass.Row}>
                <span>Recovered: </span>
                <span className={myClass.ValueAlign}>
                  <ArrowUpwardIcon color="primary" />
                  {country.TotalRecovered}
                </span>
              </Typography>
              <Typography variant="h6" gutterBottom className={myClass.Row}>
                <span>Death:</span>
                <span className={myClass.ValueAlign}>
                  <ArrowDownwardIcon color="secondary" />
                  {country.TotalDeaths}
                </span>
              </Typography>
              <hr />
              <Typography variant="h6" gutterBottom className={myClass.Row}>
                <span>Percentage Recovered:</span>
                <span className={myClass.ValueAlign}>
                  <ArrowUpwardIcon color="primary" />
                  {((+country.TotalRecovered / +country.TotalConfirmed) * 100).toFixed(2)}{"%"}
                </span>
              </Typography>
              <Typography variant="h6" gutterBottom className={myClass.Row}>
                <span>Percentage Death:</span>
                <span className={myClass.ValueAlign}>
                  <ArrowDownwardIcon color="secondary" />
                  {((+country.TotalDeaths / +country.TotalConfirmed) * 100).toFixed(2)}{"%"}
                </span>
              </Typography>
            </Paper>
          </Grid>
        </Fragment>
      ))}
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
          {countryOfInterest.Country}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog} color="primary">
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default Main
