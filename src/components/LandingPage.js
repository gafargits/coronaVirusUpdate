import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// core components
import Header from "./Header";
import Footer from "./Footer";
import GridContainer from "./GridContainer.js";
import GridItem from "./GridItem.js";
import HeaderLinks from "./HeaderLinks.js";

import styles from "../assets/jss/material-kit-react/views/landingPage.js";
import myClass from './LandingPage.module.css';

// Sections for this page
import Main from "./Sections/Main";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Covid-19 Updates"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <GridContainer className={myClass.GridContainer}>
        <GridItem xs={12} sm={12} md={6} className={classes.container}>
          <Typography variant="h2">
            Corona Virus Updates...
          </Typography>
          <br />
          <Typography variant="h5" className={myClass.HeaderTypo}>
            Get up-to-date information about incidence of Covid-19 around the world
          </Typography>
        </GridItem>
      </GridContainer>
      <div className={myClass.Main}>
        <Main />
      </div>
      {/* <WorkSection /> */}


      {/* <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <Main />
          <WorkSection />
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
