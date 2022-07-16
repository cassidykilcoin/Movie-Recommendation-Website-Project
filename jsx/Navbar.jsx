export default class Navbar extends React.Component {

  render() {
    const pages = ["movies.html", "watchlist.html", "preferences.html"];
    console.log(window.location.pathname);

    // const navLink = pages.map(page => <Navitem href="page" name="" />)

    return (
      <nav class="navbar navbar-dark bg-dark navbar-expand-sm">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
          <img src="images/logo1-white.png" alt="logo" width="50" height="50" />
        </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <Navitem href="index.html" name="Recommendations" />
            <Navitem href="watchlist.html" name="Watchlist" />
            <Navitem href="preferences.html" name="Preferences" />
          </ul>
        </div>
      </nav>
    )
  }
}

class Navitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: window.location.pathname === "/" + props.href 
                    || (window.location.pathname === "/" && props.href=="index.html") };
  }

  render() {
    return (
      <li class="nav-item">
        <a class={"h5 nav-link" + (this.state.active ? " active" : "")} href={this.props.href}>
          {this.props.name}
        </a>
      </li>
    )
  }
}