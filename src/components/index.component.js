import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

export default class Index extends Component {

    constructor(props) {
      super(props);
      this.state = {contacts: []};
    }
    loadData() {
      axios.get('https://simple-contact-crud.herokuapp.com/contact')
        .then(response => {
          this.setState({ contacts: response.data.data });
        })
        .catch((error) => {
          console.log(error);
        })
    }
    componentDidMount(){
      this.loadData();
    }
    deleteRow(id) {
      const newRows = this.state.contacts.filter((row)=>row.id!==id);
      //console.log(newRows);
      this.setState({contacts: newRows});
    } 
    tabRow(){
      return this.state.contacts.map((contact, i) => {
          return <TableRow contact={contact} key={i} deleteRow={(id) => this.deleteRow(id)}/>;
      });
    }

    render() {
      return (
        <div>
          <Link to={"create"} className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></Link>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>Photo</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }