import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import InsertBook from './components/InsertBook';
import RemoveBooks from './components/RemoveBook';
import SearchBooks from './components/SearchBook';
import UpdateBooks from './components/UpdateBook';

function App() {
  return (
    <Router>
      <Navbar />

      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/insertBooks">
        <InsertBook />
      </Route>

      <Route path="/removeBooks">
        <RemoveBooks />
      </Route>

      <Route path="/searchBooks">
        <SearchBooks />
      </Route>

      <Route path="/updateBooks">
        <UpdateBooks />
      </Route>

    </Router>
  )
}

export default App;