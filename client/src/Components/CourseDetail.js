import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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
      .catch(error => {
        this.props.history.push('/notfound');
        console.log('Error fetching data', error)
      });
  }

  render(){

    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    } = this.state;

    const { context } = this.props;
    const authUserId = context.authenticatedUserId;
    //console.log(`${this.state.title, this.state.description} these are not undef`);
    const errors = [];

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              { (authUserId  && context.authenticatedUserId === this.state.userId) ? (
                <span>
                  <Link className="button" to={`/courses/${id}/update`} props={this.state}>Update Course</Link>
                  <button className="button" onClick={this.delete}>Delete Course</button>
                </span>
              ) : ("")}
              <Link className="button button-secondary" to={`/`}>Return to List</Link>
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
              <ReactMarkdown source={description} />
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
                      <ReactMarkdown source={materialsNeeded}/>
                    </ul>
                  {/*
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
                  </ul>*/}
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
}

export default CourseDetail;
