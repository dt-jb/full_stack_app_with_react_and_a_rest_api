import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
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
        <h1>Create Course</h1>
        <div>
          <Form cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Create Course"
                elements={() => (
                  <React.Fragment>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                          <div>
                            <input id="title"
                                 name="title"
                                 type="text"
                                 className="input-title course--title--input"
                                 value={title}
                                 onChange={this.change}
                                 placeholder="Course title..." />
                          </div>
                        <p>By {authUserFirstName} {authUserLastName}</p>
                      </div>
                      <div className="course--description">
                        <div><textarea id="description"
                                       name="description"
                                       className=""
                                       value={description}
                                       onChange={this.change}
                                       placeholder="Course description...">
                             </textarea>
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
                                     value={estimatedTime}
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
                                        value={materialsNeeded}
                                        onChange={this.change}
                                        placeholder="List materials...">
                              </textarea>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
              </React.Fragment>
            )} />
        </div>
      </div>
    );
  }

//change handler for state updates
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

//submit handler- makes the POST /courses call and handles the response
  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser.username;
    const authUserPW = context.authenticatedUser.password;
    const userId = context.authenticatedUser.id;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data.createCourse(course, authUser, authUserPW)
      .then( errors => {
         if (errors.length) {
           this.setState({ errors });
         } else {
              this.props.history.push('/');
         }
       })
      .catch( err => { // handle rejected promises
          this.props.history.push('/error');
     });
  }

//cancel functionality returns to homepage
  cancel = () => {
    this.props.history.push('/');
  }
}

export default CreateCourse;
