import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PublishSpaceArea from './PublishSpaceArea'

const mockStore = configureStore()


describe("Test Publish Space Area",() => {
  it("Render Dimensions Form",()=> {
    const store = mockStore({
      publishAreaReducer:{
        viewingForm: 1
      }
    })
    const { getByTestId } = render(<Provider store={store}>
      <PublishSpaceArea></PublishSpaceArea>
    </Provider>)
    expect(getByTestId('dimensions-form')).toBeTruthy()
    

  })
})