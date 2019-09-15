//import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = 'http://localhost:5000/api' + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

// Get current user
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

// Creates or adds a new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        const errors = [];
        data.errors.map((error) => errors.push(error.message));
        return errors;
      });
    }
    else {
      throw new Error();
    }
  }

// Creates a new course
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, { username, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        const errors = [];
        data.errors.map((error) => errors.push(error.message));
        return errors;
      });
    }
    else if (response.status === 401) {
      return response.json().then(data => {
        const errors = [];
        data.errors.map((error) => errors.push(error.message));
        return errors;
      });
    }
    else {
      throw new Error();
    }
  }

// Updates course
  async updateCourse(course, id, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { username, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        const errors = [];
        data.errors.map((error) => errors.push(error.message));
        return errors;
      });
    }
    else {
      throw new Error();
    }
  }

// Delete course
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { username, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        /*const errors = [];
        data.errors.map((error) => errors.push(error.message));
        return errors;*/
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
