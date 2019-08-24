import React from 'react';
//import Course from './Course';

const CreateCourse = props => {
  /*
  const results = props.data;
  console.log(results);
  let courses;

  if(results.length > 0){
    courses = results.map( course => <Course data={course.title} key={course.id} />);
    //courses = results.map( course => <li>{course.title} key={course.id}</li>);

  } else {
    console.log('Sorry, nothing is here dude');
  }
*/
  return (
    <div class="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        <div>
          <h2 class="validation--errors--label">Validation errors</h2>
          <div class="validation-errors">
            <ul>
              <li>Please provide a value for "Title"</li>
              <li>Please provide a value for "Description"</li>
            </ul>
          </div>
        </div>
        <form>
          <div class="grid-66">
            <div class="course--header">
              <h4 class="course--label">Course</h4>
              <div><input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..."
                  value=""></div>
              <p>By Joe Smith</p>
            </div>
            <div class="course--description">
              <div><textarea id="description" name="description" class="" placeholder="Course description..."></textarea></div>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div><input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input"
                      placeholder="Hours" value=""></div>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div><textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder="List materials..."></textarea></div>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid-100 pad-bottom"><button class="button" type="submit">Create Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
