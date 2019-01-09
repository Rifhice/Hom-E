import React from 'react';
import { Slider } from 'react-native-elements'
import { View } from 'react-native';
import Text from './StyledText'

export default class MySlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: this.props.originalValue }
    }

    render() {
        return this.props.displayValueUnder
            ? <View style={{ ...this.props.style }}>
                <View style={{ flex: 6 }}>
                    <Slider
                        value={this.state.value}
                        minimumValue={this.props.minimumValue}
                        maximumValue={this.props.maximumValue}
                        step={this.props.step}
                        onValueChange={(value) => this.setState({ value }, () => this.props.onChange && typeof this.props.onChange === "function" ? this.props.onChange(value) : "")} />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text>{this.state.value.toFixed(0)}</Text>
                </View>
            </View>
            : <View style={{ ...this.props.style }}>
                <Slider
                    value={this.state.value}
                    minimumValue={this.props.minimumValue}
                    maximumValue={this.props.maximumValue}
                    step={this.props.step}
                    onValueChange={(value) => this.setState({ value }, () => this.props.onChange && typeof this.props.onChange === "function" ? this.props.onChange(value) : "")} />
            </View>
    }

}