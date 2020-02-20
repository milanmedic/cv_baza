import React, {Component} from 'react'
import axios from 'axios'
import FileSaver from 'file-saver'
import Basic from './../SignUp_Components/Drag&Drop'
import Background from '../../Resources/Images/bg3.jpg'
import Logo from '../../Resources/Images/konteh.png'

class StudentDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            student: '',
            student_input_year: '',
            student_input_phone: '',
            student_input_email: '',
            student_input_index: '',
            student_input_dashboard_file: null,
        }
    }

    componentDidMount = async() => {
        const student =  await axios.get('http://localhost:3001/student/PR12-2015').then(async (response) => {
            await this.setState({student: response.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    getFile = async(file) => {
        let file_data = file[0]
        await this.setState({student_input_dashboard_file: file_data})
    }

    handleNewFileUploadEnableHandler = () => {
        let prompt_wrapper = document.getElementById('student_feedback_wrapper_inactive')
        let new_cv_prompt_window = document.getElementById('student_feedback_new_cv_prompt_disabled')
        this.setState({ student_input_dashboard_file: ''})
        prompt_wrapper.id = 'student_feedback_wrapper_active'
        new_cv_prompt_window.id = 'student_feedback_new_cv_prompt_active'
    }

    changeNewFilePromptDisableHandler = (event) => {
        let prompt_wrapper = document.getElementById('student_feedback_wrapper_active')
        let new_cv_prompt_window = document.getElementById('student_feedback_new_cv_prompt_active')
        prompt_wrapper.id = 'student_feedback_wrapper_inactive'
        new_cv_prompt_window.id='student_feedback_new_cv_prompt_disabled'
    }

    sendNewCV = async() => {
        let data = undefined
        let formData = new FormData()
        formData.append('index', this.state.student._id)
        formData.append('student_cv', this.state.student_input_dashboard_file)

        await axios.patch(`http://localhost:3001/upload_new_cv/${this.state.student._id}`, formData, {headers: {
            'Content-Type': 'multipart/form-data'}}).then((response) => {
            this.setState({student:response.data})
            let success_prompt = document.getElementById('student_feedback_notification_cv_upload_inactive')
            success_prompt.id = 'student_feedback_notification_cv_upload_success'
            success_prompt.innerHTML = '<p>Successfully changed your information</p>'
            setTimeout( ()=> {
                success_prompt.id = 'student_feedback_notification_cv_upload_inactive'
            },2000)
        }).catch( (err) => {
            let fail_prompt = document.getElementById('student_feedback_notification_cv_upload_inactive')
            fail_prompt.id = 'student_feedback_notification_cv_upload_fail'
            fail_prompt.innerHTML = '<p>There was an error while changing your information.</p>'
            setTimeout( ()=> {
                fail_prompt.id = 'student_feedback_notification_cv_upload_inactive'
            },2000)
            console.log(err)
        })
    }

    handleDownload = async() => {
        await axios(`http://localhost:3001/download_cv/${this.state.student._id}`, {
            method: "GET",
            responseType: "blob"
            //Force to receive data in a Blob Format
        }).then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob([response.data], {type: "application/pdf"});
            FileSaver.saveAs(file, `${this.state.student.name}_${this.state.student.surname}_${this.state.student._id}`)
        }).catch(error => {
            console.log(error);
        });
    }

    //new year

    changeYearPromptEnableHandler = (event) => {
        let prompt_wrapper = document.getElementById('student_feedback_wrapper_inactive')
        let year_prompt_window = document.getElementById('student_feedback_year_prompt_disabled')
        this.setState({ student_input_year: ''})
        prompt_wrapper.id = 'student_feedback_wrapper_active'
        year_prompt_window.id = 'student_feedback_year_prompt_active'
    }

    changeYearPromptDisableHandler = (event) => {
        let prompt_wrapper = document.getElementById('student_feedback_wrapper_active')
        let year_prompt_window = document.getElementById('student_feedback_year_prompt_active')
        prompt_wrapper.id = 'student_feedback_wrapper_inactive'
        year_prompt_window.id='student_feedback_year_prompt_disabled'
    }

    changeYearHandler = async(event) => {
        event.preventDefault()
        let value = event.target.value
        await this.setState({student_input_year: value})
    }

    sendNewYear = async() => {
        let data = undefined
        await axios.patch(`http://localhost:3001/change_year/${this.state.student._id}`, {newYear:this.state.student_input_year}).then((response) => {
            this.setState({student:response.data})
            let success_prompt = document.getElementById('student_feedback_notification_year_inactive')
            success_prompt.id = 'student_feedback_notification_year_success'
            success_prompt.innerHTML = '<p>Successfully changed your information</p>'
            setTimeout( ()=> {
                success_prompt.id = 'student_feedback_notification_year_inactive'
            },2000)
        }).catch( (err) => {
            let fail_prompt = document.getElementById('student_feedback_notification_year_inactive')
            fail_prompt.id = 'student_feedback_notification_year_fail'
            fail_prompt.innerHTML = '<p>There was an error while changing your information.</p>'
            setTimeout( ()=> {
                fail_prompt.id = 'student_feedback_notification_year_inactive'
            },2000)
            console.log(err)
        })
    }
    // CHANGE PHONE NUMBER
    changePhonePromptEnableHandler = (event) => {
        let prompt_wrapper = document.getElementById('student_feedback_wrapper_inactive')
        let phone_prompt_window = document.getElementById('student_feedback_phone_prompt_disabled')
        this.setState({ student_input_phone: ''})
        prompt_wrapper.id = 'student_feedback_wrapper_active'
        phone_prompt_window.id = 'student_feedback_phone_prompt_active'
    }

    changePhonePromptDisableHandler = (event) => {
        let prompt_wrapper = document.getElementById('student_feedback_wrapper_active')
        let phone_prompt_window = document.getElementById('student_feedback_phone_prompt_active')
        prompt_wrapper.id = 'student_feedback_wrapper_inactive'
        phone_prompt_window.id='student_feedback_phone_prompt_disabled'
    }

    changePhoneHandler = async(event) => {
        event.preventDefault()
        let value = event.target.value
        await this.setState({student_input_phone: value})
    }

    sendNewPhone = async() => {
        let data = undefined
        await axios.patch(`http://localhost:3001/change_phone/${this.state.student._id}`, {newPhone:this.state.student_input_phone}).then((response) => {
            this.setState({student:response.data})
            let success_prompt = document.getElementById('student_feedback_notification_phone_inactive')
            success_prompt.id = 'student_feedback_notification_phone_success'
            success_prompt.innerHTML = '<p>Successfully changed your information</p>'
            setTimeout( ()=> {
                success_prompt.id = 'student_feedback_notification_phone_inactive'
            },2000)
        }).catch( (err) => {
            let fail_prompt = document.getElementById('student_feedback_notification_phone_inactive')
            fail_prompt.id = 'student_feedback_notification_phone_fail'
            fail_prompt.innerHTML = '<p>There was an error while changing your information.</p>'
            setTimeout( ()=> {
                fail_prompt.id = 'student_feedback_notification_phone_inactive'
            },2000)
            console.log(err)
        })
    }

        // CHANGE email
        changeEmailPromptEnableHandler = (event) => {
            let prompt_wrapper = document.getElementById('student_feedback_wrapper_inactive')
            let email_prompt_window = document.getElementById('student_feedback_email_prompt_disabled')
            this.setState({ student_input_email: ''})
            prompt_wrapper.id = 'student_feedback_wrapper_active'
            email_prompt_window.id = 'student_feedback_email_prompt_active'
        }
    
        changeEmailPromptDisableHandler = (event) => {
            let prompt_wrapper = document.getElementById('student_feedback_wrapper_active')
            let email_prompt_window = document.getElementById('student_feedback_email_prompt_active')
            prompt_wrapper.id = 'student_feedback_wrapper_inactive'
            email_prompt_window.id='student_feedback_email_prompt_disabled'
        }
    
        changeEmailHandler = async(event) => {
            event.preventDefault()
            let value = event.target.value
            await this.setState({student_input_email: value})
        }
    
        sendNewEmail = async() => {
            let data = undefined
            await axios.patch(`http://localhost:3001/change_email/${this.state.student._id}`, {newEmail:this.state.student_input_email}).then((response) => {
                this.setState({student:response.data})
                let success_prompt = document.getElementById('student_feedback_notification_email_inactive')
                success_prompt.id = 'student_feedback_notification_email_success'
                success_prompt.innerHTML = '<p>Successfully changed your information</p>'
                setTimeout( ()=> {
                    success_prompt.id = 'student_feedback_notification_email_inactive'
                },2000)
            }).catch( (err) => {
                let fail_prompt = document.getElementById('student_feedback_notification_email_inactive')
                fail_prompt.id = 'student_feedback_notification_email_fail'
                fail_prompt.innerHTML = '<p>There was an error while changing your information.</p>'
                setTimeout( ()=> {
                    fail_prompt.id = 'student_feedback_notification_email_inactive'
                },2000)
                console.log(err)
            })
        }

        //CHANGE_PASS
        changePasswordPromptEnableHandler = (event) => {
            let prompt_wrapper = document.getElementById('student_feedback_wrapper_inactive')
            let password_prompt_window = document.getElementById('student_feedback_password_prompt_disabled')
            this.setState({ student_input_index: ''})
            prompt_wrapper.id = 'student_feedback_wrapper_active'
            password_prompt_window.id = 'student_feedback_password_prompt_active'
        }
    
        changePasswordPromptDisableHandler = (event) => {
            let prompt_wrapper = document.getElementById('student_feedback_wrapper_active')
            let password_prompt_window = document.getElementById('student_feedback_password_prompt_active')
            prompt_wrapper.id = 'student_feedback_wrapper_inactive'
            password_prompt_window.id='student_feedback_password_prompt_disabled'
        }
    
        changePasswordHandler = async(event) => {
            event.preventDefault()
            let value = event.target.value
            await this.setState({student_input_index: value})
        }
    
        sendNewPassword = async() => {
            let data = undefined
            await axios.patch(`http://localhost:3001/change_password/${this.state.student._id}`, {newPassword:this.state.student_input_index}).then((response) => {
                this.setState({student:response.data})
                let success_prompt = document.getElementById('student_feedback_notification_password_inactive')
                success_prompt.id = 'student_feedback_notification_password_success'
                success_prompt.innerHTML = '<p>Successfully changed your information</p>'
                setTimeout( ()=> {
                    success_prompt.id = 'student_feedback_notification_password_inactive'
                },2000)
            }).catch( (err) => {
                let fail_prompt = document.getElementById('student_feedback_notification_password_inactive')
                fail_prompt.id = 'student_feedback_notification_password_fail'
                fail_prompt.innerHTML = '<p>There was an error while changing your information.</p>'
                setTimeout( ()=> {
                    fail_prompt.id = 'student_feedback_notification_password_inactive'
                },2000)
                console.log(err)
            })
        }

        //delete account request
        sendDeleteRequest = async(event) => {
            event.preventDefault()
            await axios.get(`http://localhost:3001/delete_account/${this.state.student._id}`).then(response =>{
                let success_prompt = document.getElementById('student_feedback_notification_delete_send_inactive')
                success_prompt.id = 'student_feedback_notification_delete_send_success'
                success_prompt.innerHTML = '<p>Deletion request has been sent to the administrator</p>'
                setTimeout( ()=> {
                    success_prompt.id = 'student_feedback_notification_delete_send_inactive'
                },2000)
                this.setState()
            }).catch(err => {
                console.log(err)
            })
        }

    render() {
        return (
            <div
                className="student_dashboard_view"
                style={{
                backgroundImage: `url(${Background})`
            }}>
            <div id = "student_feedback_notification_delete_send_inactive"></div>
            <div id = "student_feedback_wrapper_inactive">
                <div id = "student_feedback_email_prompt_disabled">
                <div id = "student_feedback_notification_email_inactive"></div>
                    <div className = "student_feedback_prompt_input">
                        <label htmlFor="email">Enter new email adress:</label>
                        <input
                            type="email"
                            id="student_feedback_email_input"
                            className="student_feedback_input"
                            minLength="2"
                            maxLength="35"
                            value = {this.state.student_input_email}
                            onChange = {this.changeEmailHandler}
                            title="The domain portion of the email address  isinvalid (the portion after the @)."
                            placeholder="E-mail"
                            required/>
                    </div>
                    <div className = "student_prompt_buttons">
                        <button className = "student_prompt_buttons_submit" id="student_email_prompt_submit_button" onClick = {this.sendNewEmail}>Submit</button>
                        <button className = "student_prompt_buttons_cancel"  id="student_email_prompt_cancel_button" onClick = {this.changeEmailPromptDisableHandler} >Cancel</button>
                    </div>
                </div>

                <div id = "student_feedback_password_prompt_disabled">
                <div id = "student_feedback_notification_password_inactive"></div>
                    <div className = "student_feedback_prompt_input">
                        <label htmlFor="password">Enter new password:</label>
                        <input
                            type="password"
                            id="student_feedback_password_input"
                            className="student_feedback_input"
                            minLength="10"
                            value = {this.state.student_input_index}
                            title="Password needs to be longer than 10 characters"
                            placeholder="Password"
                            onChange = {this.changePasswordHandler}
                            required/>
                    </div>
                    <div className = "student_prompt_buttons">
                        <button className = "student_prompt_buttons_submit"id="student_password_prompt_submit_button" onClick = {this.sendNewPassword}>Submit</button>
                        <button className = "student_prompt_buttons_cancel" id="student_password_prompt_cancel_button"  onClick = {this.changePasswordPromptDisableHandler}>Cancel</button>
                    </div>
                </div>

                <div id = "student_feedback_phone_prompt_disabled">
                <div id = "student_feedback_notification_phone_inactive"></div>
                    <div className = "student_feedback_prompt_input">
                        <label htmlFor="phone">Enter new phone number:</label>
                        <input
                            type="text"
                            id="student_feedback_phone_input"
                            className="student_feedback_input"
                            minLength="11"
                            maxLength="13"
                            pattern = "^\+381([0-9]{8,9})"
                            title="Phone must be in specified format"
                            placeholder="Phone (+381*********)"
                            value = {this.state.student_input_phone}
                            onChange = {this.changePhoneHandler}
                            required/>
                    </div>
                    <div className = "student_prompt_buttons">
                        <button className = "student_prompt_buttons_submit" onClick = {this.sendNewPhone} id="student_phone_prompt_submit_button">Submit</button>
                        <button className = "student_prompt_buttons_cancel" onClick = {this.changePhonePromptDisableHandler} id="student_phone_prompt_cancel_button">Cancel</button>
                    </div>
                </div>

                <div id = "student_feedback_year_prompt_disabled">
                <div id = "student_feedback_notification_year_inactive"></div>
                    <div className = "student_feedback_prompt_input">
                        <label htmlFor="number">Enter new year of studies:</label>
                        <input
                            type="number"
                            id="student_feedback_year_input"
                            className="student_feedback_input"
                            min="1"
                            max="5"
                            value = {this.state.student_input_year}
                            title="Phone must be in specified format"
                            placeholder="Year"
                            onChange = {this.changeYearHandler}
                            required/>
                    </div>
                    <div className = "student_prompt_buttons">
                        <button className = "student_prompt_buttons_submit" id="student_year_prompt_submit_button"
                        onClick = {this.sendNewYear}>Submit</button>
                        <button className = "student_prompt_buttons_cancel" id="student_year_prompt_cancel_button"
                        onClick = {this.changeYearPromptDisableHandler}>Cancel</button>
                    </div>
                </div>

                <div id = "student_feedback_new_cv_prompt_disabled">
                <div id = "student_feedback_notification_cv_upload_inactive"></div>
                    <div className = "student_feedback_prompt_input">
                        <Basic getFile ={this.getFile}/>
                    </div>
                    <div className = "student_prompt_buttons">
                        <button className = "student_prompt_buttons_submit" id="student_year_prompt_submit_button" onClick = {this.sendNewCV}>Submit</button>
                        <button className = "student_prompt_buttons_cancel" id="student_year_prompt_cancel_button" onClick = {this.changeNewFilePromptDisableHandler}>Cancel</button>
                    </div>
                </div>

            </div>
                <div className="student_dashboard_wrapper">
                    <header className="student_dashboard_header">
                        <img src={Logo} alt="Konteh logo" id="konteh_logo"/>
                    </header>
                    <div className="student_dashboard_information_wrapper">
                        <div className="student_dashboard_information">
                            <div className="student_dashboard_information_fields">
                                <div className="student_info_item" id="student_name_surname_field">
                                    <div className="student_field_name">
                                        <p>Name & Surname:
                                        </p>
                                    </div>
                                    <div className="student_field_value">
                                        <p>{this.state.student.name} {this.state.student.surname}</p>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_email_field">
                                    <div className="student_field_name">
                                        <p>Email:
                                        </p>
                                    </div>
                                    <div className="student_field_value">
                                        <p>{this.state.student.email}</p>
                                    </div>
                                    <div className="student_change_value">
                                        <button className="student_change_value" id="student_change_email" onClick = {this.changeEmailPromptEnableHandler}>Change Email</button>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_password_field">
                                    <div className="student_field_name">
                                        <p>Password:</p>
                                    </div>
                                    <div className="student_change_value">
                                        <button className="student_change_value" id="student_change_password" onClick = {this.changePasswordPromptEnableHandler}>Change Password</button>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_phone_field">
                                    <div className="student_field_name">
                                        <p>Phone:</p>
                                    </div>
                                    <div className="student_field_value">
                                        <p>{this.state.student.phone}</p>
                                    </div>
                                    <div className="student_change_value">
                                        <button className="student_change_value" id="student_change_phone" onClick = {this.changePhonePromptEnableHandler}>Change Phone</button>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_index_field">
                                    <div className="student_field_name">
                                        <p>Index:</p>
                                    </div>
                                    <div className="student_field_value">
                                        <p>{this.state.student._id}</p>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_faculty_field">
                                    <div className="student_field_name">
                                        <p>Faculty:</p>
                                    </div>
                                    <div className="student_field_value">
                                        <p>{this.state.student.faculty}</p>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_year_field">
                                    <div className="student_field_name">
                                        <p>Year:</p>
                                    </div>
                                    <div className="student_field_value">
                                        <p>{this.state.student.year}</p>
                                    </div>
                                    <div className="student_change_value">
                                        <button className="student_change_value" id="student_change_year" onClick = {this.changeYearPromptEnableHandler}>Change Year</button>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_course_field">
                                    <div className="student_field_name">
                                        <p>Course:</p>
                                    </div>
                                    <div className="student_field_value">
                                        <p>{this.state.student.course}</p>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_cv_field">
                                    <div className="student_field_name">
                                        <p>Download CV:</p>
                                    </div>
                                    <div className="student_change_value">
                                        <button className="student_change_value" id="student_download_cv" onClick ={this.handleDownload}>Download your CV</button>
                                    </div>
                                </div>
                                
                                <div className="student_info_item" id="student_upload_cv_field">
                                    <div className="student_field_name">
                                        <p>Upload new CV:</p>
                                    </div>
                                    <div className="student_change_value">
                                        <button className="student_change_value" onClick = {this.handleNewFileUploadEnableHandler} id="student_upload_new_cv">Upload new CV</button>
                                    </div>
                                </div>
                                <div className="student_info_item" id="student_request_delete_field">
                                    <div className="student_field_name">
                                        <p>I want to delete my account:</p>
                                    </div>
                                    <div className="student_change_value">
                                        <button className="student_change_value" id="student_delete_account" onClick = {this.sendDeleteRequest}>Delete my Account</button>
                                    </div>
                                </div>
                                <div className="student_dashboard_log_out">
                                    <button id="student_log_out_button">Log Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentDashboard