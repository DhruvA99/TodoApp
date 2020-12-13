import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import todoimage1 from "../../assets/todo1.jpg";
import Button from "@material-ui/core/Button";
import "./Home.css";
import { Link } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";

const style = (theme) => ({
  body: {
    backgroundColor: "#e9f2e9",
  },
  topText: {
    margin: "20px",
    position: "absolute",
    top: "50%",
    left: "20%",
    right: "30%",
    fontFamily: "Russo One",
    fontSize: "2.8em",
  },
  media: {
    width: "100%",
    height: "100vh",
    position: "relative",
    opacity: 0.6,
  },
  button: {
    margin: "23px",
  },
});

class Home extends Component {
  state = {
    isTop: false,
    checked: true,
  };
  componentDidMount() {
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
        this.setState({
          isTop: isTop,
          checked: !isTop,
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} onScroll={this.elementScrollData}>
        <img src={todoimage1} className={classes.media} />
        <Typography
          variant="h3"
          className={classes.topText}
          color="textPrimary"
        >
          Organize it all with a Todo List
        </Typography>

        <Typography variant="body1" gutterBottom></Typography>
        <Zoom
          in={this.state.checked}
          style={{
            transitionDelay: this.state.checked ? "10ms" : "0ms",
            transitionDuration: this.state.checked ? "1000ms" : "0ms",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Free up your mental space
          </Typography>
        </Zoom>

        <div>
          <Zoom
            in={this.state.checked}
            style={{
              transitionDelay: this.state.checked ? "90ms" : "0ms",
              transitionDuration: this.state.checked ? "1000ms" : "0ms",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Regain clarity and calmness by getting all those tasks out of your
              head and onto your to-do list (no matter where you are or what
              device you use).
            </Typography>
          </Zoom>
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/login"
        >
          Get Started
        </Button>
      </div>
    );
  }
}

export default withStyles(style)(Home);
