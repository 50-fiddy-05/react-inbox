import React from "react";

class Toolbar extends React.Component {
  state = {
    nothingSelected: (this.props.selectedMessages.length = 0 ? true : false),
    isToggled: false
  };

  selectAll = () => {
    this.props.selectAll(this.state.nothingSelected);
    this.setState({ nothingSelected: !this.state.nothingSelected });
  };

  applyLabel = (e) => {
    this.updateLabels(e, "addLabel");
  };

  removeLabel = (e) => {
    this.updateLabels(e, "removeLabel");
  };

  updateLabels = (e, method) => {
    const label =
      (e.target.value === "dev") |
      (e.target.value === "personal") |
      (e.target.value === "gschool")
        ? e.target.value
        : "";
    this.props.upadteLabels(this.props.selectedMessages, label, method);
  };

  getButtonStyle = (state) => {
    let buttonStyle = "";
    switch (state) {
      case "unchecked":
        buttonStyle = "fa-square-o";
        break;
      case "half-checked":
        buttonStyle = "fa-minus-square-o";
        break;
      case "checked":
        buttonStyle = "fa-check-square-o";
        break;
      default:
        buttonStyle = "";
    }
    return buttonStyle;
  };

  toggleComposeForm = () => {
    const isToggled = this.state.isToggled;
    this.setState({isToggled: !isToggled})
    this.props.toggleComposeForm(this.state.isToggled)
  }

  render() {
    const buttonStyle = this.getButtonStyle(this.props.selectedState);
    const buttonDisabled =
      this.props.selectedState === "unchecked" ? true : false;

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadedMessages}</span>
            unread messages
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus" onClick={this.toggleComposeForm}></i>
          </a>

          <button className="btn btn-default" onClick={this.selectAll}>
            <i className={"fa " + buttonStyle}></i>
          </button>

          <button
            className="btn btn-default"
            onClick={this.props.markAsReaded.bind(
              this,
              this.props.selectedMessages,
              true
            )}
            disabled={buttonDisabled}
          >
            Mark As Read
          </button>

          <button
            className="btn btn-default"
            onClick={this.props.markAsReaded.bind(
              this,
              this.props.selectedMessages,
              false
            )}
            disabled={buttonDisabled}
          >
            Mark As Unread
          </button>

          <select
            className="form-control label-select"
            onChange={this.applyLabel}
            disabled={buttonDisabled}
          >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select
            className="form-control label-select"
            onChange={this.removeLabel}
            disabled={buttonDisabled}
          >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o" onClick={this.props.deleteMessage}></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Toolbar;
