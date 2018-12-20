import actions from '../actions/actuator.actions'

const defaultState = {
    all: [
        {
            "_id": "00000",
            "name": "Living room",
            "description": "Living room's lights",
            "category": "Lights",
            "quick_command": {
                "_id": "000002",
                "name": "Set light",
                "type": "slider",
                "key": "set",
                "description": "....",
                "command_argument": { "type": "discrete", "possible_values": ["on", "off"] }
            },
            "commands": [
                {
                    "_id": "000002",
                    "name": "Set light",
                    "type": "slider",
                    "key": "set",
                    "description": "....",
                    "command_argument": { "type": "discrete", "possible_values": ["on", "off"] }
                }
            ],
            "communication": {
                "protocol": "internet",
                "ip": "192.168.16.10",
                "port": "1000"
            }
        },
        {
            "_id": "00001",
            "name": "Bedroom",
            "description": "Bedroom's lights",
            "quick_command": {
                "_id": "000002",
                "name": "Set light",
                "type": "switch",
                "key": "set",
                "description": "....",
                "command_argument": { "type": "discrete", "possible_values": ["on", "off"] }
            },
            "commands": [
                {
                    "_id": "000003",
                    "name": "Set light",
                    "type": "switch",
                    "key": "set",
                    "description": "....",
                    "command_argument": { "type": "discrete", "possible_values": ["on", "off"] }
                }
            ],
            "communication": {
                "protocol": "internet",
                "ip": "192.168.16.10",
                "port": "1000"
            }
        }
    ]
};

export default (state = defaultState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case actions.FETCHED_ACTUATORS:
            return {
                all: action.payload
            }
        case actions.REGISTERED_ACTUATOR:
            return {
                all: [...state.all, action.payload.actuator]
            }
        case actions.UPDATE_ACTUATOR_ISCONNECTED:
            return {
                all: state.all.map(actuator => actuator._id === action.payload._id ? { ...actuator, isConnected: action.payload.isConnected } : actuator)
            }
        case actions.UPDATE_COMMAND_VALUE:
            return {
                all: state.all.map(actuator => ({ ...actuator, quick_command: actuator.quick_command._id === action.payload._id ? { ...actuator.quick_command, command_argument: { ...actuator.quick_command.command_argument, current: action.payload.newValue } } : quick_command, commands: actuator.commands.map(command => command._id === action.payload._id ? { ...command, command_argument: { ...command.command_argument, current: action.payload.newValue } } : command) }))
            }
        default:
            return state
    }
}