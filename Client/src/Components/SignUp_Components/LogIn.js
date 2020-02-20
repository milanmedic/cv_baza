import React, {Component} from 'react'
import Logo from '../../Resources/Images/konteh.svg'
import Background from '../../Resources/Images/bg3.jpg'
import * as axios from 'axios';

class LogIn extends Component{
    constructor(props, context){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const emailInputValue = this.emailRef.current.value;
        const passwordInputValue = this.passwordRef.current.value;

        axios.post('http://localhost:3001/login_company', {
            email: emailInputValue,
            password: passwordInputValue
          })
          .then(response => {
            localStorage.setItem('token', response.data.token);
            this.props.history.push('/company_dashboard');
          })
          .catch(error => {
            console.log(error);
          });
    }

/* TO-DO:
    1. Fix red borders around input field when focusing on field if it's empty
    2. Implement POST logic for Sign Up field
*/
    render(){
        return(
            <div className = "login_view" style = {{backgroundImage: `url(${Background})`}} >
                <div className = "login_wrapper">
                    <header className = "login_header">
                        <img src = {Logo} alt = "Konteh logo" id = "konteh_logo"/>
                    </header>
                    <div className = "login_input_wrapper">
                        <div className = "login_input_fields">
                            <form className = "login_form" onSubmit={this.handleSubmit}>
                                <input ref={this.emailRef} type="email" title="The domain portion of the email address is invalid (the portion after the @)." className = "email_input_field" id = "login_email" placeholder = "E-mail" required/>
                                <input ref={this.passwordRef} type = "password" className = "password_input_field" id = "login_password" placeholder = "Password" required/>
                                <button id="login_submit_button" type="submit">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogIn