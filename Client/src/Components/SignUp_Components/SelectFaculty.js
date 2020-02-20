import React, {Component} from 'react'

class SelectFaculty extends Component {
    constructor(props) {
        super(props)

        this.state = {
            faculty_options: [
                {
                    value: 'Faculty of Technical Sciences',
                    label: 'Faculty of Technical Sciences'
                },
                {
                    value: 'Faculty of Sciences',
                    label: 'Faculty of Sciences'
                },
                {
                    value: 'Other',
                    label: 'Other'
                }
            ],
            selected_value: this.props.selected_value
        }
    }

    handleChange = (event) => {
        const value = event.target.value
        this.props.getFacultyOption(value)
        this.setState({selected_value: value})
    }

    renderOptions = () => {
        return this.state.faculty_options.map(item => {
                return <option defaultValue key={item.value} value={item.value}>{item.label}</option>
            })
    }

    render() {
        return (
            <select
                id="faculty_selected_field"
                value={this.state.selected_value}
                onChange
                ={this.handleChange} required>
                <option value="" defaultValue>
                    Select one...
                </option>
                {this.renderOptions()}
            </select>
        )
    }
}

export default SelectFaculty