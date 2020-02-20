import React, {Component} from 'react'
import ok from './../../Resources/Images/ok.svg'
import notok from './../../Resources/Images/cancel.svg'
import FileSaver from 'file-saver'
import axios from 'axios';



class StudentItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            index: this.props.student._id,
            link_value: ''
        }
    }
    //Change Blob filename on Download
    handleDownload = async(event) => {
        await axios(`http://localhost:3001/download_cv/${this.state.index}`, {
            method: "GET",
            responseType: "blob"
            //Force to receive data in a Blob Format
        }).then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob([response.data], {type: "application/pdf"});
            FileSaver.saveAs(file, `${this.props.student.name}_${this.props.student.surname}_${this.props.student._id}`)
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <tr className="student_item">
                <td>{`${this.props.student.name} ${this.props.student.surname}`}</td>
                <td>{this.props.student.phone}</td>
                <td>{this.props.student.email}</td>
                <td>{this.props.student.faculty}</td>
                <td>{this.props.student.course}</td>
                <td>{this.props.student._id}</td>
                <td>{this.props.student.year}</td>
                <td>{this.props.student.work
                        ? (<img src={ok} alt="Yes"/>)
                        : (<img src={notok} alt="No"/>)}
                </td>
                <td>{this.props.student.internship
                        ? (<img src={ok} alt="Yes"/>)
                        : (<img src={notok} alt="No"/>)}</td>
                <td>
                    <button
                        className="download_cv_button"
                        data-tooltip="Download CV"
                        type="submit"
                        onClick={this.handleDownload}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px">
                            <path
                                d="M19.355,10.036C18.674,6.595,15.641,4,12,4C9.108,4,6.603,5.639,5.352,8.036C2.343,8.36,0,10.906,0,14c0,3.314,2.686,6,6,6 h13c2.761,0,5-2.239,5-5C24,12.36,21.948,10.221,19.355,10.036z M12,18l-5-5h3V9h4v4h3L12,18z"/>
                        </svg>
                    </button>
                </td>
            </tr>
        )
    }
}

export default StudentItem