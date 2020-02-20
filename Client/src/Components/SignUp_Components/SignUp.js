import React, {Component} from 'react'
import Logo from '../../Resources/Images/konteh.png'
import Background from '../../Resources/Images/bg3.jpg'
import axios from 'axios'
import SelectFaculty from './SelectFaculty'
import SelectCourse from './SelectCourse'
import Basic from './Drag&Drop'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signup_field_name: '',
            signup_field_surname: '',
            signup_field_email: '',
            signup_field_password: '',
            signup_field_phone: '',
            signup_field_faculty: '',
            signup_field_course: '',
            signup_field_year: '',
            signup_field_index: '',
            signup_field_work_checkbox: false,
            signup_field_internship_checkbox: false,
            signup_field_file: null,
        };
    }

    getFile = async(file) => {
        let file_data = file[0]
        await this.setState({signup_field_file: file_data})
    }

    getFacultyOption = async(data) => {
        await this.setState({signup_field_faculty: data})
    }

    handleNameChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_name: value})
    }

    handleSurnameChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_surname: value})
    }

    handleEmailChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_email: value})
    }

    handlePasswordChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_password: value})
    }

    handlePhoneChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_phone: value})
    }

    getCourseOption = async(value) => {
        await this.setState({signup_field_course: value})
    }

    handleYearChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_year: value})
    }

    handleWorkChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_work_checkbox: value})
    }

    handleInternshipChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_internship_checkbox: value})
    }

    handleIndexChange = (event) => {
        let value = event.target.value
        this.setState({signup_field_index: value.toUpperCase()})
    }

    cancelCourse = () => { 
         document.getElementById("signup_form_reset").reset();
        // window.location.reload()
      }

    handleSubmit = async(event) => {
        event.preventDefault()
        let formData = new FormData()
        formData.append('name', this.state.signup_field_name)
        formData.append('surname', this.state.signup_field_surname)
        formData.append('email', this.state.signup_field_email)
        formData.append('password', this.state.signup_field_password)
        formData.append('phone', this.state.signup_field_phone)
        formData.append('faculty', this.state.signup_field_faculty)
        formData.append('course', this.state.signup_field_course)
        formData.append('year', this.state.signup_field_year)
        formData.append('index', this.state.signup_field_index)
        formData.append('work', this.state.signup_field_work_checkbox)
        formData.append('internship', this.state.signup_field_internship_checkbox)
        formData.append('student_cv', this.state.signup_field_file)
        
        await axios.post('http://localhost:3001/add_student', formData, {headers: {
            'Content-Type': 'multipart/form-data'}})
            .then((response) => {
                this.activatePromptWindow(response.data.exists)
            })
            .catch((err)=>{
                this.activatePromptWindow(err.data.exists)
            })

        this.setState({
            signup_field_name: '',
            signup_field_surname: '',
            signup_field_email: '',
            signup_field_password: '',
            signup_field_phone: '',
            signup_field_faculty: '',
            signup_field_course: '',
            signup_field_year: '',
            signup_field_index: '',
            signup_field_work_checkbox: false,
            signup_field_internship_checkbox: false,
            signup_field_file: undefined,
        })

        this.cancelCourse()
    }

    activatePromptWindow = (student_exists) => {
        if(student_exists){
            let submit_prompt = document.getElementById('signup_submit_feedback_prompt_disabled')
            submit_prompt.innerHTML = '<p>There was an error, please contact the administrator if the problem persists</p>'
            submit_prompt.id = 'signup_submit_feedback_prompt_fail'
            setTimeout( ()=> {
                this.cancelAddWindow(student_exists)
            },3000)
        } else {
            let submit_prompt = document.getElementById('signup_submit_feedback_prompt_disabled')
            submit_prompt.innerHTML = '<p>Successfully uploaded your CV!</p>'
            submit_prompt.id = 'signup_submit_feedback_prompt_success'
            setTimeout( ()=> {
                this.cancelAddWindow(student_exists)
            },3000)
        }
        
    }

    cancelAddWindow = (student_exists) => {
        if(student_exists){
            let submit_prompt = document.getElementById('signup_submit_feedback_prompt_fail')
        submit_prompt.id = 'signup_submit_feedback_prompt_disabled'
        } else {
            let submit_prompt = document.getElementById('signup_submit_feedback_prompt_success')
            submit_prompt.id = 'signup_submit_feedback_prompt_disabled'
        }
        
    }

    
    render() {
        return (
            <div
                className="signup_view"
                style={{
                backgroundImage: `url(${Background})`
            }}>
            <div id = "signup_submit_feedback_prompt_disabled">
            </div>
                <div className="signup_wrapper">
                    <header className="signup_header">
                        <img src={Logo} alt="Konteh logo" id="konteh_logo"/>
                    </header>
                    <div className="signup_input_wrapper">
                        <div className="signup_input_fields">
                            <form className="signup_form" id="signup_form_reset" onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    id="signup_name_field"
                                    minLength="2"
                                    maxLength="35"
                                    placeholder="Name"
                                    name="name"
                                    value = {this.state.signup_field_name}
                                    onChange
                                    ={this.handleNameChange}
                                    required/>
                                <input
                                    type="text"
                                    id="signup_surname_field"
                                    placeholder="Surname"
                                    value = {this.state.signup_field_surname}
                                    onChange
                                    ={this.handleSurnameChange}
                                    required/>
                                <input
                                    type="email"
                                    id="signup_email"
                                    minLength="2"
                                    maxLength="35"
                                    title="The domain portion of the email address isinvalid (the portion after the @)."
                                    
                                    id="signup_email"
                                    placeholder="E-mail"
                                    value = {this.state.signup_field_email}
                                    onChange={this.handleEmailChange}
                                    required/>

                                <input
                                    type="password"
                                    id="signup_password"
                                    minLength="10"
                                    title="Password must be at least 10 characters long"

                                    placeholder="Password"
                                    value = {this.state.signup_field_password}
                                    onChange={this.handlePasswordChange}
                                    required/>

                                <input
                                    type="text"
                                    id="signup_phone_field"
                                    placeholder="Phone (+381*********)"
                                    value = {this.state.signup_field_phone}
                                    minLength="11"
                                    maxLength="13"
                                    pattern = "^\+381([0-9]{8,9})"
                                    onChange
                                    ={this.handlePhoneChange}
                                    required/>

                                <SelectFaculty getFacultyOption = {this.getFacultyOption}faculty_options = {this.state.signup_field_faculty} selected_value = {this.state.signup_field_faculty}/>
                                <SelectCourse getCourseOption = {this.getCourseOption} signup_options = {this.state.signup_field_faculty}/>

                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    id="signup_year_field"
                                    placeholder="Year"
                                    value = {this.state.signup_field_year}
                                    onChange={this.handleYearChange}
                                    required/>

                                <input
                                    type="text"
                                    id="signup_index_field"
                                    minLength="4"
                                    maxLength="20"
                                    placeholder="Index"
                                    value = {this.state.signup_field_index}
                                    onChange
                                    ={this.handleIndexChange}
                                    required/>

                                <div className="signup_checkboxes" id="signup_work_checkbox">
                                    <input
                                        type="checkbox"
                                        id="signup_work_field"
                                        value="true"
                                        name="Searching for work"
                                        onChange={this.handleWorkChange}/>
                                    <label htmlFor="work">Searching for Work</label>
                                </div>
                                <div className="signup_checkboxes" id="signup_internship_checkbox">
                                    <input
                                        type="checkbox"
                                        id="signup_internship_field"
                                        value="true"
                                        name="Searchingfor internship"
                                        onChange={this.handleInternshipChange}/>
                                    <label htmlFor="internship">Searching for an Internship</label>
                                </div>

                                <div className="signup_checkboxes" id="signup_gdpr_checkbox">
                                    <input
                                        type="checkbox"
                                        id="signup_gdpr_field"
                                        value="true"
                                        name="Searchingfor gdpr"
                                        required
                                        />
                                    <label htmlFor="internship">I accept the GDPR Terms & Conditions</label>
                                </div>

                                <Basic getFile ={this.getFile}/>

                                <div className="signup_button">
                                    <button id="signup_submit_button" type="submit">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp