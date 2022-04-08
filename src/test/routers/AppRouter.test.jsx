import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';

import { AppRouter } from '../../routers/AppRouter';

describe('Tests in <AppRouter />', () => {
    
    
    test('should to show the login if it is not auth', () => {
        
        const contextValue = {
            user: {
                logged: false,
            },
        };
        const wrapper = mount( 
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        ); 

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');
    });

    test('should to show the login if it is auth', () => {
        const contextValue = {
            user: {
                logged: true,
                name: 'Kevin',
            },
        };
        const wrapper = mount( 
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        ); 
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
    });
});