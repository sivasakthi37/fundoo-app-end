/***************************************************************************** 
* 
*  Purpose         : create fundoo application....
* 
*  @description    
* 
*  @file           : app.js
*  @overview       : create fundoo application.....
*  @author         : sivasakthi
*  @version        : 1.0
*  @since          : 23-02-2019
*
******************************************************************************/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import Register from './screens/register';
import Login from './screens/login';
import forgetpassword from './screens/forgetpassword';
import resetpassword from './screens/resetpassword';
import dashboard from './screens/dashboardinput';

/*This will rename our component to Component so that we can use it to render because React 
requires components to be capitalized otherwise it will treat it as a normal HTML element.*/
export const PrivateRoute = ({ component: Component, ...rest }) => (
  /**
  * We need to use a render prop here because now that we have matched a route we need to do some logic 
  * to determine whether or not we should render the component that was passed in or redirect the user to
  * another location.
  */
  <Route {...rest} render={props => (
    localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
        //If user isn't logged in then we can redirect to a login page.
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)
/**
 * @description:this is our route component from here our our data flow is starts
 * 
 */
class App extends Component {
  render() {
  
    return (
      <div className="body">
        {/*Through the BrowserRouter function we give the path for the component   */}
        <Router>
          <div>
            <Route path='/register' component={Register} />
            <Route path='/' exact component={Login} />
            <Route path='/login' exact component={Login} />
            <Route path='/forgetpassword' component={forgetpassword} />
            <Route path='/resetpassword' component={resetpassword} />
            <PrivateRoute path='/dashboard' component={dashboard} />
            {/* <Route path="/dashboard" component={dashboard} /> */}
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
