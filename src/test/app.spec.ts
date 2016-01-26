import { it, describe, expect } from 'angular2/testing';

import {AppComponent, Hero} from '../app/app';

describe('App', () => {

    it('should select hero', () => {
        var hero = new Hero(1, 'Test');
        var app = new AppComponent();
        app.onSelect(hero);
        expect(app.isSelected(hero)).toBe(true);
    });
});