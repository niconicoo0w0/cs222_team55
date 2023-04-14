import {Link} from "react-router-dom"

const Mainheader = function () {
    return (
      <div className="header">
        <div className="headerContainer">
          <div className="headerText" id="library">
            LIBRARY
          </div>
        </div>
        <div className="headerContainer">
          <span className="headerText" id="login">
            <Link to="/LOGIN" className = "header-link">LOGIN</Link>
          </span>
        </div>
      </div>
    )
  }

  export default Mainheader;