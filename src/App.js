import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  url = 'http://localhost:3000/todos/'

  state = {
    text: '',
    todos: []
  }

  componentDidMount() {
    Axios.get(this.url)
      .then(res => {
        this.setState({
          todos: res.data
        })
      })
  }

  addTodo = () => {
    Axios.post(this.url, {
      text: this.state.text,
      done: false
    }).then(res => {
      this.setState({
        todos: [...this.state.todos, res.data]
      })
    })
  }

  handleDone = (id) => {
    Axios.put(this.url + id, {
      ...this.state.todos.find(t => t.id === id),
      done: true
    }).then(res => {
      this.setState({
        todos: this.state.todos.map(t => {
          if (t.id === id) {
            return res.data
          }
          return t;
        })
      })
    })
  }

  render() {
    return (
      <div className="row container">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-8">
              <input 
                value={this.state.text}
                onChange={e => this.setState({text: e.target.value})}
                type="text"
                className="form-control"/>
            </div>
            <div className="col-md-4">
              <button onClick={this.addTodo} className="btn btn-success btn-block">
                Add
              </button>
            </div>
          </div>
          <div className="col-md-12">
            <h2>Todos:</h2>
          </div>
          <div className="col-md-12">
            {
              this.state.todos
                .filter(t => !t.done)
                .map(t => (
                <Todo key={t.id} onDone={this.handleDone} text={t.text} id={t.id}></Todo>
              ))
            }
          </div>

          <div className="col-md-12">
           <h2>Done:</h2>
          </div>
          <div className="col-md-12">
          {
              this.state.todos
                .filter(t => t.done)
                .map(t => (
                <Todo text={t.text} id={t.id}></Todo>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
