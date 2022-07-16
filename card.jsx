// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/fontawesome-svg-core'


class Label extends React.Component {
  render() {
    const element = (

      <div className="badge bg-primary rounded-pill text-white fs-6 m-1">{this.props.label}</div>

    );
    return (element);
  }

}

class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isViewDetail: false,
      disabled: true,
      closeCard: false,
      isAdded: false,
      isHoverShown: false
    };

    // console.log(window.location.pathname)
    // onload 2 movies into watchlist
    if (window.location.pathname == "/") {
      if (props.title == "the nicholas cage story" || props.title == "how to watch movies") {
        this.addMovie()
      }
    }

    const watchList = JSON.parse(window.sessionStorage.getItem("watchlist"));
    if (watchList != null && watchList[props.title] != undefined) {
      this.state.isAdded = true  // this is to keep the checkMark after refreshing
    }
  }

  // should standardize height of movie cards in each row
  // it doesn't look good whenb they are uneven
  render() {
    const element = (
      <div>{!this.state.closeCard &&
        <div className="card text-center position-relative">


          <button className="btn position-absolute top-0 start-0 translate-middle"
            onClick={() => this.deleteCard()}>
            <img src="images/close.svg" height="30" width="30" />
          </button>


          <div className="card-body mb-3">

            <div className="row g-0">

              <div className="col-12 col-md-4"><img src={this.props.imageLink} width="100px" /></div>
              <div className="col-12 col-md-6">
                <div className="row"><h2 className="card__title">{this.props.title}</h2></div>
                <div>{this.props.labels.map((label) => <Label label={label} />)}</div>
              </div>
              <div className="col-12 col-md-2 mt-4 mt-md-0">
                {/* add-to-watchlist button */}
                {!this.state.isAdded && <a className={"btn btn-outline-primary save"}
                  onClick={() => this.addMovie()} id="save"
                  data-bs-toggle="tooltip" data-bs-placement="top" trigger="hover"
                  title={this.state.isAdded ? "a" : "Add to watchlist"}
                >
                  <img src="images/save.svg" width="30px" />
                </a>}

                {this.state.isAdded && <img src="images/check.svg" width="30px" />}

              </div>
            </div>

          </div>
          <a tabindex="0" class="btn btn-outline-primary" role="button" data-bs-toggle="popover"
            data-bs-trigger="focus" data-bs-placement="bottom" title={this.props.title}
            data-bs-content={this.props.description}>
            View Details
          </a>

        </div>

      }
      </div>
    );

    return (element);

  }

  deleteCard() {
    if (confirm("Are you sure to remove the movie?")) {
      this.disableDiv();
    }
  }

  // title will be the key in sessionStorage
  addMovie() {
    let movieToStore = this.props.title;
    let storedMovies = JSON.parse(window.sessionStorage.getItem("watchlist"));
    if (!storedMovies) {
      storedMovies = {}
    }
    if (!storedMovies[movieToStore]) {
      let info = {
        title: this.props.title,
        description: this.props.description,
        imageLink: this.props.imageLink,
        labels: this.props.labels,
        dateAdded: new Date().toDateString(),
        rating: this.props.rating
      }
      storedMovies[movieToStore] = info
    }
    // else {
    //   delete storedMovies[movieToStore];
    // }
    window.sessionStorage.setItem("watchlist", JSON.stringify(storedMovies));
    // this.setState({ isAdded: !this.state.isAdded })
    this.setState({ isAdded: true })
    console.log(this.state.isAdded);
  }

  disableDiv() {
    this.setState({ closeCard: !this.state.closeCard });
    var movies = JSON.parse(window.sessionStorage.getItem("movies"))
    if (movies != null) {


      for (const movie of movies) {
        if (movie.title == this.props.title) {
          //  console.log(movie.title)
          console.log(movies)
          var index = movies.indexOf(movie);
          //  delete movies[index];
          if (index !== -1) {
            movies.splice(index, 1);
          }
          console.log(movies)
        }
      }
    }
    window.sessionStorage.setItem("movies", JSON.stringify(movies))
    window.location.reload(true);
  }

  details() {
    this.setState({ isViewDetail: !this.state.isViewDetail, disabled: !this.state.disabled })
  }

  description() {
    const element = (
      <div className="card">
        <div className="card__body">
          <p className="card__description"> {this.props.description}</p>
        </div>
      </div>
    );
    return (element)
  }


}


const preferences = { "Likes": JSON.parse(window.sessionStorage.getItem("Likes")), "Dislikes": JSON.parse(window.sessionStorage.getItem("Dislikes")) }
export default function CardsConfigure(props) {
  const sortedMovies = props.movies.sort(sortPreferences);
  const cards = sortedMovies.map((movie) => {
    return (
      <div className="col my-3">
        <Card title={movie.title} description={movie.description} imageLink={movie.imageLink}
          labels={movie.labels} rating={movie.rating} />
      </div>
    )
  });
  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-md-2">
        {cards}
      </div>
    </div>
  )
}

function calcScore(movie) {
  console.log(preferences)
  console.log(preferences.Likes == null && preferences.Dislikes == null)
  if (preferences.Likes == null && preferences.Dislikes == null) {
    return 0
  }
  return movie.labels.map((e) => { return preferences["Likes"].includes(e) ? 1 : preferences["Dislikes"].includes(e) ? -3 : 0 }).reduce((a, b) => a + b, 0);

}

function sortPreferences(firstEl, secondEl) {
  return calcScore(secondEl) - calcScore(firstEl);
}




