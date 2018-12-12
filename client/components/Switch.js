import { Switch } from 'react-native-switch';
import { View, Text } from 'react-native';
import React from 'react';

export default class MySwitch extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isActive: true }
    }

    render() {
        return <View style={{ ...this.props.style }}>
            <Switch
                value={this.state.isActive}
                onValueChange={(val) => { this.setState({ isActive: val }, () => this.props.onChange && typeof this.props.onChange === "function" ? this.props.onChange(val) : "") }}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                circleSize={30}
                barHeight={1}
                circleBorderWidth={3}
                backgroundActive={'green'}
                backgroundInactive={'gray'}
                circleActiveColor={'#30a566'}
                circleInActiveColor={'#000000'}
                innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
            />
        </View>
    }

}
