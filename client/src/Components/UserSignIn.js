import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign In"
              elements={() => (
                <React.Fragment>
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
                </React.Fragment>
              )} />
              <p>Don't have a user account?
                <Link to={`/signup`}>Click here</Link> to sign up!
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

//handles submit functionality
  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user !== null) {
          this.props.history.push(from);
        } else {
          //this.setState({errors});
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        }
      })
      .catch( err => {
        if(err.response.status === 400){
          return err.response.data.message;
        } else if(err.response.status === 401) {
          return err.response.data.message;
        } else {
          this.props.history.push('/error');
        }
      });
  }

//handles cancel
  cancel = () => {
    this.props.history.push('/');
  }
}
