
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
      // isAdded: false,
      isHoverShown: false
    };
  }


  // should standardize height of movie cards in each row
  // it doesn't look good whenb they are uneven
  render() {
    // console.log(this.props)
    const element = (
      <div>{!this.state.closeCard &&

        <div className="card text-center position-relative">
          {/* replace the X with icon */}
          <button className="btn position-absolute top-0 start-0 translate-middle"
            onClick={() => this.deleteCard()}>
            <img src="images/close.svg" height="30" width="30" />
          </button>

          <div className="card-body mb-3">

            <div className="row">

              {/** added dateAdded */}
              <div className="col-md-12">
                <div className="row"><h2 className="card__title">{this.props.title}</h2></div>
                <div>{this.props.labels.map((label) => <Label label={label} />)}</div>
                <div className="badge bg-dark">Rating: {this.props.rating}</div>
              </div>
              <div className="col-md-2">
              <div className="badge bg-info text-dark">Added: {this.props.dateAdded}</div>
                {/* use icon for this button, and less intrusive hover state */}
                {/* */}
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

  // deletes a movie card after X button is clicked
  deleteCard() {
    if (confirm("Are you sure to remove the movie?")) {
      this.disableDiv();
    }
  }

  // changes state of closeCard from false to true
  // TEST: this is where you'll add the undo button for removing a movie
  disableDiv() {
    this.setState({ closeCard: !this.state.closeCard });

    var movies = JSON.parse(window.sessionStorage.getItem("watchlist"))
    movies[this.props.title] = undefined

    window.sessionStorage.setItem("watchlist", JSON.stringify(movies))
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
    return (element);
  }


}

// TEST: dateAdded to Card
// TEST: sessionStorage pull goes here (at/before sortedMovies)
const preferences = { "Likes": ["Western", "Romance", "Thriller"], "Dislikes": ["Comedy"] }
export default function CardsConfigure(props) {
  console.log(props.movies)
  const sortedMovies = props.movies.sort(sortPreferences);
  const cards = sortedMovies.map((movie) => {
    return (
      <div className="col my-3">
        <Card title={movie.title} description={movie.description} dateAdded={movie.dateAdded}
          labels={movie.labels} rating={movie.rating}/>
      </div>
    )
  });
  return (
    <div className="container my-4">
      <div className="row row-cols-2">
        {cards}
      </div>
    </div>
  )
}

function calcScore(movie) {
  return movie.labels.map((e) => { return preferences["Likes"].includes(e) ? 1 : preferences["Dislikes"].includes(e) ? -3 : 0 }).reduce((a, b) => a + b, 0);

}

function sortPreferences(firstEl, secondEl) {
  return calcScore(secondEl) - calcScore(firstEl);
}
