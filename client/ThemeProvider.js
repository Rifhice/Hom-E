import React from 'react';

const themes = require('./constants/Colors.json')

const ThemeContext = React.createContext({
    theme: themes.regular,
    changeTheme: () => { },
});

export const withTheme = (Component) => {
    return (props) => <ThemeContext.Consumer {...props}>
        {({ theme, changeTheme }) => (
            <Component {...props} theme={{ current: theme, changeTheme }} ></Component>
        )}
    </ThemeContext.Consumer>
}

export const withChangeTheme = (Component) => {
    return (props) => <ThemeContext.Consumer {...props}>
        {({ theme, changeTheme }) => {
            return <Component {...props} changeTheme={(theme) => changeTheme(theme)} ></Component>
        }}
    </ThemeContext.Consumer>
}

export class ThemeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.changeTheme = (theme) => {
            this.setState({
                theme:
                    themes[theme]
                        ? themes[theme]
                        : state.theme
            });
        };
        this.state = {
            theme: themes.regular,
            changeTheme: this.changeTheme,
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