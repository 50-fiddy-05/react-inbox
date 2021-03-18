import "./App.css";
import React from "react";
import Toolbar from "./components/Toolbar";
import MessageList from "./components/MessageList";
import Data from "./Data";

class App extends React.Component {
  state = { data: Data };

  selectAll = (bool) => {
    this.setState({
      data: this.state.data.map((msg) => ({ ...msg, selected: !bool })),
    });
  };

  setStarred = (message) => {
    const copyData = this.state.data;
    const actualId = copyData.findIndex((msg) => msg.id === message.id);
    copyData[actualId].starred = !copyData[actualId].starred;
    this.setState({ data: copyData });
  };

  setSelected = (message) => {
    const copyData = this.state.data;
    const actualId = copyData.findIndex((msg) => msg.id === message.id);
    copyData[actualId].selected = !copyData[actualId].selected;
    this.setState({ data: copyData });
  };

  markAsReaded = (bool) => {
    const copyData = this.state.data;
    copyData.map((msg) => {
      if (msg.selected) {
        msg.read = bool;
      }
      return msg
    });
    this.setState({ data: copyData });
  };

  deleteMessage = () => {
    const copyData = this.state.data.filter((msg) => msg.selected !== true);
    this.setState({
      data: copyData,
    });
  };

  upadteLabels = (label, method) => {
    const copyData = this.state.data;
    copyData.map((msg) => {
      if (msg.selected) {
        msg.labels =
          method === "apply"
            ? [...msg.labels.filter((name) => name !== label), label]
            : msg.labels.filter((name) => name !== label);
        msg.labels.sort();
      }
      return msg
    });
    this.setState({
      data: copyData,
    });
  };

  getSelectedState = () => {
    const copyData = this.state.data
    const selectedMessagesLength = copyData.filter(
      (msg) => msg.selected === true
    ).length;
    const allMessagesLength = copyData.length;
    const anySelcted = selectedMessagesLength > 0 ? "half-checked" : "unchecked"
    const stateMessage = selectedMessagesLength === allMessagesLength ? "checked" : anySelcted
    return stateMessage
  };

  render() {
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
          selectedMessages={this.state.data.filter(
            (msg) => msg.selected !== true
          )}
          selectedState = {this.getSelectedState()}
        />
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
