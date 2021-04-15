import { useEffect } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ParallaxSlide from "@mui-treasury/components/slide/parallax";
import DotIndicator from "@mui-treasury/components/indicator/dot";
import { useArrowDarkButtonStyles } from "@mui-treasury/styles/button/arrowDark";
import { useDispatch, useSelector } from "react-redux";
import "./Carousel.css";

const useStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
  root: {
    // a must if you want to set arrows, indicator as absolute
    position: "relative",
    width: "100%",
  },
  slide: {
    perspective: 1500, // create perspective
    overflow: "hidden",
    // relative is a must if you want to create overlapping layers in children
    position: "relative",
    paddingTop: spacing(8),
    [breakpoints.up("sm")]: {
      paddingTop: spacing(10),
    },
    [breakpoints.up("md")]: {
      paddingTop: spacing(14),
    },
  },
  imageContainer: {
    display: "block",
    position: "relative",
    zIndex: 2,
    paddingBottom: "52.25%",
    paddingLeft: "28.25%",
  },
  image: {
    [breakpoints.up("sm")]: {
      marginLeft: "30%",
    },
  },
  arrow: {
    display: "none",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [breakpoints.up("sm")]: {
      display: "inline-flex",
    },
  },
  arrowLeft: {
    left: 0,
    [breakpoints.up("lg")]: {
      left: -64,
    },
  },
  arrowRight: {
    right: 0,
    [breakpoints.up("lg")]: {
      right: -64,
    },
  },
  text: {
    // shared style for text-top and text-bottom
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sansSerif",
    fontWeight: 900,
    position: "absolute",
    color: palette.common.white,
    padding: "0 8px",
    transform: "rotateY(45deg)",
    lineHeight: 1.2,
    margin: "5px",
    [breakpoints.up("sm")]: {
      padding: "0 15px",
    },
    [breakpoints.up("md")]: {
      padding: "0 15px",
    },
  },
  title: {
    top: 40,
    left: "20%",
    height: "50%",
    fontSize: 25,
    zIndex: 1,
    background: "linear-gradient(0deg, rgba(255,255,255,0) 0%, #9c9c9c 100%)",
    [breakpoints.up("sm")]: {
      top: 52,
      fontSize: 35,
    },
    [breakpoints.up("md")]: {
      top: 64,
      fontSize: 45,
    },
  },
  subtitle: {
    top: 56,
    left: "0%",
    height: "62%",
    fontSize: 40,
    zIndex: 2,
    background: "linear-gradient(0deg, rgba(255,255,255,0) 0%, #888888 100%)",
    [breakpoints.up("sm")]: {
      top: 96,
      left: "6%",
      fontSize: 52,
    },
    [breakpoints.up("md")]: {
      top: 104,
      fontSize: 68,
    },
  },
  indicatorContainer: {
    textAlign: "center",
  },
}));

const ParallaxCarousel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
  }, []);
  const favoritesList = useSelector(
    (store) => store.favorites.favoritesReducer
  );
  const data = favoritesList;
  const arrowStyles = useArrowDarkButtonStyles();
  const createStyle = (slideIndex, fineIndex) => {
    const diff = slideIndex - fineIndex;
    if (Math.abs(diff) > 1) return {};
    return {
      transform: `rotateY(${(-diff + 1) * 45}deg)`,
    };
  };
  //   eslint-disable-next-line react/prop-types
  const renderElements = ({ index, onChangeIndex }) => (
    <>
      <Button
        className={cx(classes.arrow, classes.arrowLeft)}
        classes={arrowStyles}
        disabled={index === 0}
        onClick={() => onChangeIndex(index - 1)}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        className={cx(classes.arrow, classes.arrowRight)}
        classes={arrowStyles}
        disabled={index === data.length - 1}
        onClick={() => onChangeIndex(index + 1)}
      >
        <KeyboardArrowRight />
      </Button>
      <div className={classes.indicatorContainer}>
        {data.map((gif, i) => (
          <DotIndicator
            key={i}
            active={i === index}
            onClick={() => onChangeIndex(i)}
          />
        ))}
      </div>
    </>
  );
  const renderChildren = ({ injectStyle, fineIndex }) =>
    data.map((gif, i) => (
      <div key={i} className={classes.slide}>
        <Typography
          noWrap
          className={cx(classes.text, classes.title)}
          style={{ ...injectStyle(i, 70), ...createStyle(i, fineIndex) }}
        >
          {gif.caption ? gif.caption : "Add a caption, click Edit Favorites"}
        </Typography>
        <Typography
          noWrap
          className={cx(classes.text, classes.subtitle)}
          style={{ ...injectStyle(i, 70), ...createStyle(i, fineIndex) }}
        >
          {gif.name ? gif.name : "Rate this Giph"}
        </Typography>
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src={gif.url}
            alt={"slide"}
            style={{
              height: "300px",
              width: "370px",
              objectFit: "cover",
              borderRadius: "1%",
              border: "solid grey 2px",
              display: "block",
              position: "absolute",
              zIndex: 30,
              marginTop: "10%",
              marginLeft: "30%",
              ...injectStyle(i, 70),
              ...createStyle(i, fineIndex),
            }}
          />
        </div>
      </div>
    ));
  return (
    <div>
      <div className="app">
        <div className="header">
          <h1>Favorites Library</h1>
        </div>
      </div>
      <div className={classes.root}>
        <ParallaxSlide renderElements={renderElements}>
          {renderChildren}
        </ParallaxSlide>
      </div>
    </div>
  );
};

export default ParallaxCarousel;
