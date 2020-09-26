import React from "react"
import { render, fireEvent, cleanup } from '@testing-library/react'
import SpecificSpaceView from "./specificSpaceView"
import { spaces } from "../../mock.js/mock"
import moxios from "moxios"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import 'react-dates/initialize';
import { ACTIONS } from "../../reducers/publishAreaReducer"


const mockStore = configureStore()

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/Space?_id=5f57c865a5e4884704ed6ce1&startDate=2020-09-16&endDate=2020-09-17",
      search:"?_id=5f57c865a5e4884704ed6ce1&startDate=2020-09-16&endDate=2020-09-17"
    })
  }));

describe("Especific Space View", () => {
    beforeEach(()=>{
        moxios.install()
        cleanup()
    })
    
    afterEach(() => {
        moxios.uninstall()
        cleanup()
    })

    const spaceId = "5f57c865a5e4884704ed6ce1"
    it("should dispatch the photos of the space to be render", () => {
        const store = mockStore({
            publishAreaReducer:{
                photos: []
            }
        })
        const { getAllByTestId } = render(
            <Provider store={store}>
                <SpecificSpaceView
                    spaces = {spaces}
                    spaceId = {spaceId}
                    edit
                    changeViewToDisplay = {jest.fn()}
                    ></SpecificSpaceView>
            </Provider>
        )
        const { getActions } = store
        const actions = getActions()
        expect(actions[0].type).toBe(ACTIONS.CHANGE_PHOTOS)

    })

    it("should allow the user to edit when edit mode is on", () => {
        const store = mockStore({
            publishAreaReducer:{
                photos: []
            }
        })
        const { getAllByTestId } = render(
            <Provider store={store}>
                <SpecificSpaceView
                    spaces = {spaces}
                    spaceId = {spaceId}
                    edit
                    changeViewToDisplay = {jest.fn()}
                ></SpecificSpaceView>
            </Provider>
        )
        const editButtons = getAllByTestId(/edit/i)
        expect(editButtons).toHaveLength(3)
    })

    it("should allow the user to reserve a space when edit mode is off", () => {
        const store = mockStore({
            publishAreaReducer:{
                photos: []
            }
        })
        const { getAllByTestId } = render(
            <Provider store={store}>
                    <SpecificSpaceView
                        spaces = {spaces}
                        spaceId = {spaceId}
                        edit={false}
                        changeViewToDisplay = {jest.fn()}
                    ></SpecificSpaceView>
            </Provider>
        )
        const ReserveButtons = getAllByTestId("edit-ModeOff")
        expect(ReserveButtons).toHaveLength(2)
    })
})