var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: "render",
    value: function render() {
      var pages = ["movies.html", "watchlist.html", "preferences.html"];
      console.log(window.location.pathname);

      // const navLink = pages.map(page => <Navitem href="page" name="" />)

      return React.createElement(
        "nav",
        { "class": "navbar navbar-dark bg-dark navbar-expand-sm" },
        React.createElement(
          "button",
          { "class": "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
          React.createElement("span", { "class": "navbar-toggler-icon" })
        ),
        React.createElement(
          "a",
          { "class": "navbar-brand", href: "#" },
          React.createElement("img", { src: "images/logo1-white.png", alt: "logo", width: "50", height: "50" })
        ),
        React.createElement(
          "div",
          { "class": "collapse navbar-collapse", id: "navbarSupportedContent" },
          React.createElement(
            "ul",
            { "class": "navbar-nav" },
            React.createElement(Navitem, { href: "index.html", name: "Recommendations" }),
            React.createElement(Navitem, { href: "watchlist.html", name: "Watchlist" }),
            React.createElement(Navitem, { href: "preferences.html", name: "Preferences" })
          )
        )
      );
    }
  }]);

  return Navbar;
}(React.Component);

export default Navbar;

var Navitem = function (_React$Component2) {
  _inherits(Navitem, _React$Component2);

  function Navitem(props) {
    _classCallCheck(this, Navitem);

    var _this2 = _possibleConstructorReturn(this, (Navitem.__proto__ || Object.getPrototypeOf(Navitem)).call(this, props));

    _this2.state = { active: window.location.pathname === "/" + props.href || window.location.pathname === "/" && props.href == "index.html" };
    return _this2;
  }

  _createClass(Navitem, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "li",
        { "class": "nav-item" },
        React.createElement(
          "a",
          { "class": "h5 nav-link" + (this.state.active ? " active" : ""), href: this.props.href },
          this.props.name
        )
      );
    }
  }]);

  return Navitem;
}(React.Component);