import "./App.css";
import React from "react";
import Toolbar from "./components/Toolbar";
import MessageList from "./components/MessageList";
import ComposeForm from "./components/ComposeForm";

class App extends React.Component {
  state = { data: [] , isToggled: false};

  async componentDidMount() {
    const response = await fetch("http://localhost:8082/api/messages");
    const json = await response.json();
    this.setState({ data: json });
  }

  selectAll = (bool) => {
    this.setState({
      data: this.state.data.map((msg) => ({ ...msg, selected: !bool })),
    });
  };

  setStarred = async (message) => {
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: [message.id],
        command: "star",
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const updatedMessage = await response.json();
    this.setState({ data: updatedMessage });
  };

  setSelected = (message) => {
    const copyData = [...this.state.data];
    const actualId = copyData.findIndex((msg) => msg.id === message.id);
    copyData[actualId].selected = !copyData[actualId].selected;
    this.setState({ data: copyData });
  };

  markAsReaded = async (messages, bool) => {
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: messages.map((msg) => {
          return msg.id;
        }),
        command: "read",
        read: bool,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const updatedMessages = await response.json();
    this.setState({ data: updatedMessages });
  };

  deleteMessage = async () => {
    const selectedMessages = [
      ...this.state.data.filter((msg) => msg.selected === true),
    ];
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: selectedMessages.map((msg) => {
          return msg.id;
        }),
        command: "delete",
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const updatedMessages = await response.json();
    this.setState({ data: updatedMessages });
  };

  upadteLabels = async (messages, label, method) => {
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: messages.map((msg) => {
          return msg.id;
        }),
        command: method,
        label,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const updatedMessages = await response.json();
    this.setState({ data: updatedMessages });
  };

  getSelectedState = () => {
    const copyData = [...this.state.data];
    const selectedMessagesLength = copyData.filter(
      (msg) => msg.selected === true
    ).length;
    const allMessagesLength = copyData.length;
    const anySelcted =
      selectedMessagesLength > 0 ? "half-checked" : "unchecked";
    const stateMessage =
      selectedMessagesLength === allMessagesLength ? "checked" : anySelcted;
    return stateMessage;
  };

  addMessage = async (subject, body) => {
    const response = await fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify({
        subject: subject,
        body: body,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const updatedMessages = await response.json();
    this.setState({ data: [...this.state.data, updatedMessages] , isToggled: false});
  };

  toggleComposeForm = (bool) => {
    this.setState({isToggled: bool})
  }

  render() {
    const selectedMessages = this.state.data.filter(
      (msg) => msg.selected === true
    );

    const isToggled = this.state.isToggled

    return (
      <div>
        <Toolbar
          selectAll={this.selectAll}
          markAsReaded={this.markAsReaded}
          deleteMessage={this.deleteMessage}
          unreadedMessages={
            this.state.data.filter((msg) => msg.read !== true).length
          }
          upadteLabels={this.upadteLabels}
          selectedMessages={selectedMessages}
          selectedState={this.getSelectedState()}
          toggleComposeForm = {this.toggleComposeForm}
        />
        {isToggled ? <ComposeForm addMessage={this.addMessage}/> : <div/>}
        <MessageList
          messages={this.state.data}
          setSelected={this.setSelected}
          setStarred={this.setStarred}
        />
      </div>
    );
  }
}

export default App;
