import React, {Component} from 'react'
import CompaniesTable from './CompaniesTable'
import AddCompany from './AddCompany'
import Logo from '../../Resources/Images/konteh.png'
import axios from 'axios'
import randomize from 'randomatic'

class AdminDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companies: [],
            student: '',
        }
    }

    getCompanies = async() => {
        let companies_data = undefined
        try {
            companies_data = await axios.get('http://localhost:3001/companies')
        } catch (err) {
            console.log(err)
        }
        return companies_data.data
    }

    componentDidMount = async() => {
        let companies_data = await this.getCompanies()
        this.setState({companies: companies_data})
    }

    setPassword = () => {
        return randomize('*', 20)
    }

    addCompany = async(data) => {
        let newState = undefined
        await axios
            .post('http://localhost:3001/add_company', {
            company_name: data.admin_company_name_field,
            representative: data.admin_representative_field,
            email: data.admin_email_filed,
            pass: this.setPassword(),
            phone: data.admin_phone_field,
            package: data.admin_package_field
        }).catch(err => {
            console.log(err)
        })
        newState = await this.getCompanies()
        this.setState({companies: newState})
    }

    deleteCompany = async(data) => {
        let newState = undefined
        await axios
            .delete(`http://localhost:3001/delete_company/${data}`)
            .catch((error) => {
                console.log(error)
            })
        newState = await this.getCompanies()
        this.setState({companies: newState})
    }

    getIndex = (event) => {
        this.setState({student: event.target.value})
    }

    handleDelete = async(event) => {
        await axios.delete(`http://localhost:3001/delete_student/${this.state.student}`).then((response) =>{
            console.log(response)
            if(response.status === 204){
                let text = document.getElementById('student_status_info')
                text.innerText = "Student succesfully deleted"
                setTimeout( ()=> {
                    text.innerText = ''
                }, 3000)
                
            }
        }).catch((err) => {
            console.log(err)

        })
        this.setState({student: ''})
    }

    resetPassword = async(company_id) => {
        await axios.patch(`http://localhost:3001/reset_password/${company_id}`).then(response =>{
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    activateAddWindow = (event) => {
        let addWindow = document.getElementById('add_company_window')
        let addWindowWrapper = document.getElementById('add_company_window_wrapper')
        addWindow.id = 'add_company_window_active'
        addWindowWrapper.id = 'add_company_window_wrapper_active'
    }

    cancelAddWindow = (event) => {
        event.preventDefault()
        let addWindow = document.getElementById('add_company_window_active')
        let addWindowWrapper = document.getElementById('add_company_window_wrapper_active')
        addWindow.id = 'add_company_window'
        addWindowWrapper.id = 'add_company_window_wrapper'
    }

    /* TODO
        2. Implement Log Out logic
    */

    render() {
        return (
            <div className="admin_dashboard_view">
                <header className="admin_dashboard_header">
                    <img src={Logo} alt="Konteh logo" id="konteh_logo"/>
                </header>
                <div className="company_dashboard_wrapper">
                    <div id="admin_dashboard_toolbar">
                        <button
                            id="add_company_button"
                            data-tooltip="Add Company"
                            onClick={this.activateAddWindow}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px">
                                <path
                                    d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z"/>
                            </svg>
                        </button>
                        <div id="student_deletion_actions">
                            <label htmlFor="deleteStudent">Delete Student & CV by Index:</label>
                                    <input
                                        type="text"
                                        value = {this.state.student}
                                        id="delete_student_input"
                                        onChange={this.getIndex}/>
                            <button className="delete_company_button" onClick ={this.handleDelete}  data-tooltip="Delete Student." type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px">
                                <path
                                    d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L    5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C   17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7  z"/>
                            </svg>
                            </button>
                            <span id="student_status_info"></span>
                        </div>
                        <button id="logout_button">Log Out</button>
                    </div>
                    <div className="admin_dashboard_panel_wrapper">
                        <CompaniesTable
                            companies={this.state.companies}
                            deleteCompany={this.deleteCompany}
                            resetPassword={this.resetPassword}/>
                    </div>
                    <div id="add_company_window_wrapper">
                        <AddCompany
                            cancelAddWindow={this.cancelAddWindow}
                            addCompany={this.addCompany}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminDashboard