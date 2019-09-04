import React, { Component } from 'react';
import Data from '../Data';
//import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  constructor(){
    super();
    this.data = new Data();
  }

  render(){

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <form onSubmit={this.submit}
                onCancel={this.cancel} >
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
                <p>By Joe Smith</p>
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
                                className="" value={materialsNeeded}
                                onChange={this.change}
                                placeholder="List materials...">
                      </textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" to={`/`}>Cancel</button></div>
          </form>
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
    console.log(context.authenticatedUser.username, context.authenticatedUserPW);
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
    };

    this.data.createCourse(course, authUser, authUserPW)
      .then( errors => {
       if (errors.length) {
         this.setState({ errors });
       } /*else {
          context.actions.signIn(emailAddress, password)
          .then(() => {
            this.props.history.push('/authenticated')
          });
       }*/
     })
     .catch( err => { // handle rejected promises
       console.log(err);
       this.props.history.push('/error');
     });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}

export default CreateCourse;
