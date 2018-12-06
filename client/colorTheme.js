import Colors from './constants/Colors'
import React from 'react';
export const withColors = (Component) => (props) => (<Component {...props} c={Colors.c} theme={Colors.theme} />)

export const withThemeChanger = (Component) => (props) => (<Component {...props} setTheme={Colors.setTheme} />)