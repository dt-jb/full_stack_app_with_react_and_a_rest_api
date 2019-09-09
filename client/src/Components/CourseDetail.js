import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CourseDetail extends Component {

  state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    errors: [],
  };

  componentDidMount(){
    this.getCourseDetail(this.props.match.params.id);
  }

  //data fetching
  getCourseDetail = async (id) => {
    await axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          estimatedTime: response.data.estimatedTime,
          materialsNeeded: response.data.materialsNeeded,
          userId: response.data.userId,
        });
        console.log(this.state.id);
      })
      .catch(error => console.log('Error fetching data', error));
  }
  /*
  constructor(){
    super();
    this.state = {
      courseDetail: {}
    };
  }

  //const courseId = this.props.match.params.id;

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

  handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/courses/${id}`)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
             this.props.history.push('/');
        }
      })
      .catch(error => console.log('Error fetching data', error));
  }
  //add context (CourseDetailwithContext) and use authenticatedUser from context below render method to handleCancel. Maybe put the handle cancel in Data.js
*/
  render(){
    //console.log(this.state.courseDetail);
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    } = this.state;
    //console.log(`${this.state.title, this.state.description} these are not undef`);
    const errors = [];

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span>
              {/*<Link className="button"
                    to={`/courses/${this.state.courseDetail.id}/update`}>Update Course</Link>*/}
              <Link className="button"
                          to={`/courses/${id}/update`}
                          props={this.state}>Update Course</Link>
              <button className="button"
                    onClick={this.delete}>Delete Course</button></span>
              <Link className="button button-secondary"
                    to={`/`}>Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By User #{`${userId}`}</p>
            </div>
            <div className="course--description">
              <p>{description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
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

  delete = () => {

    const { context } = this.props;
    const authUser = context.authenticatedUser.username;
    const authUserPW = context.authenticatedUserPW;
    const userId = context.authenticatedUserId;
    //console.log(courseId);

    const { id } = this.state;
    /*const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;
    //const courseId = this.state.id;
    console.log(id, authUser, authUserPW);
/*
    const updatedCourse = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };
    */

    context.data.deleteCourse(id, authUser, authUserPW)
      .then( errors => {
         if (errors.length) {
           this.setState({ errors });
         } else {
              //console.log('This shouldve worked- check the database!');
              this.props.history.push(`/`);
         }
       })
      .catch( err => { // handle rejected promises
          //console.log(err);
          this.props.history.push('/error');
     });
  }
  /*
  cancel = () => {
    this.props.history.push('/');
  }*/
}

export default CourseDetail;
