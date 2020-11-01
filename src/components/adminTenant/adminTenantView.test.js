import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import AdminTenantView from "./adminTenantView";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history"


describe("U-adminTenantView", () => {
    afterEach(cleanup)
    test('render options buttons', () => {
        const { getAllByTestId } = render(<AdminTenantView></AdminTenantView>)
        const buttons = getAllByTestId('lender_admin-button')
        expect(buttons).toHaveLength(4)
    })
    test('send user to profile when profile button is clicked', () =>{
        const history = createMemoryHistory()
        const { getByText } = render(
        <Router history={history}>
            <AdminTenantView></AdminTenantView>
        </Router>
        )
        const profileButton = getByText(/personal information/i)
        fireEvent.click(profileButton)
        expect(history.location.pathname).toBe("/user/profile")
    })

})