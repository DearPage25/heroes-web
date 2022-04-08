import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('Tests in <DashboardRoutes />', () => {
    const contextValue = {
        user: {
            logged: true,
            name: 'kevin'
        }
    }
    // test('should to shower correctly', () => {
    //     const wrapper = mount(
    //         <AuthContext.Provider value={contextValue}>
    //             <MemoryRouter>
    //                 <DashboardRoutes />
    //             </MemoryRouter>
    //         </AuthContext.Provider>
    //     );
    //     // console.log(wrapper.html())
    //     expect(wrapper).toMatchSnapshot();
    //     expect(wrapper.find('.text-info').text().trim()).toBe('kevin')
    // });

    test('should to shower Marvel', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/"]}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // console.log(wrapper.html())
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen')
    });

    test('should to shower DC', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/dc"]}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // console.log(wrapper.html())
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('DCScreen')
    });
});