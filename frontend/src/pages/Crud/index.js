import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/table";
import AddButton from "./components/addButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "60px",
    width: "100%",
  },
}));

export default function Crud() {
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
  return (
    <div>
      <div className={classes.containerButton}>
        <AddButton GetNinjas={GetNinjas} />
      </div>

      <Table GetNinjas={GetNinjas} ninjas={ninjas} />
    </div>
  );
}
