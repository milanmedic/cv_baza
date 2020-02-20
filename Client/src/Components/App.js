import React, { Component } from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import SignUp from './SignUp_Components/SignUp'
import LogIn from './SignUp_Components/LogIn'
import AdminDashboard from './Admin_Components/AdminDashboard'
import CompanyDashboard from './Company_Components/CompanyDashboard'
import StudentDashboard from './Student_Components/StudentDashboard'
import { createBrowserHistory } from 'history';
import jwtDecode from 'jwt-decode';

const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).hasOwnProperty('company')
      ? <Component />
      : <Redirect to='/login' />
  )} />
);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Route path = '/' exact component = {SignUp} />
          <Route path = '/login' exact component = {LogIn} />
          <Route path = '/admin_dashboard' component = {AdminDashboard} />
          <PrivateRoute path='/company_dashboard' component={CompanyDashboard} />
          <Route path = '/student_dashboard' exact component = {StudentDashboard} />
        </div>
        </Router>
    );
  }
}

export default App;
