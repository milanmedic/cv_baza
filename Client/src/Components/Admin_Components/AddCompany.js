import React from 'react'
import axios from 'axios'

class AddCompany extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            admin_company_name_field: '',
            admin_representative_field: '',
            admin_email_filed: '',
            admin_phone_field: '',
            admin_package_field: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.id]: event.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addCompany(this.state)
    }

    render() {
        return (
            <div id="add_company_window">
                <form id="add_company_form" onSubmit = {this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Company Name"
                        id="admin_company_name_field"
                        onChange
                        ={this.handleChange}
                        required/>
                    <input
                        type="text"
                        placeholder="Representative"
                        id="admin_representative_field"
                        onChange
                        ={this.handleChange}
                        required/>
                    <input
                        type="email"
                        title="The domain portion of the email address is invalid (the portion after the @)."
                        pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
                        id="signup_email"
                        placeholder="E-mail"
                        id="admin_email_filed"
                        onChange
                        ={this.handleChange}
                        required/>
                    <input
                        type="text"
                        id="admin_phone_field"
                        placeholder="Phone"
                        onChange
                        ={this.handleChange}
                        required/>
                    <input
                        type="text"
                        id="admin_package_field"
                        placeholder="Package"
                        onChange
                        ={this.handleChange}
                        required/>

                    <div id="admin_form_buttons">
                        <button id="add_comp_button" data-tooltip="Add Company" type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                version="1.1"
                                width="24px"
                                height="24px">
                                <path
                                    d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z "/>
                            </svg>
                        </button>
                        
                    </div>

                </form>
                <button id="cancel_add_button" data-tooltip="Cancel" onClick={this.props.cancelAddWindow}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px">
                        <path
                            d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/>
                    </svg>
                </button>
            </div>
        )
    }
}

export default AddCompany

/*<button id="generate_pass_button" type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px">
                                <path
                                    d="M 16.064453 2 C 15.935453 2 15.8275 2.0966094 15.8125 2.2246094 L 15.695312 3.2363281 C 15.211311 3.4043017 14.773896 3.6598036 14.394531 3.9882812 L 13.457031 3.5839844 C 13.339031 3.5329844 13.202672 3.5774531 13.138672 3.6894531 L 12.201172 5.3105469 C 12.136172 5.4215469 12.166531 5.563625 12.269531 5.640625 L 13.078125 6.2402344 C 13.030702 6.4865104 13 6.7398913 13 7 C 13 7.2601087 13.030702 7.5134896 13.078125 7.7597656 L 12.269531 8.359375 C 12.166531 8.435375 12.137172 8.5774531 12.201172 8.6894531 L 13.138672 10.310547 C 13.202672 10.422547 13.339031 10.468969 13.457031 10.417969 L 14.394531 10.011719 C 14.773896 10.340196 15.211311 10.595698 15.695312 10.763672 L 15.8125 11.775391 C 15.8275 11.903391 15.935453 12 16.064453 12 L 17.935547 12 C 18.064547 12 18.1725 11.903391 18.1875 11.775391 L 18.304688 10.763672 C 18.789173 10.59553 19.227802 10.340666 19.607422 10.011719 L 20.542969 10.414062 C 20.660969 10.465063 20.797328 10.420594 20.861328 10.308594 L 21.798828 8.6875 C 21.863828 8.5765 21.833469 8.4344219 21.730469 8.3574219 L 20.923828 7.7578125 C 20.970992 7.5121818 21 7.2593796 21 7 C 21 6.7398913 20.969298 6.4865104 20.921875 6.2402344 L 21.730469 5.640625 C 21.833469 5.564625 21.862828 5.4225469 21.798828 5.3105469 L 20.861328 3.6894531 C 20.797328 3.5774531 20.660969 3.5310312 20.542969 3.5820312 L 19.605469 3.9882812 C 19.226104 3.6598036 18.788689 3.4043017 18.304688 3.2363281 L 18.1875 2.2246094 C 18.1725 2.0966094 18.064547 2 17.935547 2 L 16.064453 2 z M 17 5.25 C 17.966 5.25 18.75 6.034 18.75 7 C 18.75 7.967 17.966 8.75 17 8.75 C 16.034 8.75 15.25 7.967 15.25 7 C 15.25 6.034 16.034 5.25 17 5.25 z M 7.0644531 9 C 6.9354531 9 6.8275 9.0966094 6.8125 9.2246094 L 6.6386719 10.710938 C 5.8314079 10.940599 5.1026855 11.35237 4.5175781 11.921875 L 3.1582031 11.335938 C 3.0402031 11.284937 2.9038438 11.329406 2.8398438 11.441406 L 1.9023438 13.0625 C 1.8373437 13.1735 1.8677031 13.315578 1.9707031 13.392578 L 3.1679688 14.279297 C 3.0687954 14.672064 3 15.076469 3 15.5 C 3 15.923531 3.0687954 16.327936 3.1679688 16.720703 L 1.9707031 17.609375 C 1.8677031 17.685375 1.8383437 17.827453 1.9023438 17.939453 L 2.8398438 19.560547 C 2.9038438 19.672547 3.0402031 19.717016 3.1582031 19.666016 L 4.5175781 19.078125 C 5.1026855 19.64763 5.8314079 20.059401 6.6386719 20.289062 L 6.8125 21.775391 C 6.8275 21.903391 6.9354531 22 7.0644531 22 L 8.9355469 22 C 9.0645469 22 9.1725 21.903391 9.1875 21.775391 L 9.3613281 20.289062 C 10.168592 20.059401 10.897314 19.64763 11.482422 19.078125 L 12.841797 19.664062 C 12.959797 19.715062 13.096156 19.670594 13.160156 19.558594 L 14.097656 17.9375 C 14.162656 17.8265 14.132297 17.684422 14.029297 17.607422 L 12.832031 16.720703 C 12.931205 16.327936 13 15.923531 13 15.5 C 13 15.076469 12.931205 14.672064 12.832031 14.279297 L 14.029297 13.390625 C 14.132297 13.314625 14.161656 13.172547 14.097656 13.060547 L 13.160156 11.439453 C 13.096156 11.327453 12.959797 11.282984 12.841797 11.333984 L 11.482422 11.921875 C 10.897314 11.35237 10.168592 10.940599 9.3613281 10.710938 L 9.1875 9.2246094 C 9.1725 9.0966094 9.0645469 9 8.9355469 9 L 7.0644531 9 z M 8 13.5 C 9.105 13.5 10 14.395 10 15.5 C 10 16.605 9.105 17.5 8 17.5 C 6.895 17.5 6 16.605 6 15.5 C 6 14.395 6.895 13.5 8 13.5 z"/>
                            </svg>
                        </button> */