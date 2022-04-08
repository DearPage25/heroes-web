import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"

import { AuthContext } from "../../auth/authContext"
import { PrivateRoute } from "../../routers/PrivateRoute"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Exiting of here</span>
}))

describe('Test in <PrivateRoute />', () => { 
    Storage.prototype.setItem = jest.fn();
    test('should show the component if to be auth and save in the localStorage', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'kevin'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text().trim()).toBe('Private Component');

        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/')
    });

    test('should be block the component if not logger', () => {
        
        const contextValue = {
            user: {
                logged: false,
                name: 'kevin'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text().trim()).toBe('Exiting of here');
    })
 })