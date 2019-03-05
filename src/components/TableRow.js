import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
      if (window.confirm('Are you sure you wish to delete this item?')) {
        axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${this.props.contact.id}`)
            .then(res => console.log('DELETED'))
            .catch(err => { 
              alert(err);
            })
      } 
    }
  render() {
    return (
        <tr>
          <td>
            {`${this.props.contact.firstName} ${this.props.contact.lastName}`} 
          </td>
          <td>
            {this.props.contact.age}
          </td>
          <td>
            {this.props.contact.photo}
          </td>
          <td>
            <Link to={"/edit/"+this.props.contact.id} className="btn btn-primary"><FontAwesomeIcon icon={faEdit} /></Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;