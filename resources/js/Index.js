import React from 'react';
import Profile from "./components/Profile";
import Home from "./components/Home";
import Login from "./components/Login";
import Note from "./components/Note";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch } from "react-router-dom";
import Logout from "./components/Logout";
import E404 from "./components/E404";
export default class Index extends React.Component {
    render() {
        return(
            <div className="">
                <Router>
                    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">A</span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                {localStorage.getItem('user')===null ?
                                    (<li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>)
                                    : (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href={''} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {localStorage.getItem('user')}
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <Link className="dropdown-item" to="/user">{localStorage.getItem('user')}</Link>
                                                <Link className="dropdown-item" to="/logout">Logout</Link>
                                            </div>
                                        </li>
                                    )}

                            </ul>
                        </div>
                    </nav>
                    <div className={'container'} style={{marginTop: '5%'}}>
                        <Switch>
                            <Route  path="/" exact component={Home} />
                            <Route  path="/user" exact component={Profile} />
                            <Route  path="/login" exact component={Login} />
                            <Route  path="/logout" exact component={Logout}  />
                            <Route  path="/note/:id/edit" exact component={Note}  />
                            <Route  path="/*" exact component={E404} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
if (document.getElementById('fa')) {
    // ReactDOM.render(<Route><Index /></Route>, document.getElementById('fa'));
    ReactDOM.render(<Index />, document.getElementById('fa'));
}
