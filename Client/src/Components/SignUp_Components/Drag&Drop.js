import React, {Component} from 'react'
import Dropzone from 'react-dropzone'

class Basic extends Component {
    constructor() {
        super()
        this.state = {
            files: []
        }
    }

    async onDrop(files) {
        console.log(files)
        await this.setState({files});
        this.props.getFile(files)
    }

    onCancel() {
        this.setState({files: []});
    }

    render() {
        return (
            <section className="cv_dropzone">
                <Dropzone
          accept='application/pdf'
          multiple={false}
          onDrop={this.onDrop.bind(this)}
          onFileDialogCancel={this.onCancel.bind(this)}
        >
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} id ="file_input" required/>
                <p id="file_input_text">{this.state.files.length === 0?'Drop files here, or click to select files':this.state.files[0].name}</p>
            </div>
          )}
        </Dropzone>
            </section>
        );
    }
}

export default Basic