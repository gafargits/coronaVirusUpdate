import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button
} from '@material-ui/core';

export const Details = (props) => {
  const { closeDialog, openDialog, countryOfInterest } = props

  return (
    <div>
      <Dialog onClose={closeDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
        <DialogTitle id="customized-dialog-title" onClose={closeDialog}>
          {countryOfInterest.Country}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
              {countryOfInterest.Country} has recorded a total of {countryOfInterest.TotalConfirmed} cases of Corona Virus incidence.
          </Typography>
          <Typography>
              New cases recorded as at today, {countryOfInterest.Date} is {countryOfInterest.NewConfirmed}.
          </Typography>
          <Typography>
            Although, {countryOfInterest.TotalRecovered} people have recovered from the infection of the novel COVID-19,
            unfortunately,  {countryOfInterest.TotalDeaths} people have died as a result of the infectious disease.
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeDialog} color="primary">
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
