import React from "react";
import Message from "./Message";

class MessageList extends React.Component {
  render() {
    return (
      <div>
        {this.props.messages.map((message, id) => (
          <Message key={id} message={message} setSelected = {this.props.setSelected} setStarred = {this.props.setStarred}/>
        ))}
      </div>
    );
  }
}

export default MessageList;
