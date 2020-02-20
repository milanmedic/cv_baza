import React, {Component} from 'react'
import axios from 'axios'
import Logo from './../../Resources/Images/konteh.png'

//COMPONENTS
import StudentTable from './StudentsTable'

class CompanyDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            students: [],
            filteredStudents: [],
            courseFilterValue: '',
            facultyFilterValue: '',
            yearFilterValue: '',
            workFilterValue: false,
            internshipFilterValue: false,
        }
    }

    getStudents = async() => {
        let students_data = undefined
        try {
            students_data = await axios.get('http://localhost:3001/students')
        } catch (err) {
            console.log(err)
        }
        return students_data.data
    }

    componentDidMount = async() => {
        let students_data = await this.getStudents()
        this.setState({students: students_data})
    }

    handleYearChange = (event) => {
        event.preventDefault()
        this.setState({
            yearFilterValue: parseInt(event.target.value, 10)
        })
    }

    handleCourseChange = (event) => {
        event.preventDefault()
        let data = event.target.value
        this.setState({courseFilterValue: data})
    }

    handleFacultyChange = (event) => {
        event.preventDefault()
        let data = event.target.value
        this.setState({facultyFilterValue: data})
    }

    handleWorkChange = (event) => {
        if(event.target.value === 'true'){
            this.setState({workFilterValue: true})
        } else {
            this.setState({workFilterValue: false})
        }
        
    }

    handleInternshipChange = (event) => {
        if(event.target.value === 'true'){
            this.setState({internshipFilterValue: true})
        } else {
            this.setState({internshipFilterValue: false})
        }

    }

    filterStudents = (event) => {
        event.preventDefault()

        let filter = {
            year: this.state.yearFilterValue,
            course: this.state.courseFilterValue,
            work: this.state.workFilterValue,
            internship: this.state.internshipFilterValue
        }
        
        let filtered = this
            .state
            .students
            .filter((item) => {
                if (filter.year !== '' && filter.course !== '') {
                    return item.course === filter.course && item.year === filter.year
                } else if (filter.course !== '') {
                    return item.course === filter.course
                } else if (filter.year !== '') {
                    return item.year === filter.year
                } else {
                    return item
                }
            })

        filtered = filtered.filter((item) => {
            if(filter.work !== false && filter.internship !== false){
                return item.work === filter.work && item.internship === filter.internship
            } else if(filter.work !== false){
                return item.work === filter.work
            } else if(filter.internship !== false){
                return item.internship === filter.internship
            } else {
                return item
            }
        })
        this.setState({filteredStudents: filtered})
    }

    resetFilter = (event) => {
        event.preventDefault()
        this.setState({filteredStudents: '', courseFilterValue: '', yearFilterValue: '', workFilterValue: false, internshipFilterValue: false})
        document.getElementById("filters_toolbar_form").reset()
    }

    /* TODO:
        3. Implement Log Out Logic
    */

    render() {
        return (
            <div className="company_dashboard_view">
                <header className="company_dashboard_header">
                    <img src={Logo} alt="Konteh logo" id="konteh_logo"/>
                </header>
                <div className="company_dashboard_wrapper">
                    <div id="dashboard_toolbar">
                        <div id="filters_toolbar">
                            <form id="filters_toolbar_form" onSubmit={this.filterStudents}>
                                <label htmlFor="year">Year:</label>
                                <input
                                    type="number"
                                    placeholer="Year"
                                    min="1"
                                    max="5"
                                    id="student_year_filter"
                                    value = {this.state.yearFilterValue}
                                    onChange={this.handleYearChange}/>
                                <label htmlFor="course">Course:</label>
                                <input
                                    type="text"
                                    id="student_course_filter"
                                    value = {this.state.courseFilterValue}
                                    onChange={this.handleCourseChange}/>
                                <label htmlFor="course">Work:</label>
                                <input
                                        type="checkbox"
                                        id="company_work_filter_field"
                                        value="true"
                                        name="Searching for work"
                                        onChange={this.handleWorkChange}/>
                                <label htmlFor="course">Internship:</label>
                                <input
                                        type="checkbox"
                                        id="company_internship_filter_field"
                                        value="true"
                                        name="Searching for work"
                                        onChange={this.handleInternshipChange}/>
                                <button id="company_filter_button" data-tooltip="Filter students." type="submit" onClick = {this.filterStudents}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24px"
                                        height="24px">
                                        <path
                                        d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/>
                                    </svg>
                                </button>
                                <button id="reset_filter_button" data-tooltip="Reset Filter." type="submit" onClick = {this.resetFilter}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                                        <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/> 
                                    </svg>
                                </button>
                            </form>
                        </div>
                        <button id="logout_button">Log Out</button>
                    </div>
                    <div className="dashboard_panel_wrapper">
                        <StudentTable
                            students=
                            {this.state.filteredStudents.length === 0?this.state.students:this.state.filteredStudents}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyDashboard

/*
let filtered = this
            .state
            .students
            .filter((item) => {
                if (filter.year !== '' && filter.course !== '') {
                    return item.course === filter.course && item.year === filter.year
                } else if (filter.course !== '') {
                    return item.course === filter.course
                } else if (filter.year !== '') {
                    return item.year === filter.year
                } else {
                    return item
                }
            })

        filtered = filtered.filter((item) => {
            if(filter.work !== false && filter.internship !== false){
                return item.work === filter.work && item.internship == filter.internship
            } else if(filter.work !== false){
                return item.work === filter.work
            } else if(filter.internship !== false){
                return item.internship === filter.internship
            } else {
                return item
            }
        }) */