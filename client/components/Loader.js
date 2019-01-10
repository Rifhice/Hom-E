import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Text from './StyledText'
import { withNamespaces } from 'react-i18next'
import { withTheme } from '../ThemeProvider'

export default withNamespaces()(withTheme((props) => {
    const sentences = props.t('dataFetching').split('/')
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={props.size ? props.size : "large"} color={props.theme.current['activityIndicator']} />
        <Text>{props.withoutText ? "" : sentences[Math.floor(Math.random() * sentences.length)]}</Text>
    </View>
}))
