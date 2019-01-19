import React from 'react';
import { View } from 'react-native';
import { withTheme } from '../ThemeProvider';
import Text from './StyledText';

export default withTheme((props) => {
    return <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", marginBottom: 5, marginLeft: 5 }}>
            <View style={{ flex: 2 }}>
                <Text h4>{props.env_var.name}</Text>
                <Text style={{ color: props.theme.current["grey"] }}>{props.env_var.description}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>{props.env_var.value.current}</Text>
            </View>
        </View>
    </View>
})
