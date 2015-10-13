import React from 'react';
import ReactDOM from 'react-dom';

const ListItem = React.createClass({

  handleClick: function() {
    this.props.onRemove(this.props.name);
  },

  render: function() {

    return (
      <li onClick={this.handleClick}>{this.props.name}</li>
    );
  }
});

const ListForm = React.createClass({

  saveComment: function (event) {
    event.preventDefault();
    this.props.onSaveComment(this.refs.name.value);
  },

  render: function() {
    return (<form onSubmit={this.saveComment}>
      <input type="text" ref="name" />
      <button type="submit">Save </button>
    </form>);
  }
});

const ListMaker = React.createClass({
  getInitialState: function () {
    return {
      names: this.props.names
    }
  },

  addName: function (newName) {
    let names = this.state.names;
    names.push(newName);
    this.setState({
      names: names
    });
  },

  removeName: function (newName) {
    this.setState({
      names: this.state.names.filter((name) => { return name !== newName })
    });
  },

  render: function() {
    let listItems = this.state.names.map((item, i) => {
      return <ListItem key={i} name={item} onRemove={this.removeName} />
    });
    return (<div>
      <h1>List Maker</h1>
      <ul>
        {listItems}
      </ul>
      <ListForm onSaveComment={this.addName} />
    </div>);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ListMaker names={["Jason", "Jason", "Sandra", "Mark"]} /> ,
    document.querySelector('.app')
  );
});
