var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Navbar from "./Navbar.js";
import CardsConfigure from "./watchlistCard.js";

/*
class MovieEntry extends React.Component {
  render() {
    const movie = this.props.entry;

    let cardBody = <div className="card-body">Runtime: {movie.runtime}</div>

    let cardTitle = <div className="card-title"><h2>{movie.title}</h2></div>
    let cardDiv = <div className="card text-center">{cardTitle}{cardBody}</div>
    return cardDiv
  }
}
class ListMovies extends React.Component {
  render() {
    const movieListOutput = this.props.movies.map((k) => { return <MovieEntry entry={k} /> });
    return <div className="col-6 text-center">{movieListOutput}</div>;
  }
}
*/

// the movie cards
// TEST: created "date added" to "how to watch movies"

var watchlist = {
  // "the nicholas cage story": {
  //  title: "the nicholas cage story", 
  //  imageLink:"https://api.time.com/wp-content/uploads/2014/04/marguerite-kalhor-nic-cage-painting.jpg", 
  //  labels:["Spiritual", "Psychological Horror"],
  //  description:"the haunting tale of a man with too much talent and a dream far too big" 
  // },
  // "how to watch movies": {
  //  title: "how to watch movies", 
  //  imageLink:"https://www.wikihow.com/images/thumb/9/9a/Watch-a-Movie-Step-1.jpeg/v4-460px-Watch-a-Movie-Step-1.jpeg", 
  //  labels:["Autobiography"],
  //  dateAdded: "",
  //  description:"wikihows personal journey into the world of movie watching"
  // }
};

if (!window.sessionStorage.getItem("watchlist")) {
  window.sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
}
// TEST: if !(movies in sessionStorage) add movies to sessionStorage
// TEST: change variable name from "movies" to "watchlist"
// TEST: get values from watchlist dict (preferably a function)

// TEST: this funct needs to change the dict to a list

var GetWatchlistMovies = function (_React$Component) {
  _inherits(GetWatchlistMovies, _React$Component);

  function GetWatchlistMovies() {
    _classCallCheck(this, GetWatchlistMovies);

    return _possibleConstructorReturn(this, (GetWatchlistMovies.__proto__ || Object.getPrototypeOf(GetWatchlistMovies)).apply(this, arguments));
  }

  _createClass(GetWatchlistMovies, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (Object.keys(this.props.watchlist).length === 0) {
        return React.createElement(
          "h2",
          null,
          "You don't have anything in your list. Check out the Preferences and Recommendations pages to get started."
        );
      }

      var movieKeys = Object.keys(this.props.watchlist);

      var allMovies = React.createElement(CardsConfigure, { movies: movieKeys.map(function (thisMovie) {
          return _this2.props.watchlist[thisMovie];
        }) });

      return allMovies;
    }
  }]);

  return GetWatchlistMovies;
}(React.Component);

var page = React.createElement(
  "div",
  null,
  React.createElement(Navbar, null),
  React.createElement(GetWatchlistMovies, { watchlist: JSON.parse(window.sessionStorage.getItem("watchlist")) })
);
ReactDOM.render(page, document.getElementById("root"));
/*
console.log(rowDiv)
let rowDiv = <ListMovies movies={movies} />;
let page = <div><Navbar />{rowDiv}</div>;
*/