import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  button: {
    textDecoration: "none",
  },
  activeLink: {
    color: "red",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink
            to="/"
            exact
            className={classes.link}
            activeClassName={classes.activeLink}>
            <Button color="inherit" className={classes.button}>
              HOME
            </Button>
          </NavLink>
          <NavLink
            to="/crud"
            className={classes.link}
            activeClassName={classes.activeLink}>
            <Button color="inherit">CRUD</Button>
          </NavLink>
          <NavLink
            to="/mapa"
            className={classes.link}
            activeClassName={classes.activeLink}>
            <Button color="inherit">MAPA</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
