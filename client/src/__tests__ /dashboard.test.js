import React from 'react';
import { shallow, mount, render } from 'enzyme';
import DashBoard from '../components/dashboardinput';
// describe what we are testing

const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('DashBoard Component', () => {

    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
        expect(shallow(<DashBoard />).exists()).toBe(true)
    })
    it('renders a email input', () => {
        expect(shallow(<DashBoard />).find('#searchFields').length).toEqual(1)
    })
    // it('render password input', () => {

    //     expect(shallow(<DashBoard />).find('#password').length).toEqual(1)

    // })

    // within the Login components describe function
    describe('search field input', () => {
  
        it('should respond to change event and change the state of the searchfield Component', () => {
         
         const wrapper = shallow(<DashBoard />);
         wrapper.find('#searchFields').simulate('change', {target: {name: 'search', value: 'hai'}});
         
        expect(wrapper.state('search')).toEqual('hai');
        })
       })
    // describe('Password input', () => {

    //     it('should respond to change event and change the state of the Login Component', () => {

    //         const wrapper = shallow(<DashBoard />);
    //         wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'cats' } });

    //         expect(wrapper.state('password')).toEqual('cats');
    //     })
    // })

    
})