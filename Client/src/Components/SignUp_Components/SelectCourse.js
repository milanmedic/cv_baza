import React, {Component} from 'react'

class SelectCourse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected_value: undefined, 
            course_options_ftn: [
                {
                    value: '',
                    label: 'Select a valid course...'
                },
                {
                    value: 'Architecture',
                    label: 'Architecture'
                },
                {
                    value: 'Biomedical Engineering',
                    label: 'Biomedical Engineering'
                },
                {
                    value: 'Clean Energy Technologies',
                    label: 'Clean Energy Technologies'
                },
                {
                    value: 'Computing and Control Engineering',
                    label: 'Computing and Control Engineering'
                },
                {
                    value: 'Disaster Risk Management and Fire Safety',
                    label: 'Disaster Risk Management and Fire Safety'
                },
                {
                    value: 'Energy and Process Engineering',
                    label: 'Energy and Process Engineering'
                },
                {
                    value: 'Engineering Animation',
                    label: 'Engineering Animation'
                },
                {
                    value: 'Engineering Management',
                    label: 'Engineering Management'
                },
                {
                    value: 'Environmental Engineering',
                    label: 'Environmental Engineering'
                },
                {
                    value: 'Geodesy and Geomatics',
                    label: 'Geodesy and Geomatics'
                },
                {
                    value: 'Graphic Engineering and Design',
                    label: 'Graphic Engineering and Design'
                },
                {
                    value: 'Industrial Engineering',
                    label: 'Industrial Engineering'
                },
                {
                    value: 'Information Engineering',
                    label: 'Information Engineering'
                },
                {
                    value: 'Information Systems Engineering',
                    label: 'Information Systems Engineering'
                },
                {
                    value: 'Measurement and Control Engineering',
                    label: 'Measurement and Control Engineering'
                },
                {
                    value: 'Mechanization and Construction Engineering',
                    label: 'Mechanization and Construction Engineering'
                },
                {
                    value: 'Mechatronics',
                    label: 'Mechatronics'
                },
                {
                    value: 'Postal Traffic and Telecommunications',
                    label: 'Postal Traffic and Telecommunications'
                },
                {
                    value: 'Power Software Engineering',
                    label: 'Power Software Engineering'
                },
                {
                    value: 'Power, Electronic and Telecommunication Engineering',
                    label: 'Power, Electronic and Telecommunication Engineering'
                },
                {
                    value: 'Production Engineering',
                    label: 'Production Engineering'
                },
                {
                    value: 'Safety at Work',
                    label: 'Safety at Work'
                },
                {
                    value: 'Scene Architecture, Technique and Design',
                    label: 'Scene Architecture, Technique and Design'
                },
                {
                    value: 'Software Engineering and Information Technologies',
                    label: 'Software Engineering and Information Technologies'
                },
                {
                    value: 'Technical Mechanics and Technical Design',
                    label: 'Technical Mechanics and Technical Design'
                },
                {
                    value: 'Traffic and Transport Engineering',
                    label: 'Traffic and Transport Engineering'
                },
                {
                    value: 'Other',
                    label: 'Other'
                }
            ],
            course_options_pmf: [
                {
                    value: '',
                    label: 'Select a valid course...'
                },
                {
                    value: 'Information Technologies',
                    label: 'Information Technologies'
                },
                {
                    value: 'Computer Science',
                    label: 'Computer Science'
                },
                {
                    value: 'Other',
                    label: 'Other'
                }
            ],
            course_options_other: [
                {
                    value: '',
                    label: 'Select a valid course...'
                },
                {
                    value: 'Other',
                    label: 'Other'
                },
            ],
        }
    }

    pickCourses = () => {
        const options = this.props.signup_options
        if(options === 'Faculty of Technical Sciences'){
            return this.state.course_options_ftn
        } else if(options === 'Faculty of Sciences'){
            return this.state.course_options_pmf
        } else if(options === 'Other'){
            return this.state.course_options_other
        } else {
            return [{value: '', label: 'Select faculty first...'}]
        }
    }

    handleChange = (event) => {
        this.props.getCourseOption(event.target.value)
    }

    renderOptions = () => {
        let course_options = this.pickCourses()
        return course_options
            .map(item => {
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
                {this.renderOptions()}
            </select>
        )
    }
}

export default SelectCourse