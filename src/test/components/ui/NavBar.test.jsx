import { mount } from "enzyme"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { AuthContext } from "../../../auth/authContext"
import { NavBar } from "../../../components/ui/NavBar"
import { types } from "../../../types/types";
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))
describe('Test in  <NavBar />',() => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'kevin'
        }
        
        
    }
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element= {<NavBar/>}/>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    test('should correctly', () => {
       
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('kevin')
    });

    test('should logout the user', () => {
       
        wrapper.find('button').prop('onClick')();
        

        expect(contextValue.dispatch).toHaveBeenCalledWith({type: types.logout});
        expect(mockNavigate).toBeCalledWith('/login',{replace:true})
    });

})