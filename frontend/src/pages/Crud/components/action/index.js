import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Delete from "../deleteButton";
import Edit from "../editButton";

export default function Actions({ GetNinjas, ninja }) {
  return (
    <ButtonGroup
      variant="text"
      color="primary"
      aria-label="text primary button group">
      <Edit GetNinjas={GetNinjas} ninja={ninja} />
      <Delete GetNinjas={GetNinjas} ninja={ninja} />
    </ButtonGroup>
  );
}
