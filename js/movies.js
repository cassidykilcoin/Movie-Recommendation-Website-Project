import Navbar from "./Navbar.js";
import CardsConfigure from "./card.js";
import { movies } from "../more-movies.js";

var movieList = movies.items;
if (!window.sessionStorage.getItem("movies")) {
  window.sessionStorage.setItem("movies", JSON.stringify(movieList));
}

var page = React.createElement(
  "div",
  null,
  React.createElement(Navbar, null),
  React.createElement(CardsConfigure, { movies: JSON.parse(window.sessionStorage.getItem("movies")) })
);
ReactDOM.render(page, document.getElementById("root"));