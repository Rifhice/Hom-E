const readline = require('readline');
const storage = require('node-persist');

const main = async () => {
    await storage.init()
    if (!await storage.getItem('isInitialyze')) {
        console.log("Initialyzing persistance !")
        await storage.setItem('isInitialyze', true)
        await storage.setItem('isRegistered', false)
    }

    let currentValue = ''
    let isRegistered = !(await storage.getItem('sensorId') == undefined)
    let sensor_mac = "5c17-d2b9-192f-9f64-f483-64e9"

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const recursivelyReadValue = () => {
        rl.question(`What is the new sensor value (current : ${currentValue})? `, async (answer) => {
            if (answer === "true" || answer === "false") {
                currentValue = answer
                const env_var_id = await storage.getItem('Presence')
                env_var_id ? socket.emit('update', { _id: env_var_id, newValue: answer }) : console.log("No presence variable id found !")
            }
            else {
                console.log(`Invalid input [true|false] !`)
            }
            recursivelyReadValue()
        })
    }

    connectOrRegister = async () => {
        if (!isRegistered) {
            const registeringInterval = setInterval(() => {
                !isRegistered
                    ? console.log('Registering...') || socket.emit("registration", { mac_id: sensor_mac })
                    : clearInterval(registeringInterval)
            }
                , 10000)
        }
        else {
            console.log('Connecting...')
            let sensorId = await storage.getItem('sensorId')
            socket.emit('sensor_connect', { _id: sensorId })
        }
    }

    const socket = require('socket.io-client')('http://localhost:1555');
    socket.on('connect', async () => {
        console.log(`Connected to the sensor server !`)
        await connectOrRegister()
    });

    socket.on('sensor_connected', async () => {
        console.log(`Successfully authenticate to the hub !`)
        recursivelyReadValue()
    });

    socket.on('registered', async data => {
        console.log(`Successfully registered to the hub !`)
        await storage.setItem('sensorId', data.sensorId)
        await storage.setItem('isRegistered', true)
        data.environment_variables.forEach(async value => {
            await storage.setItem(value.name, value._id)
        })
        isRegistered = true
        await connectOrRegister()
    })

    socket.on('err', async data => {
        console.log(data)
        if (data.type === "NOT_REGISTERED") {
            isRegistered = false
            await connectOrRegister()
        }
    })

    socket.on('disconnect', () => { console.log("It seems the hub disconnected or crashed !") });
}
main()