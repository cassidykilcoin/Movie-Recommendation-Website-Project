var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListAnimalsPerType = function (_React$Component) {
    _inherits(ListAnimalsPerType, _React$Component);

    function ListAnimalsPerType() {
        _classCallCheck(this, ListAnimalsPerType);

        return _possibleConstructorReturn(this, (ListAnimalsPerType.__proto__ || Object.getPrototypeOf(ListAnimalsPerType)).apply(this, arguments));
    }

    _createClass(ListAnimalsPerType, [{
        key: "render",
        value: function render() {
            // Goal: For each animal, make a list item that says, "The *name* goes *sound*"
            var animalListings = this.props.animals.map(function (animal) {
                return React.createElement(
                    "li",
                    null,
                    " ",
                    animal.name + " goes " + animal.sound
                );
            }); // what arrow function goes inside of here, so it returns the list item?

            var allAnimals = React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    null,
                    this.props.type
                ),
                " ",
                React.createElement(
                    "ul",
                    null,
                    animalListings
                )
            );

            return allAnimals;
        }
    }]);

    return ListAnimalsPerType;
}(React.Component);

// Goal: For each animal type, we want to list the animals


var ListAnimals = function (_React$Component2) {
    _inherits(ListAnimals, _React$Component2);

    function ListAnimals() {
        _classCallCheck(this, ListAnimals);

        return _possibleConstructorReturn(this, (ListAnimals.__proto__ || Object.getPrototypeOf(ListAnimals)).apply(this, arguments));
    }

    _createClass(ListAnimals, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var animalTypes = Object.keys(this.props.animals); // what are we collecting the keys of?
            var animalListOutput = animalTypes.map(function (k) {
                return React.createElement(ListAnimalsPerType, { type: k, animals: _this3.props.animals[k] });
            }); // what arrow function goes inside of here? (what is needed above?)
            return animalListOutput;
        }
    }]);

    return ListAnimals;
}(React.Component);

var animals = {
    "Mammals": [{ name: "cow", sound: "moo" }, { name: "cat", sound: "meow" }, { name: "dog", sound: "woof" }],
    "Reptiles": [{ name: "snake", sound: "hiss" }, { name: "frog", sound: "ribbit" }]
};

var element = React.createElement(ListAnimals, { animals: animals });
ReactDOM.render(element, document.getElementById("root"));