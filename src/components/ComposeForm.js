import React from "react";

class ComposeForm extends React.Component {

    state = {subject: "", body: ""}

    setSubject = (e) => {
        e.preventDefault()
        this.setState({subject: e.target.value})
    }

    setBody = (e) => {
        e.preventDefault()
        this.setState({body: e.target.value})
    }

    addMessage = (e) => {
        e.preventDefault()
        const subject = this.state.subject
        const body = this.state.body
        this.props.addMessage(subject, body);
    }

    render() {
        return (
            <form className="form-horizontal well">
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this.setSubject}/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                    <textarea name="body" id="body" className="form-control" onChange={this.setBody}></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit" value="Send" className="btn btn-primary" onClick={this.addMessage}/>
                </div>
            </div>
            </form>
        )
    }
}

export default ComposeForm