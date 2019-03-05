import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faBackward } from '@fortawesome/fontawesome-free-solid';

export default class Edit extends Component {
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

  componentDidMount() {
      axios.get(`https://simple-contact-crud.herokuapp.com/contact/${this.props.match.params.id}`)
          .then(response => {
              this.setState({ 
                firstname: response.data.data.firstName, 
                lastname: response.data.data.lastName,
                age: response.data.data.age,
                photo: response.data.data.photo
               });
          })
          .catch((error) => {
              console.log(error);
          })
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
      photo: this.state.photo
    };
    axios.put('https://simple-contact-crud.herokuapp.com/contact/'+this.props.match.params.id, obj)
        .then(res => this.props.history.push('/', res.data));
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Contact</h3>
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
                      //value={this.state.photo}
                      onChange={this.onChangePhoto}
                      
                      />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faSave} /> Update</button>
                  <Link to={"/index"} className="btn btn-warning" style={{ marginLeft: 5}}><FontAwesomeIcon icon={faBackward} /> Cancel</Link>
                </div>
            </form>
        </div>
    )
  }
}