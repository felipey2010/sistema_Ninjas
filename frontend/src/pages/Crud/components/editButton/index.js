import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  formulario: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "10px",
  },
  textField: {
    width: "100%",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
  },
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft({ GetNinjas, ninja }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
    name: "",
    available: "",
    rank: "",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    if (ninja) {
      console.log(ninja);
      setValues({
        ...values,
        name: ninja.name,
        available: ninja.available,
        rank: ninja.rank,
        lat: ninja.geometry.coordinates[0],
        lng: ninja.geometry.coordinates[1],
      });
    }
  }, [ninja]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleChange(evt) {
    // console.log("new value", evt.target.value);
    if (evt.target.name === "available") {
      setValues({
        ...values,
        [evt.target.name]: evt.target.checked,
      });
    } else {
      setValues({
        ...values,
        [evt.target.name]: evt.target.value,
      });
    }
  }

  async function Editar() {
    const params = {
      name: values.name,
      rank: values.rank,
      available: values.available,
      geometry: {
        coordinates: [parseFloat(values.lat), parseFloat(values.lng)],
      },
    };
    console.log(params);
    axios
      .put("http://localhost:3001/api/ninjas/" + ninja._id, params)
      .then((res) => {
        GetNinjas();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Button onClick={handleDrawerOpen}>Editar</Button>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <p>Editar</p>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.formulario}>
          <TextField
            className={classes.textField}
            label="Nome"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            label="Rank"
            name="rank"
            value={values.rank}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={values.available}
                onChange={handleChange}
                name="available"
                color="primary"
              />
            }
            label="Available"
          />
          <TextField
            className={classes.textField}
            label="Latitude"
            name="lat"
            value={values.lat}
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            label="Longitude"
            name="lng"
            value={values.lng}
            onChange={handleChange}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => Editar()}>
            Atualizar
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
