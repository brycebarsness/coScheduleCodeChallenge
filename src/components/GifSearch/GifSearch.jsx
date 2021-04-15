import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./GifSearch.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

function SearchGifs() {
  const [category, setNewCategory] = useState("");
  const dispatch = useDispatch();

  const giphyList = useSelector(
    (store) => store.giphyList.giphyListReducer.data
  );
  const retriveGihpy = (event) => {
    event.preventDefault();
    dispatch({ type: "NEW_GIPHY", payload: category });
    setNewCategory("");
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
    button: { color: "white", backgroundColor: "darkblue" },
  });

  const classes = useStyles();

  const useStyles2 = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
      width: 500,
      height: 450,
    },
  });
  const classes2 = useStyles2();

  return (
    <div>
      <div className="app">
        <div className="header">
          <h1>Giphy Search!</h1>
          <h4>
            Search for giphs, favorite them, edit them, and save them in the
            Library.
          </h4>
        </div>
      </div>
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
          <Button variant="contained" type="submit" className={classes.button}>
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
                      className={classes.button}
                      style={{
                        color: "white",
                        backgroundColor: "darkblue",
                      }}
                      variant="contained"
                      onClick={() => {
                        alert("Added to favorites list");
                        dispatch({
                          type: "ADD_FAVORITE",
                          payload: gif.images.downsized_large.url,
                        });
                      }}
                      endIcon={<FavoriteRoundedIcon />}
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
