const tintColor = '#2fdc6f';

const colors = {
  "regular": {
    tintColor,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
    headerBackgroundDefault: tintColor,
    headerTextBackground: "#fff",
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff'
  },
  "dark": {
    tintColor: "yellow",
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
    headerBackgroundDefault: 'red',
    headerTextBackground: "black",
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff'
  }
}

let theme = {
  current: "regular"
}

getColors = (color) => colors[theme.current][color]

export default {
  c: getColors,
  theme
}