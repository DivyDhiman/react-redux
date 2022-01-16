import 'jsdom-global/register';
import React from 'react';
import App from '../App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from '../utils/config'
import expect from 'expect';
import reducer from '../redux/reducers/post_list_reducer';
import * as actions from '../redux/actions/post_list_action';
import { mount } from 'enzyme'
import {  BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import {getPostList} from '../redux/service/get_post_list';
import rootReducer from "../redux/reducers/index";
import thunk from "redux-thunk";
import store from "../redux/store/index";
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('App', () => {
  it('should render a startup component if startup is not complete', () => {
    const wrapper = mount(<Provider store={store}>
      <BrowserRouter>
       <App />
    </BrowserRouter>
    </Provider>)
     expect(wrapper.find('App').length).toEqual(1)
  });
});

describe('postList reducer', () => {
  let getStore;
    beforeEach(() => {
      const initialState = {};
      getStore = mockStore(initialState);
    });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      status : "IDLE",
      data : [],
      errorMessage : ""
    });
  });


  it('should handle START', () => {
    const startAction = {
      type: actions.CLEAR
    };
    expect(reducer({}, startAction)).toEqual({
      "data": [],
      "status": "IDLE",
    });
  });

  it('should SUCCESS', () => {

    const successAction = {
      type: actions.SUCCESS,  
      data :  {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    };


    expect(reducer({}, successAction)).toEqual(
      {
      "status": "SUCCESS",
        data : {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
    });

  });



  it('Verify API Call', async () => {
    var mock = new MockAdapter(axios);
    const data =  [{
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }];

    mock.onGet(config.APP_URL + config.GET_POST).reply(200, data);

    getStore.dispatch(getPostList());
    await new Promise((r) => setTimeout(r, 2000));
    console.log(getStore.getActions());
    expect(getStore.getActions()).toEqual([{type: actions.LOADING},    
      { type: actions.SUCCESS, data: data }
    ]);
        
});



});




