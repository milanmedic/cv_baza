import React, {Component} from 'react'
import StudentItem from './StudentItem'

class StudentTable extends Component{
    constructor(props){
        super(props)

        
    }
    renderStudents = () => {
        return (this.props.students.map( (student) => {
            return <StudentItem key = {student._id} student = {student}/>
        }))
    }
    render(){
        return(
            <table className = "students_table">
                <thead>
                    <tr id = "student_table_header">
                        <td>Name & Surname</td>
                        <td>Phone</td>
                        <td>Email</td>
                        <td>Faculty</td>
                        <td>Course</td>
                        <td>Index</td>
                        <td>Year</td>
                        <td>Work</td>
                        <td>Internship</td>
                        <td>CV</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderStudents()}
                </tbody>
            </table>
        )
    }
}

export default StudentTable