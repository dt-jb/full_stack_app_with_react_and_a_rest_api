import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  render(){

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <input id="firstName"
                         name="firstName"
                         type="text"
                         className=""
                         value={firstName}
                         onChange={this.change}
                         placeholder="First Name" />
                  <input id="lastName"
                         name="lastName"
                         type="text"
                         className=""
                         value={lastName}
                         onChange={this.change}
                         placeholder="Last Name"/>
                  <input id="emailAddress"
                         name="emailAddress"
                         type="text"
                         className=""
                         value={emailAddress}
                         onChange={this.change}
                         placeholder="Email Address" />
                  <input id="password"
                         name="password"
                         type="password"
                         className=""
                         value={password}
                         onChange={this.change}
                         placeholder="Password" />
                  <input id="confirmPassword"
                         name="confirmPassword"
                         type="password"
                         className=""
                         value={confirmPassword}
                         onChange={this.change}
                         placeholder="Confirm Password" />
                </React.Fragment>
              )} />
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

//handles state change
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

//handles submit, POST /users api call and handles response accordingly
  submit = () => {
    const { context } = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    };

    if( password === '' ){
      this.setState({
        errors: ["Please create a password."]
      });
    } else if ( password !== confirmPassword ) {
      this.setState({
        errors: ["Password and confirm password must be the same."]
      });  
    } else {
      context.data.createUser(user)
        .then( errors => {
         if (errors.length) {
           this.setState({ errors });
         } else {
            context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/')
            });
         }
       })
       .catch( err => { // handle rejected promises
         this.props.history.push('/error');
       });
    }
  }

//handles cancel
  cancel = () => {
    this.props.history.push('/');
  }
}
