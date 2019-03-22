import counter from './reducers/counter';

/**
 * 处理整棵树
 * @param {*} state 
 * @param {*} action 
 */
export default function combineReducers(state = {}, action) {
  return {
    counter: counter(state.counter, action)
  };
}