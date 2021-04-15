import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  makeStyles,
  Button,
  ButtonGroup,
  TextField,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

function Rate({ gif }) {
  const [details, setDetails] = useState({
    gif: gif.props,
    category: gif.category_id || 0,
    comments: gif.comments || "leave a comment!",
  });

  const dispatch = useDispatch();

  function dispatchDetails() {
    dispatch({
      type: "SET_DETAILS",
      payload: details,
    });
  }

  return (
    <Card style={{ margin: "5px", border: "solid gray 1px" }}>
      <div>
        <h3 style={{ fontSize: "2rem", marginTop: 0 }}>{gif.title}</h3>
        <img
          src={gif.images.downsized_medium.url}
          style={{
            height: 250,
            width: 250,
            objectFit: "cover",
            borderRadius: "10%",
            border: "solid gray 1px",
          }}
        />
        <form
          onReset={() => {
            setParentEditScreen(false);
            setHomeDefaultView(true);
          }}
          onSubmit={dispatchDetails}
        >
          <div>
            <h2>You think this gif is {details.category}?</h2>
            <select
              value={details.category}
              onChange={(event) =>
                setDetails({
                  ...details,
                  category: event.target.value,
                })
              }
              id="category"
              name="category"
            >
              <option value="0">Unassigned</option>
              <option value="1">Funny</option>
              <option value="2">Cohort</option>
              <option value="3">Cartoon</option>
              <option value="4">NSFW</option>
              <option value="5">Meme</option>
            </select>
            <div>
              <h2>Comments</h2>
              <TextField
                type="text"
                variant="outlined"
                label="comments"
                size="small"
                value={details.comments}
                onChange={(event) =>
                  setDetails({
                    ...details,
                    comments: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <ButtonGroup>
            <Button variant="outlined" color="primary" type="reset">
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            {/* <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => dispatch({ type: "DELETE_FAV", payload: gif.id })}
          >
            Delete
          </Button> */}
          </ButtonGroup>
        </form>
      </div>
    </Card>
  );
}

export default Rate;
