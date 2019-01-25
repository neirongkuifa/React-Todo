import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      count: 0,
      finished: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.id = 0;
  }
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input id="textInput" type="text" />
            <input type="submit" value="Add" />
          </form>
        </div>
        <div>
          <span>Todos: {this.state.count}</span>
          <span>Finished: {this.state.finished}</span>
        </div>
        <div>
          <ul>
            {this.state.todos.map(todo => (
              <Todo
                id={todo.id}
                key={todo.id}
                checked={todo.checked}
                text={todo.text}
                onCheck={this.handleCheck}
                onDelete={this.handleDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
  handleSubmit(event) {
    const text = document.getElementById("textInput");
    this.setState(state => ({
      todos: [
        ...state.todos,
        { id: this.id++, text: text.value, checked: false }
      ],
      count: state.count + 1
    }));
    event.preventDefault();
  }
  handleDelete(id, checked) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
      count: this.state.count - 1,
      finished: checked ? this.state.finished - 1 : this.state.finished
    });
  }
  handleCheck(id, checked) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      }),
      finished: checked ? this.state.finished - 1 : this.state.finished + 1
    });
  }
}

function Todo(props) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => props.onCheck(props.id, props.checked)}
        checked={props.checked}
      />
      <span>{props.text}</span>
      <button onClick={() => props.onDelete(props.id, props.checked)}>
        Delete
      </button>
    </li>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
