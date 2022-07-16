import Navbar from "./Navbar.js";
import CardsConfigure from "./card.js";
import { movies } from "../more-movies.js"


const movieList = movies.items;
if (!window.sessionStorage.getItem("movies")) {
  window.sessionStorage.setItem("movies", JSON.stringify(movieList));
}




const page = (<div>
  <Navbar />
  {/* {rowDiv} */}
  <CardsConfigure movies={JSON.parse(window.sessionStorage.getItem("movies"))} />
</div>)
ReactDOM.render(page, document.getElementById("root"));
