import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/fontawesome-free-solid';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstname: '',
      lastname: '',
      age: '',
      photo: ''
    }
  }
  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    })  
  }
  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    })
  }
  
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      age: this.state.age,
      photo: this.state.photo || "N/A"
    };
    axios.post('https://simple-contact-crud.herokuapp.com/contact', obj)
        .then(res => this.props.history.push('/', res.data));
    
    this.setState({
      firstname: '',
      lastname: '',
      age: '',
      photo: ''
    });

  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add New Contact</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>First Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.firstname}
                      onChange={this.onChangeFirstName}
                      required
                      />
                </div>
                <div className="form-group">
                    <label>Last Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.lastname}
                      onChange={this.onChangeLastName}
                      required
                      />
                </div>
                <div className="form-group">
                    <label>Age: </label>
                    <input type="number" 
                      className="form-control"
                      value={this.state.age}
                      onChange={this.onChangeAge}
                      pattern="[0-9]*"
                      min="1" max="99"
                      required
                      />
                </div>
                <div className="form-group">
                    <label>Photo: </label>
                    <input type="file" 
                      className="form-control"
                      value={this.state.photo}
                      onChange={this.onChangePhoto}
                      required
                      />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faSave} /> Save</button>
                </div>
            </form>
        </div>
    )
  }
}