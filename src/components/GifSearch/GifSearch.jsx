import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./GifSearch.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FavoritesComponent from "../FavoritesComponent/FavoritesComponent.jsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

function SearchGifs() {
  const [category, setNewCategory] = useState("");
  const dispatch = useDispatch();

  const giphyList = useSelector(
    (store) => store.giphyList.giphyListReducer.data
  );
  const retriveGihpy = (event) => {
    event.preventDefault();
    dispatch({ type: "NEW_GIPHY", payload: category });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 240,
    },
  });

  const classes = useStyles();

  const useStyles2 = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      //   backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  });
  const classes2 = useStyles2();

  return (
    <div>
      <Router>
        <div className="app">
          <div className="header">
            <h1>Giphy Search!</h1>
            <nav>
              <Button variant="contained" color="primary"></Button>
              <Button variant="contained" color="primary">
                <Link to="/favorites" className="nav-text">
                  Favorites
                </Link>
              </Button>
            </nav>
          </div>
          <Switch>
            <Route path="/favorites">
              <FavoritesComponent />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className="inputForm">
        <form onSubmit={retriveGihpy}>
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            value={category}
            onChange={(event) => setNewCategory(event.target.value)}
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            SEARCH
          </Button>
        </form>
      </div>
      <div className={classes2.root}>
        <GridList cellHeight={450} className={classes.gridList} cols={4}>
          {giphyList.map((gif, i) => (
            <div key={i}>
              <GridListTile>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={gif.images.downsized_large.url}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        alert("Added to favorites list");
                        dispatch({
                          type: "ADD_FAVORITE",
                          payload: gif.images.downsized_large.url,
                        });
                      }}
                    >
                      Favorite
                    </Button>
                  </CardActionArea>
                </Card>
              </GridListTile>
            </div>
          ))}
        </GridList>
      </div>
    </div>
  );
}
export default SearchGifs;
