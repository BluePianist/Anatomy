import React , { Component }from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Welcome from './components/Pages/Welcome.component'
import Dashboard from './components/Pages/dashboard.component';
import Forms from './components/Pages/forms.component';

// modif
class App extends Component {

  render(){
 
    return(
      <div>
        <Switch>
        <Route exact path='/' component={Welcome}></Route>
        <Route exact path='/dashboard' component={Dashboard}></Route>
        <Route exact path='/forms' component={Forms}></Route>
        </Switch>
      </div>

  );
  }
}
export default App;