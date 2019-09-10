import React, { Component } from 'react';
import Form from './Form';
//import { Link } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

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
        console.log(response.data.userId);
      })
      .catch(error => {
        this.props.history.push('/notfound');
        console.log('Error fetching data', error)
      });
  }

  render(){

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const errors = [];

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                  <React.Fragment>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                          <input id="title"
                                 name="title" type="text"
                                 className="input-title course--title--input"
                                 defaultValue={title}
                                 onChange={this.change}
                                 placeholder="Course title..." />
                        </div>
                        <p>By Joe Smith</p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea id="description"
                                    name="description"
                                    type="text"
                                    className=""
                                    placeholder="Course description..."
                                    defaultValue={description}
                                    onChange={this.change}></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="grid-25 grid-right">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        className="course--time--input"
                                        defaultValue={this.state.estimatedTime}
                                        onChange={this.change}
                                        placeholder="Hours" />
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea id="materialsNeeded"
                                        name="materialsNeeded"
                                        className=""
                                        defaultValue={this.state.materialsNeeded}
                                        onChange={this.change} ></textarea>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </React.Fragment>
              )}/>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
          [name]: value
      };
    });
  }

  submit = () => {

    const { context } = this.props;
    const authUser = context.authenticatedUser.username;
    const authUserPW = context.authenticatedUserPW;
    //const userId = context.authenticatedUserId;
    const authUserId = context.authenticatedUserId;
    //const { context } = this.props;
    //const authUserId = context.authenticatedUserId;
    const { userId } = this.state;
    if(authUserId !== userId){
      console.log(`authUserId: ${authUserId}, userId: ${userId}`);
      this.props.history.push('/forbidden');
    }

    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const updatedCourse = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data.updateCourse(updatedCourse, id, authUser, authUserPW)
      .then( errors => {
         if (errors.length) {
           this.setState({ errors });
         } else {
              this.props.history.push(`/courses/${id}`);
         }
       })
      .catch( err => { // handle rejected promises
          this.props.history.push('/error');
     });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}

export default UpdateCourse;
