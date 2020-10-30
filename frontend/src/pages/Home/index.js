import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "60px",
    width: "100%",
  },
  formulario: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "10px",
    maxWidth: "50%",
    margin: "30px auto",
  },
  textField: {
    width: "100%",
    marginBottom: "10px",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [ninjas, setNinjas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/ninjas")
      .then((res) => {
        setNinjas(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function GetNinjas() {
    axios
      .get("http://localhost:3001/api/ninjas")
      .then((res) => {
        setNinjas(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function handleChange(evt) {
  //   // console.log("new value", evt.target.value);
  //   if (evt.target.name === "available") {
  //     setValues({
  //       ...values,
  //       [evt.target.name]: evt.target.checked,
  //     });
  //   } else {
  //     setValues({
  //       ...values,
  //       [evt.target.name]: evt.target.value,
  //     });
  //   }
  // }

  return (
    <div id="ninja-container">
      <h1>Contrate um ninja na sua área</h1>
      <div className={classes.formulario}>
        <TextField className={classes.textField} label="Latitude" name="lat" />
        <TextField className={classes.textField} label="Longitude" name="lng" />
        <Button className={classes.button} variant="contained" color="primary">
          Procurar Ninjas
        </Button>
      </div>
    </div>
  );
}
