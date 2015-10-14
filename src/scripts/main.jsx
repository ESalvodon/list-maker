import React from 'react';
import ReactDOM from 'react-dom';

const ListItem = React.createClass({

  handleClick: function() {
    this.props.onRemoveName(this.props.index);
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
    // This is a reference to ListMaker's `addName` function,
    // passed in through the props.
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

  componentWillMount: function () {
  },

  addName: function (newName) {
    let names = this.state.names.slice();
    names.push(newName);
    // Tell React we changed the state.
    this.setState({
      names: names
    });
  },

  removeName: function (index) {
    let names = this.state.names.slice();
    names.splice(index, 1);
    this.setState({
      names: names
    });
  },

  render: function() {
    let listItems = this.state.names.map((item, i) => {
      return <ListItem key={i} index={i} name={item} onRemoveName={this.removeName} />
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
    <ListMaker names={["Jason", "Jason", "Sandra", "Mark"]} />,
    document.querySelector('.app')
  );
});
