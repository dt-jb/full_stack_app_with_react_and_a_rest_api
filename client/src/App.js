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
import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';
import UpdateCourse from './Components/UpdateCourse';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
//change^^ to const CourseDetailWithContext = withContext(CourseDetail);

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
          </Switch>


        </div>
      </Router>
    );
  }
}

export default App;
