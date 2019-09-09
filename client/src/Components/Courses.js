import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Course from './Course';

class Courses extends Component {
  constructor(){
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount(){
    this.getCourses();
  }

  //data fetching
  getCourses = () => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => {
        this.setState({
          courses: response.data
        });
      })
      .catch(error => console.log('Error fetching data', error));
  }

  render(){

    const results = this.state.courses;
    //console.log(results);
    let courses;

    if(results.length > 0) {
      //courses = results.map( course =>  <Course data={course.title} key={course.id} />);
      courses = results.map( course => {
        return  <React.Fragment key={course.id}>
            <div className="grid-33">
              <Link className="course--module course--link" id={course.id} to={`/courses/${course.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>
          </React.Fragment>
      });

    } else {
      //console.log("Sorry, nothing is here dude");
    }

    return (
      <div className="bounds">
        {courses}
        <React.Fragment>
          <div className="grid-33">
            <Link className="course--module course--add--module" to="/courses/create">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course
              </h3>
            </Link>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default Courses;
