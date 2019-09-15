import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './styles/global.css';
import Header from './Components/Header';
import Courses from './Components/Courses';
import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';
import UpdateCourse from './Components/UpdateCourse';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import Error from './Components/Error';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

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
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/error" component={Error} />
            <Route path="/forbidden" component={Forbidden} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
