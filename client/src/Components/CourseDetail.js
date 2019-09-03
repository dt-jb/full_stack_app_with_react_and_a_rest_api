import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import UpdateCourse from './UpdateCourse';

/*const CourseDetail = props => {
  const results = props.data;
  console.log(results);
  let courses;

  if(results.length > 0){
    courses = results.map( course => <Course data={course.title} key={course.id} />);
    //courses = results.map( course => <li>{course.title} key={course.id}</li>);

  } else {
    console.log('Sorry, nothing is here dude');
  }*/

class CourseDetail extends Component {

  constructor(){
    super();
    this.state = {
      courseDetail: {}
    };
  }

  componentDidMount(){
    this.getCourseDetail(this.props.match.params.id);
  }

  //data fetching
  getCourseDetail = (id) => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
          courseDetail: response.data
        });
      })
      .catch(error => console.log('Error fetching data', error));
  }

  render(){
    console.log(this.state.courseDetail);
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span>
              {/*<Link className="button"
                    to={`/courses/${this.state.courseDetail.id}/update`}>Update Course</Link>*/}
              <Link className="button"
                          to={`/courses/${this.state.courseDetail.id}/update`}
                          props={this.state.courseDetail}>Update Course</Link>
              <Link className="button"
                    to="#">Delete Course</Link></span>
              <Link className="button button-secondary"
                    to={`/`}>Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.courseDetail.title}</h3>
              <p>By User #{`${this.state.courseDetail.userId}`}</p>
            </div>
            <div className="course--description">
              <p>{this.state.courseDetail.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.courseDetail.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>1/2 x 3/4 inch parting strip</li>
                    <li>1 x 2 common pine</li>
                    <li>1 x 4 common pine</li>
                    <li>1 x 10 common pine</li>
                    <li>1/4 inch thick lauan plywood</li>
                    <li>Finishing Nails</li>
                    <li>Sandpaper</li>
                    <li>Wood Glue</li>
                    <li>Wood Filler</li>
                    <li>Minwax Oil Based Polyurethane</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;
