import React from 'react';
//import Course from './Course';

const UserSignIn = props => {
  const results = props.data;
  console.log(results);
  let courses;

  if(results.length > 0){
    courses = results.map( course => <Course data={course.title} key={course.id} />);
    //courses = results.map( course => <li>{course.title} key={course.id}</li>);

  } else {
    console.log('Sorry, nothing is here dude');
  }

  return (
    <div class="bounds">
      <div class="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form>
            <div><input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" value=""></div>
            <div><input id="password" name="password" type="password" class="" placeholder="Password" value=""></div>
            <div class="grid-100 pad-bottom"><button class="button" type="submit">Sign In</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
      </div>
    </div>
  );
}

export default UserSignIn;
