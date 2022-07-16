var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/fontawesome-svg-core'


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
      isAdded: false,
      isHoverShown: false
    };

    // console.log(window.location.pathname)
    // onload 2 movies into watchlist
    if (window.location.pathname == "/") {
      if (props.title == "the nicholas cage story" || props.title == "how to watch movies") {
        _this2.addMovie();
      }
    }

    var watchList = JSON.parse(window.sessionStorage.getItem("watchlist"));
    if (watchList != null && watchList[props.title] != undefined) {
      _this2.state.isAdded = true; // this is to keep the checkMark after refreshing
    }
    return _this2;
  }

  // should standardize height of movie cards in each row
  // it doesn't look good whenb they are uneven


  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this3 = this;

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
              { className: "row g-0" },
              React.createElement(
                "div",
                { className: "col-12 col-md-4" },
                React.createElement("img", { src: this.props.imageLink, width: "100px" })
              ),
              React.createElement(
                "div",
                { className: "col-12 col-md-6" },
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
                )
              ),
              React.createElement(
                "div",
                { className: "col-12 col-md-2 mt-4 mt-md-0" },
                !this.state.isAdded && React.createElement(
                  "a",
                  { className: "btn btn-outline-primary save",
                    onClick: function onClick() {
                      return _this3.addMovie();
                    }, id: "save",
                    "data-bs-toggle": "tooltip", "data-bs-placement": "top", trigger: "hover",
                    title: this.state.isAdded ? "a" : "Add to watchlist"
                  },
                  React.createElement("img", { src: "images/save.svg", width: "30px" })
                ),
                this.state.isAdded && React.createElement("img", { src: "images/check.svg", width: "30px" })
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
  }, {
    key: "deleteCard",
    value: function deleteCard() {
      if (confirm("Are you sure to remove the movie?")) {
        this.disableDiv();
      }
    }

    // title will be the key in sessionStorage

  }, {
    key: "addMovie",
    value: function addMovie() {
      var movieToStore = this.props.title;
      var storedMovies = JSON.parse(window.sessionStorage.getItem("watchlist"));
      if (!storedMovies) {
        storedMovies = {};
      }
      if (!storedMovies[movieToStore]) {
        var info = {
          title: this.props.title,
          description: this.props.description,
          imageLink: this.props.imageLink,
          labels: this.props.labels,
          dateAdded: new Date().toDateString(),
          rating: this.props.rating
        };
        storedMovies[movieToStore] = info;
      }
      // else {
      //   delete storedMovies[movieToStore];
      // }
      window.sessionStorage.setItem("watchlist", JSON.stringify(storedMovies));
      // this.setState({ isAdded: !this.state.isAdded })
      this.setState({ isAdded: true });
      console.log(this.state.isAdded);
    }
  }, {
    key: "disableDiv",
    value: function disableDiv() {
      this.setState({ closeCard: !this.state.closeCard });
      var movies = JSON.parse(window.sessionStorage.getItem("movies"));
      if (movies != null) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {

          for (var _iterator = movies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var movie = _step.value;

            if (movie.title == this.props.title) {
              //  console.log(movie.title)
              console.log(movies);
              var index = movies.indexOf(movie);
              //  delete movies[index];
              if (index !== -1) {
                movies.splice(index, 1);
              }
              console.log(movies);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      window.sessionStorage.setItem("movies", JSON.stringify(movies));
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

var preferences = { "Likes": JSON.parse(window.sessionStorage.getItem("Likes")), "Dislikes": JSON.parse(window.sessionStorage.getItem("Dislikes")) };
export default function CardsConfigure(props) {
  var sortedMovies = props.movies.sort(sortPreferences);
  var cards = sortedMovies.map(function (movie) {
    return React.createElement(
      "div",
      { className: "col my-3" },
      React.createElement(Card, { title: movie.title, description: movie.description, imageLink: movie.imageLink,
        labels: movie.labels, rating: movie.rating })
    );
  });
  return React.createElement(
    "div",
    { className: "container my-4" },
    React.createElement(
      "div",
      { className: "row row-cols-1 row-cols-md-2" },
      cards
    )
  );
}

function calcScore(movie) {
  console.log(preferences);
  console.log(preferences.Likes == null && preferences.Dislikes == null);
  if (preferences.Likes == null && preferences.Dislikes == null) {
    return 0;
  }
  return movie.labels.map(function (e) {
    return preferences["Likes"].includes(e) ? 1 : preferences["Dislikes"].includes(e) ? -3 : 0;
  }).reduce(function (a, b) {
    return a + b;
  }, 0);
}

function sortPreferences(firstEl, secondEl) {
  return calcScore(secondEl) - calcScore(firstEl);
}