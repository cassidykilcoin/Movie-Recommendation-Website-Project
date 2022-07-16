var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Label = function (_React$Component) {
  _inherits(Label, _React$Component);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).apply(this, arguments));
  }

  _createClass(Label, [{
    key: "render",
    value: function render() {
      var element = React.createElement(
        "div",
        { className: "badge bg-primary rounded-pill text-white fs-6 m-1" },
        this.props.label
      );
      return element;
    }
  }]);

  return Label;
}(React.Component);

var Card = function (_React$Component2) {
  _inherits(Card, _React$Component2);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this2 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

    _this2.state = {
      isViewDetail: false,
      disabled: true,
      closeCard: false,
      // isAdded: false,
      isHoverShown: false
    };
    return _this2;
  }

  // should standardize height of movie cards in each row
  // it doesn't look good whenb they are uneven


  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      // console.log(this.props)
      var element = React.createElement(
        "div",
        null,
        !this.state.closeCard && React.createElement(
          "div",
          { className: "card text-center position-relative" },
          React.createElement(
            "button",
            { className: "btn position-absolute top-0 start-0 translate-middle",
              onClick: function onClick() {
                return _this3.deleteCard();
              } },
            React.createElement("img", { src: "images/close.svg", height: "30", width: "30" })
          ),
          React.createElement(
            "div",
            { className: "card-body mb-3" },
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                  "div",
                  { className: "row" },
                  React.createElement(
                    "h2",
                    { className: "card__title" },
                    this.props.title
                  )
                ),
                React.createElement(
                  "div",
                  null,
                  this.props.labels.map(function (label) {
                    return React.createElement(Label, { label: label });
                  })
                ),
                React.createElement(
                  "div",
                  { className: "badge bg-dark" },
                  "Rating: ",
                  this.props.rating
                )
              ),
              React.createElement(
                "div",
                { className: "col-md-2" },
                React.createElement(
                  "div",
                  { className: "badge bg-info text-dark" },
                  "Added: ",
                  this.props.dateAdded
                )
              )
            )
          ),
          React.createElement(
            "a",
            { tabindex: "0", "class": "btn btn-outline-primary", role: "button", "data-bs-toggle": "popover",
              "data-bs-trigger": "focus", "data-bs-placement": "bottom", title: this.props.title,
              "data-bs-content": this.props.description },
            "View Details"
          )
        )
      );

      return element;
    }

    // deletes a movie card after X button is clicked

  }, {
    key: "deleteCard",
    value: function deleteCard() {
      if (confirm("Are you sure to remove the movie?")) {
        this.disableDiv();
      }
    }

    // changes state of closeCard from false to true
    // TEST: this is where you'll add the undo button for removing a movie

  }, {
    key: "disableDiv",
    value: function disableDiv() {
      this.setState({ closeCard: !this.state.closeCard });

      var movies = JSON.parse(window.sessionStorage.getItem("watchlist"));
      movies[this.props.title] = undefined;

      window.sessionStorage.setItem("watchlist", JSON.stringify(movies));
      window.location.reload(true);
    }
  }, {
    key: "details",
    value: function details() {
      this.setState({ isViewDetail: !this.state.isViewDetail, disabled: !this.state.disabled });
    }
  }, {
    key: "description",
    value: function description() {
      var element = React.createElement(
        "div",
        { className: "card" },
        React.createElement(
          "div",
          { className: "card__body" },
          React.createElement(
            "p",
            { className: "card__description" },
            " ",
            this.props.description
          )
        )
      );
      return element;
    }
  }]);

  return Card;
}(React.Component);

// TEST: dateAdded to Card
// TEST: sessionStorage pull goes here (at/before sortedMovies)


var preferences = { "Likes": ["Western", "Romance", "Thriller"], "Dislikes": ["Comedy"] };
export default function CardsConfigure(props) {
  console.log(props.movies);
  var sortedMovies = props.movies.sort(sortPreferences);
  var cards = sortedMovies.map(function (movie) {
    return React.createElement(
      "div",
      { className: "col my-3" },
      React.createElement(Card, { title: movie.title, description: movie.description, dateAdded: movie.dateAdded,
        labels: movie.labels, rating: movie.rating })
    );
  });
  return React.createElement(
    "div",
    { className: "container my-4" },
    React.createElement(
      "div",
      { className: "row row-cols-2" },
      cards
    )
  );
}

function calcScore(movie) {
  return movie.labels.map(function (e) {
    return preferences["Likes"].includes(e) ? 1 : preferences["Dislikes"].includes(e) ? -3 : 0;
  }).reduce(function (a, b) {
    return a + b;
  }, 0);
}

function sortPreferences(firstEl, secondEl) {
  return calcScore(secondEl) - calcScore(firstEl);
}