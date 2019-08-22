import React from 'react';
import Course from './Course';

const CourseList = props => {
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
    <div >
      <h2>Courses</h2>
      <ul>
        {courses}
      </ul>
    </div>
  );
}

export default CourseList;
