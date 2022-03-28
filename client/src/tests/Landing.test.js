import React from "react";
import { Link } from "react-router-dom";
import {configure, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import Landing from "../components/Landing/Landing";



configure({ adapter: new Adapter() });

describe("<Landing />", () => {
    let landing;
    
    beforeEach(() => {
        landing = shallow(<Landing />);
        expect(isReact.classComponent(Landing)).toBeFalsy();
    });

    it('Debería renderizar un <Link to="" />. que vaya a "/home"', () => {
      expect(landing.find(Link).length).toBeGreaterThanOrEqual(1);
      
    });

    it('Debería renderizar un <h1>', () => {
      expect(landing.find("h1").length).toBeGreaterThanOrEqual(1);
    });

    it('Debería renderizar un <h3>', () => {
      expect(landing.find("h3").length).toBeGreaterThanOrEqual(1);
    });

    it('Debería renderizar un <button>', () => {
      expect(landing.find("button").length).toBeGreaterThanOrEqual(1);
    });

    it('Debería renderizar dos <div>', () => {
      expect(landing.find("div")).toHaveLength(2);
    });
  
});