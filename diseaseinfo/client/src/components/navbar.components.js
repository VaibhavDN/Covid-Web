import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../CSS/nav.css'

export default class Navbar extends Component{
    render(){
        return (
            <div className="scrollmenu">
                <Link to="/" className="navbar-brand">Home</Link>
                <Link to="/citylist" className="nav-link">State-List</Link>
                <Link to="/visualize" className="nav-link">Visualize</Link>
            </div>
        );
    }
}