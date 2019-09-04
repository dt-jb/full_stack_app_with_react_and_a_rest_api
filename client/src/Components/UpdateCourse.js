import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

  constructor(){
    super();
    this.state = {
      courseDetail: {}
    };
  }

  componentDidMount(){
    this.getCourseDetail(this.props.match.params.id);
  }

  //data fetching
  getCourseDetail = async (id) => {
    await axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
          courseDetail: response.data
        });
      })
      .catch(error => console.log('Error fetching data', error));
  }

  //data posting/updatingß
  submitUpdatedCourse = (id) => {
    axios.put(`http://localhost:5000/api/courses/${id}/update`, this.state.courseDetail)
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
        /*this.setState({
          courseDetail: response.data
        });*/
      })
      .catch(error => console.log('Error fetching data', error));
  }

  render(){
    console.log(this.state.courseDetail);
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form onSubmit={this.submitUpdatedCourse}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title"
                         name="title" type="text"
                         className="input-title course--title--input"
                         placeholder="Course title..."
                         defaultValue={this.state.courseDetail.title}
                         onChange={this.change} />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" defaultValue={this.state.courseDetail.description} onChange={this.change} ></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" defaultValue={this.state.courseDetail.estimatedTime} onChange={this.change} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" defaultValue={this.state.courseDetail.materialsNeeded} onChange={this.change} ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" to={'/'}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    //console.log(name);
    const value = event.target.value;

    this.setState(() => {
      return {
        courseDetail:
          {[name]: value}
      };
    });
    console.log(this.state.courseDetail);
  }

}

export default UpdateCourse;
