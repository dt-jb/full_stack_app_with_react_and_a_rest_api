import React, { Component } from 'react';
import axios from 'axios';
//import logo from './logo.svg';
//import config from './config';
import './App.css';
import CourseList from './Components/CourseList';

class App extends Component {
  constructor(){
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount(){
    this.performSearch();
  }

  //data fetching
  performSearch = () => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => {
        this.setState({
          courses: response.data
        });
      })
      .catch(error => console.log('Error fetching data', error));
  }
//}

  render() {
    return (
      <div className="App">
        <CourseList data={this.state.courses}/>
      </div>
    );
  }
}

export default App;
/*  api(path, method, body = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    return fetch(url, options);
  }*/
