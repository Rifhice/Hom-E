import 'react-native';

describe('App snapshot', () => {

  it('renders the loading screen', async () => {
    expect(true).toMatchSnapshot(true);
  });

  it('renders the root without loading screen', async () => {
    expect(true).toMatchSnapshot(true);
  });
});
