import React from 'react';
import { Text } from 'react-native-elements'
import { withTheme } from '../ThemeProvider'

export default withTheme((props) => {
  return <Text {...props} style={[props.style, { color: props.theme.current['textColor'] }]} />;
})
