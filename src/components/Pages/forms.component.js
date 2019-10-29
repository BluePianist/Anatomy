import React from 'react'
import './forms.css'
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from 'axios';
// import Navbar from './components/Navbar.component';
// import Dashboard from './components/dahboard.component';
import { createBrowserHistory } from "history";

const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

// Check if the form is valid or not
const formValid = ({FormErrors, Name, Email, Password}) => {
  let valid = true;

  Object.values(FormErrors).forEach(val => {
    val.length > 0 && (valid = false)
  });

  Object.values({Name, Email, Password}).forEach(val => {
    val === null && (valid = false)
  });

  return valid;
}

export default class form extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      Name: null,
      Email: null,
      Password: null,
      EmailLogin: null,
      PasswordLogin: null,
      NameAfterLoggedIn: null,
      FormErrors: {
        Name: "",
        Email: "",
        Password: ""
      },
      credentialsErrors: ""
    }
  }
  componentDidMount(){

    // window.onload=function(){
      const signUpButton = document.getElementById('signUp');
      const signInButton = document.getElementById('signIn');
      const container = document.getElementById('container');
    
      // Translate the panel when the button is triggered
      signUpButton.addEventListener('click', () => {
          container.classList.add('right-panel-active');
      });
      
      signInButton.addEventListener('click', () => {
          container.classList.remove('right-panel-active');
      });
    // }
  }
  handleSubmit = e => {
    e.preventDefault();
    if(formValid(this.state)){
      console.log(`
      --SUBMITTING--
      Name: ${this.state.Name}
      Email: ${this.state.Email}
      Password: ${this.state.Password}
      valid : ${formValid(this.state)}
      `);
      const user = {
        Name: this.state.Name,
        Email: this.state.Email,
        Password: this.state.Password,
      }
      Axios.post('http://localhost:5000/user_route/add', user)
        .then(res => {console.log(res.data)
          this.setState({
            NameAfterLoggedIn: res.data.Name
          })
          const history = createBrowserHistory();
            history.push({
              pathname:'/dashboard',
              search:'/',
              state: {
                NameAfterLoggedIn:this.state.NameAfterLoggedIn
              }
            });
            window.location.reload();
        })
        .catch(err => {
          // throw(err)
          console.log('Error ::' + err)
        });

        // window.location = '/dashboard/';
    } else {
      console.log('-- INVALID FORM --');
    }
  }

  handleSubmitLogin = e => {
    e.preventDefault();
    var response = null;

    const credentials = {
      Email: this.state.EmailLogin,
      Password: this.state.PasswordLogin
    }
        async function getResponse(){
          try{
            response = await Axios.post('http://localhost:5000/user_route/login/', credentials);
            // console.log('R = ' + response);
            return response;
          }catch(e){
            // throw(e)
            console.log('Error: ' + e);
            return response;
          }
        }
        response = getResponse().then(val =>{
          console.log(val.data);
          if(val.data){
            console.log("Logged in !");
            this.setState({
              credentialsErrors: 'Logged in !',
              NameAfterLoggedIn: val.data.Name
            })
            console.log(val.data);
            // console.log(this.state.NameAfterLoggedIn);
            const history = createBrowserHistory();
            history.push({
              pathname:'/dashboard',
              search:'/',
              state: {
                NameAfterLoggedIn:this.state.NameAfterLoggedIn
              }
            });
            window.location.reload();
          } else {
            console.log("Bad credentials");
            this.setState({credentialsErrors: 'Bad credentials'});
          }
        })
  }

  handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    let FormErrors = this.state.FormErrors;
    
    // eslint-disable-next-line default-case
    switch(name){
      case 'Name':
        FormErrors.Name = value.length < 3 
        ? "3 minimum characters required"
        : "";
        break;
      case 'Email':
        FormErrors.Email = emailRegex.test(value)
        ? ""
        : "invalid email adress";
        break;
      case 'Password':
        FormErrors.Password = value.length < 3 
        ? "3 minimum characters required"
        : "";
        break;
        default:
          break;
    }
    this.setState({FormErrors, [name]: value});
  }

  handleChangeLogin = e => {
    e.preventDefault();
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  render(){
    const {FormErrors} =this.state;
    const {credentialsErrors} = this.state;

    return(
      <div className="viewPort">
      <div className="Background"/>
      <div className="container" id="container">
      <div className="backgroundForm"></div>
      <div className="form-container sign-up-container">
        <form action ="#" onSubmit={this.handleSubmit} noValidate>
          <h1>Create Account</h1>
          <span>Or use your Email for registration</span>
          <div className="Name">
          <input type="text" placeholder="Name" name="Name" noValidate onChange={this.handleChange}/>
          {FormErrors.Name.length > 0 && (
            <span className="errorMessage">{FormErrors.Name}</span>
          )}
          </div>
          <div className="Email">
          <input type="email" placeholder="Email" name="Email" noValidate onChange={this.handleChange}/>
          {FormErrors.Email.length > 0 && (
            <span className="errorMessage">{FormErrors.Email}</span>
          )}
          </div>
          <div className="Password">
          <input type="password" placeholder="Password" name="Password" noValidate onChange={this.handleChange}/>
          {FormErrors.Password.length > 0 && (
            <span className="errorMessage">{FormErrors.Password}</span>
          )}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
        <div className="form-container sign-in-container">
          <form action ="#" onSubmit={this.handleSubmitLogin} noValidate>
            <h1>Sign In</h1>
            <span>Or use your Account</span>
            <div className="signInEmail">
              {credentialsErrors.length > 0 && (
                <span className = "errorMessage">{credentialsErrors}</span>
              )} 
              <input type="email" placeholder="Email" name="EmailLogin" noValidate onChange={this.handleChangeLogin}/>
            </div>
            <div className="signInPassword">
              <input type="password" placeholder="Password" name="PasswordLogin" noValidate onChange={this.handleChangeLogin}/>
            </div>
            <button type="submit" onClick={this.routeChange}>Sign In</button>
          </form>
      </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back !</h1>
              <p>To keep connect with us please login with your personnal infos</p>
              <button className="ghost" id="signIn">Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend !</h1>
              <p>Enter your personnal details and start a journey with us</p>
              <button className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}