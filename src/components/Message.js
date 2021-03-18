import React from "react";

class Message extends React.Component {
  setSelected = () => {
    this.props.setSelected(this.props.message);
  };

  setStarred = () => {
    this.props.setStarred(this.props.message);
  };

  render() {
    const isReaded = this.props.message.read === true ? "read" : "unread";
    const isSelected = this.props.message.selected === true ? "selected" : "";
    const isChecked = this.props.message.selected === true ? true : false;
    const isStarred = this.props.message.starred === true ? "" : "-o";
    const labels = this.props.message.labels;

    return (
      <div
        key={this.props.id}
        className={"row message " + isReaded + " " + isSelected}
      >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={this.setSelected}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={"star fa fa-star" + isStarred}
                onClick={this.setStarred}
              ></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {labels.map((label, id) => (
            <span key={id} className="label label-warning">
              {label}
            </span>
          ))}
          <a href="#">{this.props.message.subject}</a>
        </div>
      </div>
    );
  }
}

export default Message;
