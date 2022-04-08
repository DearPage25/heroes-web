import { authReducer } from '../../auth/authReduer'
import { types } from '../../types/types'
describe('Test in authReducer', () => {
    
    test('should return the state for default', () => { 
        const state = authReducer({ logged: false }, {})
        expect(state).toEqual({ logged: false})
    })

    test('should auth and put the name of the user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Odalmi',
            }
        }
        const state = authReducer({ logged: false }, action);
        
        expect(state).toEqual({
            logged: true,
            name: 'Odalmi'
        })
    });

    test('should delete the name of the user and logged in false', () => {
        const action = {
            type: types.logout,
        };
        const state = authReducer({ logged: true, name: 'odalmi' }, action);
        expect(state).toEqual({ logged: false })
    });
    
});