import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('Tests in <SearchScreen />', () => {

    test('should be return the correctly component', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe("Search a Hero");
    });
    test('should to show the batman', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find("input").prop("value")).toBe("batman");
        expect(wrapper).toMatchSnapshot();
    });
    test('should to show the error result', () => {
        const query = 'batman123'

        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${query}`]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find(".alert-danger").text().trim()).toBe(`There aren't result: ${query}`);
        expect(wrapper).toMatchSnapshot();
    });
    test('should to call navigate in the other screen', () => { 
        const value = 'batman';

        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search`]}>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: `${value}`
            }
        });
        wrapper.find('form').prop('onSubmit')({
            preventDefault() { },
        });
        expect(mockNavigate).toHaveBeenCalledWith(`?q=${value}`)
    })


});