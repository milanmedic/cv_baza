import React, {Component} from 'react'
import CompanyItem from './CompanyItem'

class CompanyTable extends Component {
    constructor(props) {
        super(props)

    }

    renderCompanies = () => {
        return (this.props.companies.map((company) => {
            return <CompanyItem key={company._id} company={company} deleteCompany={this.props.deleteCompany} resetPassword = {this.props.resetPassword}/>
        }))
    }
    render() {
        return (
            <table className="companies_table">
                <thead>
                    <tr id="company_table_header">
                        <td>Company Name</td>
                        <td>Representative</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Package</td>
                        <td>Password Reset</td>
                        <td>Delete a Company</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderCompanies()}
                </tbody>
            </table>
        )
    }
}

export default CompanyTable