import React from 'react';
import { withTheme } from '../ThemeProvider';
import Slider from './Slider';
import Switch from './Switch';

export default withTheme((props) => {
    return props.command.type === "switch"
        ? <Switch
            style={{ flex: 1 }}
            onSwitchColor={props.theme.current["onSwitch"]}
            offSwitchColor={props.theme.current["offSwitch"]}
            onChange={(val) => props.actuator.isConnected ? props.executeOrder(props.deviceId, props.command.key, val, props.actuator._id, props.command._id) : 0}
            isActive={props.command.command_argument.current}
        ></Switch>
        : props.command.type === "slider"
            ? <Slider
                style={{ flex: 1, width: "90%", height: "90%" }}
                theme={props.theme}
                onChange={(val) => props.actuator.isConnected ? props.executeOrder(props.deviceId, props.command.key, val, props.actuator._id, props.command._id) : 0}
                originalValue={props.command.command_argument.current}
                minimumValue={props.command.command_argument.min}
                maximumValue={props.command.command_argument.max}
                step={props.command.command_argument.precision}
                displayValueUnder={false}></Slider>
            : null
})
