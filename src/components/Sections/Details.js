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
  const {closeDialog, openDialog, countryOfInterest} = props

  return (
    <div>
    <Dialog onClose={closeDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
        <DialogTitle id="customized-dialog-title" onClose={closeDialog}>
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
          <Button autoFocus onClick={closeDialog} color="primary">
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
