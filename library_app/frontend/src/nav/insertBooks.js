import React, {useState} from 'react';
import axios from "axios";

const Books = function() {
    const [input, setInput] = useState({
      title: '',
      authors: '',
      count: '',
      publication_date: ''
  })

  function handleChange(event) {
      const {name, value} = event.target;
      setInput (prevInput => {
          return {
              ...prevInput, 
              [name]: value
          }
      })
  }

  function handleClick(event) {
      event.preventDefault();
      const newNote = {
          title: input.title,
          authors: input.authors,
          count: input.count,
          publication_date: input.publication_date
      }
      axios.post('http://localhost:3001/create', newNote);
  }

  return <div className='mainContainer'>
      <form>
          <div className='form-group'>
              <input onChange={handleChange} name="title" value={input.title} autoComplete="off" className='form-control' placeholder='Title'>

              </input>
          </div>
          <div className='form-group'>
              <input onChange={handleChange} name="authors" value={input.authors} autoComplete="off" className='form-control' placeholder='Author'>

              </input>
          </div>
          <div className='form-group'>
              <input onChange={handleChange} name="count" value={input.count} autoComplete="off" className='form-control' placeholder='Count'>

              </input>
          </div>
          <div className='form-group'>
              <input onChange={handleChange} name="publication_date" value={input.publication_date} autoComplete="off" className='form-control' placeholder='Publication Date'>

              </input>
          </div>

          <button onClick={handleClick} className="btn btn-lg btn-info">Insert</button>
      </form>
  </div>
    }

    export default Books;
