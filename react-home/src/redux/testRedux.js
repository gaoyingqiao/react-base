import { increment, decrement, reset } from './actions/counter';
import store from './store';

// 打印初始状态
console.log('init state: ', store.getState());

// 每次 state 更新的时候，打印日志，subscribe() 返回一个函数来注销监听器
let unsubscribe = store.subscribe(() => console.log('state update: ', store.getState()));

store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

// 停止监听 state 更新
unsubscribe();