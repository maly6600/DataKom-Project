import React from 'react';
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor';
import NavDropdown from './Dropdown.js';
import { List } from '../api/lists.js';

const NavItem = props => {
	const pageURI = window.location.pathname+window.location.search
const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
const aClassName = props.disabled ? "nav-link disabled" : "nav-link"
  return (
    <li className={liClassName}>	
      <a href={props.path} className={aClassName}>{props.name}
      {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}</a>
    </li>
  );
}

export default class Navigation extends React.Component {
  submitListName(event) {
    event.preventDefault();
    console.log("this is working!");
    const newListName = ReactDOM.findDOMNode(this.refs.listNameInput).value.trim();
    console.log(newListName);
    Meteor.call('list.create', newListName);

  }
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Itemize!</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            
            <NavItem path="/" name="Home" />
            <NavItem path="/page2" name="Create new list" />
            <NavItem path="/page3" name="Disabled" disabled="true" />
            
           <NavDropdown name="My lists">
  <a className="dropdown-item" href="/">Christmas Dinner</a>
  <a className="dropdown-item" href="/">Mum's birthday</a>
  <div className="dropdown-divider"></div>
  <a className="dropdown-item" href="/">Weekly shopping</a>
</NavDropdown>
            
          </ul>
          <form className="form-inline my-2 my-lg-0" onSubmit={this.submitListName.bind(this)}>
            <input className="form-control mr-sm-2" type="text" ref="listNameInput" placeholder="Type name of new list" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Create new list</button>
          </form>
        </div>
</nav>
		)
	}
}