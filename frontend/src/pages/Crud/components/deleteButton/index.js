import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function Actions({ GetNinjas, ninja }) {
  async function Delete() {
    console.log("Deletando: " + ninja._id);
    axios
      .delete("http://localhost:3001/api/ninjas/" + ninja._id)
      .then((res) => {
        GetNinjas();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return <Button onClick={() => Delete()}>Deletar</Button>;
}
