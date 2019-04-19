//import React from 'react';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../components/logininput';
// describe what we are testing

const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Login Component', () => {

    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
        expect(shallow(<Login />).exists()).toBe(true)
    })
    it('renders a email input', () => {
        expect(shallow(<Login />).find('#Email').length).toEqual(1)
    })
    it('render password input', () => {

        expect(shallow(<Login />).find('#password').length).toEqual(1)

    })

    // within the Login components describe function
    describe('Email input', () => {
  
        it('should respond to change event and change the state of the Login Component', () => {
         
         const wrapper = shallow(<Login />);
         wrapper.find('#Email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
         
        expect(wrapper.state('email')).toEqual('blah@gmail.com');
        })
       })
    describe('Password input', () => {

        it('should respond to change event and change the state of the Login Component', () => {

            const wrapper = shallow(<Login />);
            wrapper.find('#password').simulate('change', { target: { name: 'password', value: 'cats' } });

            expect(wrapper.state('password')).toEqual('cats');
        })
    })

    
})