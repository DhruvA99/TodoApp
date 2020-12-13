import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from "@material-ui/icons/ListAlt";

const logo = (props) => {
  return (
    <div>
      <IconButton>
        <ListAltIcon color={props.color} fontSize={props.size} />
      </IconButton>
    </div>
  );
};

export default logo;
