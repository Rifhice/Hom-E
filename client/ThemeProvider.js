import React from 'react';

const themes = require('./constants/Colors.json')
const availableTheme = Object.keys(themes)

const ThemeContext = React.createContext({
    theme: themes.regular,
    changeTheme: () => { },
    availableTheme,
    selected: "regular"
});

export const withTheme = (Component) => {
    return (props) => <ThemeContext.Consumer {...props}>
        {({ theme, changeTheme, availableTheme, selected }) => (
            <Component {...props} theme={{ current: theme, availableTheme, selected }} ></Component>
        )}
    </ThemeContext.Consumer>
}

export const withChangeTheme = (Component) => {
    return (props) => <ThemeContext.Consumer {...props}>
        {({ theme, changeTheme, available_theme }) => {
            return <Component {...props} changeTheme={(theme, callback) => changeTheme(theme, callback)} ></Component>
        }}
    </ThemeContext.Consumer>
}

export class ThemeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.changeTheme = (theme, callback) => {
            console.log(callback)
            this.setState({
                theme: themes[theme]
                    ? themes[theme]
                    : state.theme,
                selected: themes[theme]
                    ? theme
                    : state.selected,
            }, () => callback ? callback() : 0);
        };
        this.state = {
            theme: themes.regular,
            changeTheme: this.changeTheme,
            availableTheme: Object.keys(themes),
            selected: "regular"
        };
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}