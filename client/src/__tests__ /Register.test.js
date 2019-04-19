import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Register from '../components/registerinput';


const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Registration Component', () => {

    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
        expect(shallow(< Register />).exists()).toBe(true)
    })
    it('renders a firstname input', () => {
        expect(shallow(< Register />).find('#outlined-dense').length).toEqual(1)
    })
    it('render lastname input', () => {

        expect(shallow(< Register/>).find('#outlined-dense1').length).toEqual(1)

    })
    it('render Email input', () => {

        expect(shallow(< Register/>).find('#outlined-dense2').length).toEqual(1)

    })
    
    it('render password input', () => {

        expect(shallow(<Register />).find('#outlined-dense3').length).toEqual(1)

    })
    it('render conformpassword input', () => {

        expect(shallow(<Register />).find('#outlined-dense4').length).toEqual(1)

    })





   
    describe('Firstname input', () => {
  
        it('should respond to change event and change the state of the Register Component', () => {
         
         const wrapper = shallow(<Register />);
         wrapper.find('#outlined-dense').simulate('change', {target: {name: 'firstname', value: 'sivasakthi'}});
         
        expect(wrapper.state('firstname')).toEqual('sivasakthi');
        })
       })
    describe('Password input', () => {

        it('should respond to change event and change the state of the Register Component', () => {

            const wrapper = shallow(<Register />);
            wrapper.find('#outlined-dense1').simulate('change', { target: { name: 'lastname', value: 'sivasakthi' } });

            expect(wrapper.state('lastname')).toEqual('sivasakthi');
        })
    })
    describe('Email input', () => {
  
        it('should respond to change event and change the state of the Register Component', () => {
         
         const wrapper = shallow(<Register/>);
         wrapper.find('#outlined-dense2').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
         
        expect(wrapper.state('email')).toEqual('blah@gmail.com');
        })
       })

       describe('Password input', () => {

        it('should respond to change event and change the state of the Register Component', () => {

            const wrapper = shallow(<Register />);
            wrapper.find('#outlined-dense3').simulate('change', { target: { name: 'password', value: 'cats' } });

            expect(wrapper.state('password')).toEqual('cats');
        })
    })
    describe('conform Password input', () => {

        it('should respond to change event and change the state of the Register Component', () => {

            const wrapper = shallow(<Register />);
            wrapper.find('#outlined-dense4').simulate('change', { target: { name:'conformpassword', value: '12345678' } });

            expect(wrapper.state('password1')).toEqual('12345678');
        })
    })
    


})