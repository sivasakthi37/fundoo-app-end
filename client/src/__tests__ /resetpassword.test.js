import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Resetpassword from '../components/resetpasswordinput';
// describe what we are testing

const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });


it('render password input', () => {

    expect(shallow(<Resetpassword  />).find('#outlined-dense3').length).toEqual(1)

})
it('render conformpassword input', () => {

    expect(shallow(<Resetpassword  />).find('#outlined-dense4').length).toEqual(1)

})


describe('Password input', () => {

    it('should respond to change event and change the state of the Resetpassword Component', () => {

        const wrapper = shallow(<Resetpassword />);
        wrapper.find('#outlined-dense3').simulate('change', { target: { name: 'password', value: 'cats' } });

        expect(wrapper.state('password')).toEqual('cats');
    })
})
describe('conform Password input', () => {

    it('should respond to change event and change the state of the Resetpassword Component', () => {

        const wrapper = shallow(<Resetpassword />);
        wrapper.find('#outlined-dense4').simulate('change', { target: { name:'conformpassword', value: '12345678' } });

        expect(wrapper.state('password1')).toEqual('12345678');
    })
})