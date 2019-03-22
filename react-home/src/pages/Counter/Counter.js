import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from 'actions/counter';

class Counter extends Component {
  render() {
    return (
      <div>
        <div>当前计数为(显示redux计数)</div>
        <button onClick={() => this.props.increment()}>自增</button>
        <button onClick={() => this.props.decrement()}>自减</button>
        <button onClick={() => this.props.reset()}>重置</button>
      </div>
    ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increment: () => {
      dispatch(increment())
    },
    decrement: () => {
      dispatch(decrement())
    },
    reset: () => {
      dispatch(reset())
    }
  }
}

// connect函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。
export default connect(mapStateToProps, mapDispatchToProps)(Counter);