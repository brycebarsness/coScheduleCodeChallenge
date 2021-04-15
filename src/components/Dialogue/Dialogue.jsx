import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { ButtonGroup, TextField } from "@material-ui/core";

function AlertDialogSlide({ gif }) {
  const [details, setDetails] = useState({
    gif: gif.props,
    category: gif.category_id || 0,
    comments: gif.comments || "",
  });

  const dispatch = useDispatch();

  function dispatchDetails() {
    dispatch({
      type: "SET_DETAILS",
      payload: details,
    });
  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{
          color: "white",
          backgroundColor: "#FF00CC",
        }}
        variant="contained"
        // className={classes.button}
        endIcon={<FavoriteRoundedIcon />}
      >
        Rate this gif
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{ fontSize: "2rem", marginTop: 0 }}
          id="alert-dialog-slide-title"
        >
          {gif.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
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
                setDetails({
                  category: 0,
                  comments: "",
                });
              }}
              onSubmit={(dispatchDetails, handleClose)}
            >
              <label>You think this gif is {details.category}?</label>
              <select
                value={details.category}
                onChange={(event) =>
                  setDetails({
                    ...details,
                    category: event.target.value,
                  })
                }
              >
                <option value="0">select a category</option>
                <option value="1">Funny</option>
                <option value="2">Cohort</option>
                <option value="3">Cartoon</option>
                <option value="4">NSFW</option>
                <option value="5">Meme</option>
              </select>
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
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Close
          </Button>
          <Button variant="outlined" color="primary" type="reset">
            Reset
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialogSlide;
