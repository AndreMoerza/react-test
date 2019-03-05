import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link, matchPath  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {contacts: []};
    }
    getMatchParams = props => {
      const { location, path, exact, strict } = props || this.props;
      const match = matchPath(location.pathname, {
        path,
        exact,
        strict
      });
      if (match) {
        console.log(match.params);
        return match.params;
      }
      return {};
    };
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
    componentDidUpdate(prevProps, prevState) {
      //const { updateParams, match } = this.props;
      const currentParams = this.getMatchParams();
      const prevParams = this.getMatchParams(prevProps);
      if (currentParams !== prevParams) {
        this.loadData();
      }
      
    }
    tabRow(){
      return this.state.contacts.map((contact, i) => {
          return <TableRow contact={contact} key={i}/>;
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