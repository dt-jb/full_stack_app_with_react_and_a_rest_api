import React, { Component } from 'react';
//import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
//import logo from './logo.svg';
//import config from './config';
import './styles/global.css';
import Header from './Components/Header';
import Courses from './Components/Courses';
//import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            {/*<Route path="/courses/create" component={CreateCourse} />*/}
            <Route path="/courses/:id/update" component={CourseDetail} />
          </Switch>

          <Courses />
        </div>
      </Router>
    );
  }
}

export default App;
