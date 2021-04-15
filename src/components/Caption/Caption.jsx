import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  Paper,
  makeStyles,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";

function SetCaption(props) {
  const favorite = props.favorite;

  const dispatch = useDispatch();
  const [newCaptionToggle, setNewCaptionToggle] = useState(false);
  const [caption, setCaption] = useState({
    caption: favorite.caption,
  });

  const useStyles = makeStyles({
    paper: {
      margin: "auto",
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "fit-content",
      padding: "2rem",
      textAlign: "center",
    },
    multiline: {
      minWidth: "20rem",
    },
  });

  const classes = useStyles();

  const handleNewCaptionReset = () => {
    setCaption("");
    setNewCaptionToggle(false);
  };

  const handleNewCaptionSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_CAPTION",
      payload: {
        caption: caption,
        gifId: favorite.id,
      },
    });
    setCaption("");
    setNewCaptionToggle(false);
  };

  const handleCaptionToggle = () => {
    newCaptionToggle ? setNewCaptionToggle(false) : setNewCaptionToggle(true);
  };

  return (
    <div>
      <div>
        <Button
          size="small"
          color="primary"
          onClick={() => handleCaptionToggle}
        >
          New Caption
        </Button>
      </div>

      {newCaptionToggle && (
        <div className="container">
          <Paper className={classes.paper}>
            <div>
              <form
                onReset={handleNewCaptionReset}
                onSubmit={handleNewCaptionSubmit}
                style={{ textAlign: "center" }}
              >
                <TextField
                  variant="outlined"
                  label="Caption"
                  multiline
                  onChange={(e) => setCaption(e.target.value)}
                />
                <br />
                <Button size="small" color="primary" type="reset">
                  Cancel
                </Button>
                <Button size="small" color="primary" type="submit">
                  Save
                </Button>
              </form>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
}

export default SetCaption;
