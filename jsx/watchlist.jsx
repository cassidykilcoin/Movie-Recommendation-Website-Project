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

const watchlist = {
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
}

if (!window.sessionStorage.getItem("watchlist")) {
  window.sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
}
// TEST: if !(movies in sessionStorage) add movies to sessionStorage
// TEST: change variable name from "movies" to "watchlist"
// TEST: get values from watchlist dict (preferably a function)

// TEST: this funct needs to change the dict to a list

class GetWatchlistMovies extends React.Component {

  render() {

    if (Object.keys(this.props.watchlist).length === 0) {
      return <h2>You don't have anything in your list. Check out the Preferences and Recommendations pages to get started.</h2>
    }

    const movieKeys = Object.keys(this.props.watchlist);

    const allMovies = <CardsConfigure movies={movieKeys.map((thisMovie) => this.props.watchlist[thisMovie])} />;

    return (allMovies);
  }
}

const page = (<div>
  <Navbar />
  {/** TEST: pass in sessionStorage.movies.get() */}
  <GetWatchlistMovies watchlist={JSON.parse(window.sessionStorage.getItem("watchlist"))} />
</div>)
ReactDOM.render(page, document.getElementById("root"));
/*
console.log(rowDiv)
let rowDiv = <ListMovies movies={movies} />;
let page = <div><Navbar />{rowDiv}</div>;
*/

