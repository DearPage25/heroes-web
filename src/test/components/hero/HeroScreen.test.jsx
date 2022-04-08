import { mount } from "enzyme"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { HeroScreen } from "../../../components/hero/HeroScreen";


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Test in <HeroScreen />', () => {
    
    test('Dont should show HeroScreen if there isnt hero in the URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
    })
    test('Should show a hero if the param exist and if to find', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('Should to back a the screen previous', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="hero/:heroId" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( mockNavigate ).toHaveBeenCalledWith(-1)
    });

    test('Should show the <No HeroPage> if have not  hero', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider12312312313']}>
                <Routes>
                    <Route path="hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.text().trim()).toBe('No Hero Page')
    });
});