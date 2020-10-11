import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anecdotes: [],
      current: 0
    };
  };

  componentDidMount() {
    axios.get('http://localhost:3001/anecdotes')
      .then(response => {
        this.setState({ anecdotes: response.data})
      });
  };

  handleClick() {
    const current = Math.round(
      Math.random() * this.state.anecdotes.length
    );
    this.setState({current})
  }

  render() {

    if (this.state.anecdotes.length === 0) {
      return <div>no anecdotes ...</div>
    }

    return (
      <>
        <h1>anecdote of the day</h1>
        <div>
          {
            this.state.anecdotes[this.state.current].content
          }
        </div>
        <button onClick={() => this.handleClick()}>next</button>
      </>
    )
  }
};

export default App;
