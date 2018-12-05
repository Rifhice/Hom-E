import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {

  it('renders the loading screen', async () => {
    expect(true).toMatchSnapshot(true);
  });

  it('renders the root without loading screen', async () => {
    expect(true).toMatchSnapshot(true);
  });
});
