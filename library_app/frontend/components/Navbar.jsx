import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return <nav className="navbar bg-dark container">
        <h4><Link className="link" to="/">Home</Link></h4>
        <h4><Link className="link" to="/insertBooks">Insert Books</Link></h4>
        <h4><Link className="link" to="/updateBooks">Update Books</Link></h4>
        <h4><Link className="link" to="/removeBooks">Remove Books</Link></h4>
        <h4><Link className="link" to="/searchBooks">Search Books</Link></h4>
    </nav>
}
export default Navbar;