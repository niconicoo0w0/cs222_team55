import react, {useState} from "react"
import axios from "axios";
import Card from "./components/BookCards"
const Main = function () {
  const[search, setSearch] = useState("");
  const[bookData,setData] = useState([]);
  const searchBook =(evt) => {
    if (evt.key == "Enter") 
    {
      axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyAaEUqVuvBHzU2wUzoq4IIKugyAc4d6Rhw')
      .then(res=>setData(res.data.items))
      .catch(err=>console.log(err))
    }
  }
    return (
      <div className="mainContainer">
        <label className="searchBarLabel" htmlFor="header-search">
              <span className="visually-hidden">
                  <div className="setHover">B</div>
                  <div className="setHover">o</div>
                  <div className="setHover">o</div>
                  <div className="setHover">k</div>
                  <div className="setHover">s &nbsp;</div>
                  <div className="setHover">f</div>
                  <div className="setHover">o</div>
                  <div className="setHover">r &nbsp;</div>
                  <div className="setHover">E</div>
                  <div className="setHover">v</div>
                  <div className="setHover">e</div>
                  <div className="setHover">r</div>
                  <div className="setHover">y</div>
                  <div className="setHover">o</div>
                  <div className="setHover">n</div>
                  <div className="setHover">e</div>
                  <div className="setHover">!</div>
                </span>
          </label>
          <div className="row1">
          </div>
          <div className="row2">
            <div className="search">
              <div className="searchBarInput">
                <input 
                  type="text" placeholder="Enter Book Name" 
                  value={search} 
                  onChange={e=>setSearch(e.target.value)}
                  onKeyPress={searchBook}
                />
              </div>
              <button className="searchBarButton" type="submit">Search</button>
            </div>
          </div>
          <div className="container">
            {
              <Card book={bookData}/>
            }
          </div>
        </div>
        
      // <div className="mainContainer">
      //   <SearchBar />
      // </div>
    )
  }

  export default Main; 
