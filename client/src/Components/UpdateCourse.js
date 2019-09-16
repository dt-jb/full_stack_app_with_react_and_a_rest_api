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

  //data fetching - gets course information and sets the state accordingly
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
        const { context } = this.props;
        const authUserId = context.authenticatedUser.id;
        if(this.state.userId !== authUserId){
          //throw Error;
          this.props.history.push('/forbidden');
        }
      })
      .catch(error => {
        //const { context } = this.props;
        //const authUserId = context.authenticatedUser.id;
        if(error.response){
          if(error.response.status === 404){
            this.props.history.push('/notfound');
          } /*else if (this.state.userId !== authUserId){
            console.log(error.response);
            this.props.history.push('/forbidden');
          } */else {
            console.log(error.response);
            this.props.history.push('/error');
          }
        }
        else {
          console.log(error.response);
          this.props.history.push('/error');
        }
        /*if(this.state.userId !== authUserId){
          this.props.history.push('/forbidden');
        } else {
          this.props.history.push('/notfound');
        }*/
      });
  }

  render(){

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const { context } = this.props;
    const authUserFirstName = context.authenticatedUser.firstName;
    const authUserLastName = context.authenticatedUser.lastName;

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
                                 value={title}
                                 onChange={this.change}
                                 placeholder="Course title..." />
                        </div>
                        <p>By {authUserFirstName} {authUserLastName}</p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea id="description"
                                    name="description"
                                    type="text"
                                    className=""
                                    placeholder={description}
                                    onChange={this.change}
                                    value={description}></textarea>
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
                                        defaultValue={estimatedTime}
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
                                        onChange={this.change}
                                        placeholder={materialsNeeded}
                                        value={materialsNeeded} ></textarea>
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

//handles any changes to state
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
          [name]: value
      };
    });
  }

//handles submit, makes the PUT /courses/:id api call and handles the response/errors
  submit = (event) => {
    const { context } = this.props;
    const authUser = context.authenticatedUser.username;
    const authUserPW = context.authenticatedUser.password;
    const authUserId = context.authenticatedUser.id;

    const { userId } = this.state;

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

    if(title === '' || description === ''){
      this.setState({
        errors: ["Title and description are required."]
      });
    } else {
      context.data.updateCourse(updatedCourse, id, authUser, authUserPW)
        .then( errors => {
           if (errors.length) {
             this.setState({ errors });
           }
           else {
              this.props.history.push(`/courses/${id}`);
           }
         })
        .catch( err => { // handle rejected promises
          if(err.response){
            if(err.response === 404){
              this.props.history.push('/notfound');
            } else if(authUserId !== userId){
              this.props.history.push('/forbidden');
            }
            else {
              this.props.history.push('/error');
            }
          }
          /*if(authUserId !== userId){
            this.props.history.push('/forbidden');
          }
          else {
            this.props.history.push('/error');
          }*/
       });
   }
  }

//handles cancel
  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  }
}

export default UpdateCourse;
