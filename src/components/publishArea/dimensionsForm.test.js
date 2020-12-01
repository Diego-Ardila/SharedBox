import React from 'react';
import DimensionsForm from './dimensionsForm';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ACTIONS } from "../../reducers/publishAreaReducer"


const mockStore = configureStore()


describe("Test dimensions form",() => {
  it('Form returns and dispatches expected values with correct values', async() => {
    const store = mockStore({
      publishAreaReducer:{
        width:0,
        length:0,
        height:0
      }
    })
    const { container } = render(<Provider store={store}>
        <DimensionsForm />
      </Provider>
    );
    const height = container.querySelector('input[name="height"]') 
    const length = container.querySelector('input[name="length"]')
    const width = container.querySelector('input[name="width"]') 
    const submit = container.querySelector('button[type="submit"')
    await waitFor(() => {
      fireEvent.change(height,{
        target: {
          value: 5
        }
      })
      fireEvent.change(length,{
        target: {
          value: 5
        }
      })
      fireEvent.change(width,{
        target: {
          value: 5
        }
      })
      fireEvent.click(submit)
    })

    expect(height.value).toBe("5")     
    expect(length.value).toBe("5")
    expect(width.value).toBe("5")
    const { getActions } = store
    const actions = getActions()
    expect(actions[0].type).toBe(ACTIONS.CHANGE_AREA)
    expect(actions[1].type).toBe(ACTIONS.CHANGE_WIDTH)
    expect(actions[2].type).toBe(ACTIONS.CHANGE_HEIGHT)
    expect(actions[3].type).toBe(ACTIONS.CHANGE_LENGTH)
    expect(actions[4].type).toBe(ACTIONS.CHANGE_VIEWING_FORM)    
    
  })
})