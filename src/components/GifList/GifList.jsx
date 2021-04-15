import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import Rate from "../Rate/Rate";
import Dialogue from "../Dialogue/Dialogue";

function GifList() {
  const giphyList = useSelector(
    (store) => store.giphyList.giphyListReducer.data
  );
  const [rateToggle, setRateToggle] = useState(false);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  let gifDisplay = "";

  const classes = useStyles();
  if (giphyList) {
    gifDisplay = giphyList.map((gif, i) => (
      <div key={i} className="gifimage">
        <Rate gif={gif} />
        {/* <img
          src={gif.images.downsized_medium.url}
          style={{
            height: 250,
            width: 250,
            objectFit: "cover",
            borderRadius: "10%",
            border: "solid gray 1px",
          }}
        /> */}

        {/* <Dialogue gif={gif} /> */}

        {/* {rateToggle && <Rate setRateToggle={setRateToggle} gif={gif} />} */}
      </div>
    ));
  } else {
    gifDisplay = <p>No Results</p>;
  }

  return <div>{gifDisplay}</div>;
}

export default GifList;
