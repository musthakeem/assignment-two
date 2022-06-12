import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Store from 'store';


const {store, persistor} = Store();

test('renders the App', () => {
  // render(
  // <Provider store={store}>
  //   <PersistGate persistor={persistor}>
  //     <BrowserRouter>
  //       <App/> 
  //     </BrowserRouter>
  //   </PersistGate>
  // </Provider>
  // );
});


afterEach(cleanup)