// document.getElementById('app').innerHTML = 'Webpack works'
/*使用es6的箭头函数*/
// var func = str => {
//   document.getElementById('app').innerHTML = str;
// };
// func('我现在在使用Babel!');

import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux'; // Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。
import store from './redux/store';

import getRouter from 'router/router';

/* 初始化 */
renderWithHotReload(getRouter());

/* 热更新 */
if (module.hot) {
  module.hot.accept('./router/router', () => {
    const getRouter = require('./router/router').default;
    renderWithHotReload(getRouter());
  });
}

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        {RootElement}
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
}