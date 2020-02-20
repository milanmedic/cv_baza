import React, {Component} from 'react'
import axios from 'axios';

class CompanyItem extends Component {
    constructor(props) {
        super(props)
    }

    handleDelete = (event) => {
        this.props.deleteCompany(this.props.company._id)
    }

    handleReset = (event) => {
        this.props.resetPassword(this.props.company._id)
    }

    render() {
        return (
            <tr className="company_item">
                <td>{this.props.company.company_name}</td>
                <td>{this.props.company.representative}</td>
                <td>{this.props.company.email}</td>
                <td>{this.props.company.phone}</td>
                <td>{this.props.company.package}</td>
                <td>
                    <button className="reset_pass_button" onClick = {this.handleReset} data-tooltip="Reset Password." type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px">
                            <path
                                d="M 7.1601562 3 L 8.7617188 5 L 18 5 C 18.551 5 19 5.448 19 6 L 19 15 L 16 15 L 20 20 L 24 15 L 21 15 L 21 6 C 21 4.346 19.654 3 18 3 L 7.1601562 3 z M 4 4 L 0 9 L 3 9 L 3 18 C 3 19.654 4.346 21 6 21 L 16.839844 21 L 15.238281 19 L 6 19 C 5.449 19 5 18.552 5 18 L 5 9 L 8 9 L 4 4 z"/>
                        </svg>
                    </button>
                </td>
                <td>
                    <button className="delete_company_button" onClick ={this.handleDelete} data-tooltip="Delete Company." type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px">
                            <path
                                d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"/>
                        </svg>
                    </button>
                </td>
            </tr>
        )
    }
}

export default CompanyItem