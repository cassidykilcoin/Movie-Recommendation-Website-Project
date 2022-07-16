var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Navbar from "./Navbar.js";

/* 
pref-cards need to update the session storage whenever they're moved
    Specifically, when a pref-card is dropped into the likes basket into the dislikes basket, the session
    storage should remove the prefID of the card from the likes list and then put the prefID of the card
    into it's dislikes list. This should happen whenever a pref-card is moved between the tagMenu, the Likes basket,
    and the dislikes basked.
 */

// This is the list of tags that movies can have
var prefCardsToInit = ["Western", "RatedX", "Romance", "Action", "Drama", "Crime", "Adventure", "Biography", "Music", "Horror", "Sci-Fi", "Thriller", "Mystery", "History", "Animation", "War", "Family", "Fantasy"];
if (!window.sessionStorage.getItem("TagMenu")) {
  window.sessionStorage.setItem("TagMenu", JSON.stringify(prefCardsToInit));
}
var likesToInit = ["Comedy"];
if (!window.sessionStorage.getItem("Likes")) {
  window.sessionStorage.setItem("Likes", JSON.stringify(likesToInit));
}
var dislikesToInit = ["Tragedy"];
if (!window.sessionStorage.getItem("Dislikes")) {
  window.sessionStorage.setItem("Dislikes", JSON.stringify(dislikesToInit));
}

var PrefCard = function (_React$Component) {
  _inherits(PrefCard, _React$Component);

  function PrefCard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PrefCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PrefCard.__proto__ || Object.getPrototypeOf(PrefCard)).call.apply(_ref, [this].concat(args))), _this), _this.handleDrag = function (e) {
      //console.log("drag");
      e.dataTransfer.setData("text", _this.props.prefID);
      //console.log(e.dataTransfer.getData("text")); // this shows that the data is correct.
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PrefCard, [{
    key: "clickFunction",
    value: function clickFunction() {
      this.props.moveTag(this.props.location, "TagMenu", this.props.prefID);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        {
          onDragStart: this.handleDrag },
        React.createElement(
          "div",
          { className: "col" },
          React.createElement(
            "div",
            { className: "card", draggable: true },
            React.createElement(
              "div",
              { className: "card-body text-right" },
              React.createElement(
                "div",
                { className: "card-text text-center" },
                React.createElement(
                  "h4",
                  null,
                  this.props.prefID
                )
              ),
              this.props.location == "tagMenu" ? "" : React.createElement(
                "div",
                { className: "btn btn-primary me-1", onClick: function onClick() {
                    return _this2.clickFunction();
                  } },
                "X"
              )
            )
          )
        )
      );
    }
  }]);

  return PrefCard;
}(React.Component);

var CardList = function (_React$Component2) {
  _inherits(CardList, _React$Component2);

  function CardList() {
    _classCallCheck(this, CardList);

    return _possibleConstructorReturn(this, (CardList.__proto__ || Object.getPrototypeOf(CardList)).apply(this, arguments));
  }

  _createClass(CardList, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        "div",
        { className: "row" },
        this.props.cards.map(function (card) {
          return React.createElement(
            "div",
            { className: "col-lg-4 col-sm-6 col-12" },
            React.createElement(PrefCard, { prefID: card, location: _this4.props.location, moveTag: _this4.props.moveTag })
          );
        })
      );
    }
  }]);

  return CardList;
}(React.Component);

var TagMenu = function (_React$Component3) {
  _inherits(TagMenu, _React$Component3);

  function TagMenu() {
    _classCallCheck(this, TagMenu);

    return _possibleConstructorReturn(this, (TagMenu.__proto__ || Object.getPrototypeOf(TagMenu)).apply(this, arguments));
  }

  _createClass(TagMenu, [{
    key: "updateCardList",
    value: function updateCardList() {
      this.setState({ cardsInMenu: JSON.parse(window.sessionStorage.getItem("TagMenu")) });
    }
  }, {
    key: "render",
    value: function render() {
      //console.log(this.props.cardsInMenu);
      var tagMenuDiv = React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "div",
            { className: "accordion" },
            React.createElement(
              "div",
              { className: "accordion-item" },
              React.createElement(
                "div",
                { className: "card" },
                React.createElement(
                  "h2",
                  { className: "accordion-header", id: "panelsStayOpen-headingOne" },
                  React.createElement(
                    "button",
                    { className: "accordion-button btn btn-primary me-1 collapsed", type: "button",
                      "data-bs-toggle": "collapse",
                      "data-bs-target": "#panelsStayOpen-collapseOne", "aria-expanded": "false",
                      "aria-controls": "panelsStayOpen-collapseOne" },
                    "Preferences"
                  )
                ),
                React.createElement(
                  "div",
                  { id: "panelsStayOpen-collapseOne", className: "accordion-collapse collapse",
                    "aria-labelledby": "panelsStayOpen-headingOne" },
                  React.createElement(
                    "div",
                    { className: "accordion-body" },
                    React.createElement(
                      "div",
                      { className: "card" },
                      React.createElement(CardList, { cards: this.props.tags, location: "tagMenu" })
                    )
                  )
                )
              )
            )
          )
        )
      );
      return tagMenuDiv;
    }
  }]);

  return TagMenu;
}(React.Component);

var LikeBasket = function (_React$Component4) {
  _inherits(LikeBasket, _React$Component4);

  function LikeBasket() {
    var _ref2;

    var _temp2, _this6, _ret2;

    _classCallCheck(this, LikeBasket);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this6 = _possibleConstructorReturn(this, (_ref2 = LikeBasket.__proto__ || Object.getPrototypeOf(LikeBasket)).call.apply(_ref2, [this].concat(args))), _this6), _this6.handleDrop = function (e) {
      var prefID = e.dataTransfer.getData("text");
      var tagMenu = JSON.parse(window.sessionStorage.getItem("TagMenu"));
      var dislikes = JSON.parse(window.sessionStorage.getItem("Dislikes"));
      //console.log(prefID);
      e.preventDefault();
      e.stopPropagation();

      tagMenu = tagMenu.filter(function (e) {
        return e == prefID;
      });
      dislikes = dislikes.filter(function (e) {
        return e == prefID;
      });
      //console.log(tagMenu);
      // This fails if there is no string in tagMenu
      if (tagMenu) {
        // console.log(tagMenu);
        _this6.props.moveTag("TagMenu", "Likes", prefID);
      }
      if (dislikes) {
        // console.log(dislikes);
        _this6.props.moveTag("Dislikes", "Likes", prefID);
      }

      //console.log("Dropped:");
      //console.log(e.dataTransfer.getData("text"));
    }, _this6.handleDragOver = function (e) {
      e.preventDefault();
      e.stopPropagation();
      //console.log("Over");
    }, _temp2), _possibleConstructorReturn(_this6, _ret2);
  }

  _createClass(LikeBasket, [{
    key: "render",
    value: function render() {
      console.log("pref", this.props.tags);

      var baskCase = React.createElement(
        "div",
        { className: "text-center" },
        React.createElement(
          "div",
          { className: "card", onDrop: this.handleDrop, onDragOver: this.handleDragOver },
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "div",
              { className: "card-title" },
              React.createElement(
                "h1",
                null,
                "Likes"
              )
            ),
            React.createElement(
              "div",
              { className: "card" },
              React.createElement(CardList, { cards: this.props.tags, location: "Likes", moveTag: this.props.moveTag })
            )
          )
        )
      );
      return baskCase;
    }
  }]);

  return LikeBasket;
}(React.Component);

var DislikeBasket = function (_React$Component5) {
  _inherits(DislikeBasket, _React$Component5);

  function DislikeBasket() {
    var _ref3;

    var _temp3, _this7, _ret3;

    _classCallCheck(this, DislikeBasket);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this7 = _possibleConstructorReturn(this, (_ref3 = DislikeBasket.__proto__ || Object.getPrototypeOf(DislikeBasket)).call.apply(_ref3, [this].concat(args))), _this7), _this7.handleDrop = function (e) {
      var prefID = e.dataTransfer.getData("text");
      var tagMenu = JSON.parse(window.sessionStorage.getItem("TagMenu"));
      var likes = JSON.parse(window.sessionStorage.getItem("Likes"));
      e.preventDefault();
      e.stopPropagation();

      tagMenu = tagMenu.filter(function (e) {
        return e == prefID;
      });
      likes = likes.filter(function (e) {
        return e == prefID;
      });
      //console.log(tagMenu);
      // This fails if there is no string in tagMenu
      if (tagMenu) {
        //console.log(tagMenu);
        _this7.props.moveTag("TagMenu", "Dislikes", prefID);
      }
      if (likes) {
        //console.log(dislikes);
        _this7.props.moveTag("Likes", "Dislikes", prefID);
      }

      //console.log("Dropped:");
      //console.log(e.dataTransfer.getData("text"));
    }, _this7.handleDragOver = function (e) {
      e.preventDefault();
      e.stopPropagation();
      //console.log("Over");
    }, _temp3), _possibleConstructorReturn(_this7, _ret3);
  }

  _createClass(DislikeBasket, [{
    key: "render",
    value: function render() {
      console.log("pref", this.props.tags);

      var baskCase = React.createElement(
        "div",
        { className: "text-center" },
        React.createElement(
          "div",
          { className: "card", onDrop: this.handleDrop, onDragOver: this.handleDragOver },
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "div",
              { className: "card-title" },
              React.createElement(
                "h1",
                null,
                "Dislikes"
              )
            ),
            React.createElement(
              "div",
              { className: "card" },
              React.createElement(CardList, { cards: this.props.tags, location: "Dislikes", moveTag: this.props.moveTag })
            )
          )
        )
      );
      return baskCase;
    }
  }]);

  return DislikeBasket;
}(React.Component);

var ContainerScreen = function (_React$Component6) {
  _inherits(ContainerScreen, _React$Component6);

  function ContainerScreen(props) {
    _classCallCheck(this, ContainerScreen);

    var _this8 = _possibleConstructorReturn(this, (ContainerScreen.__proto__ || Object.getPrototypeOf(ContainerScreen)).call(this, props));

    _this8.state = {
      likes: JSON.parse(window.sessionStorage.getItem("Likes")),
      dislikes: JSON.parse(window.sessionStorage.getItem("Dislikes")),
      tagMenu: JSON.parse(window.sessionStorage.getItem("TagMenu"))
    };
    return _this8;
  }

  _createClass(ContainerScreen, [{
    key: "updateStateVariable",
    value: function updateStateVariable(location, value) {
      // console.log("loc", location);
      if (location == "Likes") {
        this.setState({ likes: value });
      } else if (location == "Dislikes") {
        this.setState({ dislikes: value });
      } else {
        this.setState({ tagMenu: value });
      }
    }

    //moveTag("TagMenu", "Likes", "western"); //USAGE

  }, {
    key: "moveTag",
    value: function moveTag(start, destination, prefID) {
      //console.log(window.sessionStorage.getItem(start));
      var startArr = JSON.parse(window.sessionStorage.getItem(start));
      var endArr = JSON.parse(window.sessionStorage.getItem(destination));

      startArr = startArr.filter(function (e) {
        return e !== prefID;
      });
      //console.log(endArr);
      //console.log("endArr after pushing:");
      endArr.push(prefID);
      //console.log(endArr);
      startArr = [].concat(_toConsumableArray(new Set(startArr)));
      endArr = [].concat(_toConsumableArray(new Set(endArr)));
      console.log("move", endArr, startArr);
      window.sessionStorage.setItem(start, JSON.stringify(startArr));
      window.sessionStorage.setItem(destination, JSON.stringify(endArr));
      this.updateStateVariable(start, startArr);
      this.updateStateVariable(destination, endArr);
    }
  }, {
    key: "render",
    value: function render() {
      console.log("likes", this.state.likes);
      var containDiv = React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12 col-md-6" },
            React.createElement(TagMenu, { tags: this.state.tagMenu })
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-6" },
            React.createElement(LikeBasket, { tags: this.state.likes, moveTag: this.moveTag.bind(this) })
          ),
          React.createElement(
            "div",
            { className: "col-6" },
            React.createElement(DislikeBasket, { tags: this.state.dislikes, moveTag: this.moveTag.bind(this) })
          )
        )
      );
      return containDiv;
    }
  }]);

  return ContainerScreen;
}(React.Component);

var page = React.createElement(
  "div",
  null,
  React.createElement(Navbar, null),
  React.createElement(ContainerScreen, null)
);

ReactDOM.render(page, document.getElementById("root-pref-nav"));