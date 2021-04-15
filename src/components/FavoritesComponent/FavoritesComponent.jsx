import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./FavoritesComponent.css";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useState } from "react";
import Caption from "../Caption/Caption";

function FavoritesComponent() {
  const favoritesList = useSelector(
    (store) => store.favorites.favoritesReducer
  );
  const categoryList = useSelector((store) => store.category.categoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
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
    },
    gridList: {
      width: 500,
      height: 550,
    },
  });
  const classes2 = useStyles2();

  return (
    <div>
      <div className="app">
        <div className="header">
          <h1>Favorite Editer</h1>
        </div>
      </div>

      <>
        <div className={classes2.root}>
          <GridList cellHeight={550} className={classes.gridList} cols={3}>
            {favoritesList.map((favorite) => (
              <GridListTile key={favorite.id}>
                <div className="card">
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={favorite.url}
                      />
                      <CardContent>
                        <Caption favorite={favorite} />
                        <Typography gutterBottom variant="h5" component="h2">
                          <p>
                            {favorite.caption ? favorite.caption : ""}
                            <br />
                            {favorite.name
                              ? favorite.name
                              : categoryList.map((category) => {
                                  return (
                                    <>
                                      <input
                                        type="radio"
                                        name="category"
                                        id={category.id}
                                        onChange={() =>
                                          dispatch({
                                            type: "SET_CATEGORYID",
                                            payload: {
                                              categoryId: category.id,
                                              gifId: favorite.id,
                                            },
                                          })
                                        }
                                      />
                                      <label htmlFor={category.id}>
                                        {category.name}
                                      </label>
                                    </>
                                  );
                                })}
                          </p>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FAVORITE",
                            payload: favorite.id,
                          })
                        }
                      >
                        Remove From Favorites
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </>
    </div>
  );
}

export default FavoritesComponent;
