import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {} from "../../../redux/actions/actionCreator";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormGroup } from "@material-ui/core";

const style = (theme) => ({
  card: {
    padding: theme.spacing(0.2),
    margin: "10px",
    borderRadius: 16,
    boxShadow: "0 2px 3px 0 #BDC9D7",
    backgroundColor: "#fcf6f5ff",
  },
  button: {
    padding: theme.spacing(1),
    margin: "38px",
  },
  paper: {
    margin: "12px",
    borderRadius: 16,
    boxShadow: "0 8px 16px 0 #BDC9D7",
  },
  active: {
    textDecoration: "line-through",
  },
});

const ToDo = (props) => {
  const [active, setActive] = React.useState(false);
  const handleChange = () => {
    setActive(!active);
  };
  const { classes } = props;
  return (
    <div>
      {console.log(active)}
      <Paper className={classes.paper}>
        <Grid container>
          {" "}
          <Grid item xs={12} sm={9}>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography
                  className={active ? classes.active : null}
                  color="textPrimary"
                  gutterBottom
                >
                  {props.title}
                </Typography>
                <Typography
                  className={active ? classes.active : null}
                  color="textSecondary"
                >
                  {props.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => props.deleteClick(props.todoId)}
            >
              Delete
            </Button>
            <FormGroup>
              <FormControlLabel
                label={active ? "Done" : "Not Done"}
                control={
                  <Switch
                    checked={active}
                    onChange={handleChange}
                    name="done"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(style)(ToDo);
