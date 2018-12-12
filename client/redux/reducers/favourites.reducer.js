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
                "command_arguments": [
                    { "type": "discrete", "possible_values": ["on", "off"] }
                ]
            },
            "commands": [
                {
                    "_id": "000002",
                    "name": "Set light",
                    "type": "slider",
                    "key": "set",
                    "description": "....",
                    "command_arguments": [
                        { "type": "discrete", "possible_values": ["on", "off"] }
                    ]
                },
                {
                    "_id": "000003",
                    "name": "Set light",
                    "type": "switch",
                    "key": "set",
                    "description": "....",
                    "command_arguments": [
                        { "type": "discrete", "possible_values": ["on", "off"] }
                    ]
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
                "command_arguments": [
                    { "type": "discrete", "possible_values": ["on", "off"] }
                ]
            },
            "commands": [
                {
                    "_id": "000003",
                    "name": "Set light",
                    "type": "switch",
                    "key": "set",
                    "description": "....",
                    "command_arguments": [
                        { "type": "discrete", "possible_values": ["on", "off"] }
                    ]
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
    console.log(action)
    switch (action.type) {
        default:
            return state
    }
}