import Navbar from "./Navbar.js";

/* 
pref-cards need to update the session storage whenever they're moved
    Specifically, when a pref-card is dropped into the likes basket into the dislikes basket, the session
    storage should remove the prefID of the card from the likes list and then put the prefID of the card
    into it's dislikes list. This should happen whenever a pref-card is moved between the tagMenu, the Likes basket,
    and the dislikes basked.
 */


// This is the list of tags that movies can have
const prefCardsToInit = ["Western", "RatedX", "Romance", "Action", "Drama", "Crime", "Adventure", "Biography", "Music", "Horror", "Sci-Fi", "Thriller",
  "Mystery", "History", "Animation", "War", "Family", "Fantasy"];
if (!window.sessionStorage.getItem("TagMenu")) {
  window.sessionStorage.setItem("TagMenu", JSON.stringify(prefCardsToInit));
}
const likesToInit = ["Comedy"];
if (!window.sessionStorage.getItem("Likes")) {
  window.sessionStorage.setItem("Likes", JSON.stringify(likesToInit));
}
const dislikesToInit = ["Tragedy"];
if (!window.sessionStorage.getItem("Dislikes")) {
  window.sessionStorage.setItem("Dislikes", JSON.stringify(dislikesToInit));
}


class PrefCard extends React.Component {

  handleDrag = (e) => {
    //console.log("drag");
    e.dataTransfer.setData("text", this.props.prefID);
    //console.log(e.dataTransfer.getData("text")); // this shows that the data is correct.
  }

  clickFunction() {
    this.props.moveTag(this.props.location, "TagMenu", this.props.prefID);
  }

  render() {
    return (
      <div
        onDragStart={this.handleDrag}>
        <div className="col">
          <div className="card" draggable={true}>
            <div className="card-body text-right">
              <div className="card-text text-center">
                <h4>{this.props.prefID}
                </h4>
              </div>
              {this.props.location == "tagMenu" ? "" : (<div className="btn btn-primary me-1" onClick={() => this.clickFunction()}>
                X
              </div>)
              }
            </div>
          </div>
        </div>
      </div>)
  }
}

class CardList extends React.Component {

  render() {
    return (
      <div className="row">
        {this.props.cards.map((card) => {
          return (
            <div className="col-lg-4 col-sm-6 col-12">
              <PrefCard prefID={card} location={this.props.location} moveTag={this.props.moveTag} />
            </div>
          )
        })}
      </div>
    );

  }
}



class TagMenu extends React.Component {

  updateCardList() {
    this.setState({ cardsInMenu: (JSON.parse(window.sessionStorage.getItem("TagMenu"))) });
  }

  render() {
    //console.log(this.props.cardsInMenu);
    let tagMenuDiv = (
      <div>
        <div className="card-body">
          <div className="accordion">
            <div className="accordion-item">
              <div className="card">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button className="accordion-button btn btn-primary me-1 collapsed" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseOne">
                    Preferences
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingOne">
                  <div className="accordion-body">
                    <div className="card"><CardList cards={this.props.tags} location="tagMenu" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return tagMenuDiv
  }
}

class LikeBasket extends React.Component {

  handleDrop = e => {
    let prefID = e.dataTransfer.getData("text");
    let tagMenu = (JSON.parse(window.sessionStorage.getItem("TagMenu")));
    let dislikes = (JSON.parse(window.sessionStorage.getItem("Dislikes")));
    //console.log(prefID);
    e.preventDefault();
    e.stopPropagation();

    tagMenu = tagMenu.filter(e => e == (prefID));
    dislikes = dislikes.filter(e => e == (prefID));
    //console.log(tagMenu);
    // This fails if there is no string in tagMenu
    if (tagMenu) {
      // console.log(tagMenu);
      this.props.moveTag("TagMenu", "Likes", prefID);
    }
    if (dislikes) {
      // console.log(dislikes);
      this.props.moveTag("Dislikes", "Likes", prefID);
    }

    //console.log("Dropped:");
    //console.log(e.dataTransfer.getData("text"));
  };

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    //console.log("Over");
  };

  render() {
    console.log("pref", this.props.tags)

    let baskCase = (
      <div className="text-center">
        <div className="card" onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
          <div className="card-body">
            <div className="card-title">
              <h1>
                Likes
              </h1>
            </div>
            <div className="card">
              <CardList cards={this.props.tags} location="Likes" moveTag={this.props.moveTag} />
            </div>
          </div>
        </div>
      </div>
    );
    return baskCase;
  }
}

class DislikeBasket extends React.Component {

  handleDrop = e => {
    let prefID = e.dataTransfer.getData("text");
    let tagMenu = (JSON.parse(window.sessionStorage.getItem("TagMenu")));
    let likes = (JSON.parse(window.sessionStorage.getItem("Likes")));
    e.preventDefault();
    e.stopPropagation();

    tagMenu = tagMenu.filter(e => e == (prefID));
    likes = likes.filter(e => e == (prefID));
    //console.log(tagMenu);
    // This fails if there is no string in tagMenu
    if (tagMenu) {
      //console.log(tagMenu);
      this.props.moveTag("TagMenu", "Dislikes", prefID);
    }
    if (likes) {
      //console.log(dislikes);
      this.props.moveTag("Likes", "Dislikes", prefID);
    }

    //console.log("Dropped:");
    //console.log(e.dataTransfer.getData("text"));
  };

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    //console.log("Over");
  };

  render() {
    console.log("pref", this.props.tags)

    let baskCase = (
      <div className="text-center">
        <div className="card" onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
          <div className="card-body">
            <div className="card-title">
              <h1>
                Dislikes
              </h1>
            </div>
            <div className="card">
              <CardList cards={this.props.tags} location="Dislikes" moveTag={this.props.moveTag} />
            </div>
          </div>
        </div>
      </div>
    );
    return baskCase;
  }
}

class ContainerScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: JSON.parse(window.sessionStorage.getItem("Likes")),
      dislikes: JSON.parse(window.sessionStorage.getItem("Dislikes")),
      tagMenu: JSON.parse(window.sessionStorage.getItem("TagMenu"))
    };
  }

  updateStateVariable(location, value) {
    // console.log("loc", location);
    if (location == "Likes") {
      this.setState({ likes: value });
    }
    else if (location == "Dislikes") {
      this.setState({ dislikes: value });
    }
    else {
      this.setState({ tagMenu: value });
    }
  }

  //moveTag("TagMenu", "Likes", "western"); //USAGE
  moveTag(start, destination, prefID) {
    //console.log(window.sessionStorage.getItem(start));
    let startArr = JSON.parse(window.sessionStorage.getItem(start));
    let endArr = JSON.parse(window.sessionStorage.getItem(destination));

    startArr = startArr.filter(e => e !== (prefID));
    //console.log(endArr);
    //console.log("endArr after pushing:");
    endArr.push(prefID);
    //console.log(endArr);
    startArr = [...new Set(startArr)]
    endArr = [...new Set(endArr)];
    console.log("move", endArr, startArr)
    window.sessionStorage.setItem(start, JSON.stringify(startArr));
    window.sessionStorage.setItem(destination, JSON.stringify(endArr));
    this.updateStateVariable(start, startArr)
    this.updateStateVariable(destination, endArr)
  }

  render() {
    console.log("likes", this.state.likes)
    let containDiv = (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            <TagMenu tags={this.state.tagMenu} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <LikeBasket tags={this.state.likes} moveTag={this.moveTag.bind(this)} />
          </div>
          <div className="col-6">
            <DislikeBasket tags={this.state.dislikes} moveTag={this.moveTag.bind(this)} />
          </div>
        </div>
      </div>
    );
    return containDiv;
  }
}

const page = (
  <div>
    <Navbar />
    <ContainerScreen />
  </div>
)

ReactDOM.render(page, document.getElementById("root-pref-nav"));
