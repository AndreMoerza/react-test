import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid';

class TableRow extends Component {

  delete(id) {
    if (window.confirm('Are you sure you wish to delete this item ?')) {
      axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
      .then(response => {
          console.log(response);
          this.props.deleteRow(id);
      })
      .catch(error => {
          console.log(error);
      });

      //this.props.deleteRow(id);
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
            <button type="submit" onClick={() => this.delete(this.props.contact.id)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;