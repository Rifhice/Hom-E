const readline = require('readline');
const storage = require('node-persist');

const main = async () => {
    await storage.init()
    if (!await storage.getItem('isInitialyze')) {
        console.log("Initialyzing persistance !")
        await storage.setItem('isInitialyze', true)
        await storage.setItem('isRegistered', false)
    }

    let isRegistered = !(await storage.getItem('actuatorId') == undefined)
    let actuator_mac = "5c1a9c4598f0664ecc30bdbc"

    connectOrRegister = async () => {
        if (!isRegistered) {
            const registeringInterval = setInterval(() => {
                !isRegistered
                    ? console.log('Registering...') || socket.emit("registration", { mac_id: actuator_mac })
                    : clearInterval(registeringInterval)
            }
                , 10000)
        }
        else {
            console.log('Connecting...')
            let actuatorId = await storage.getItem('actuatorId')
            socket.emit('actuator_connect', { _id: actuatorId })
        }
    }

    const socket = require('socket.io-client')('http://localhost:1666');
    socket.on('connect', async () => {
        console.log(`Connected to the actuator server !`)
        await connectOrRegister()
    });

    socket.on('actuator_connected', async () => {
        console.log(`Successfully authenticate to the hub !`)
    });

    socket.on('order', order => {
        console.log(`Order received : ${order}`)
    })

    socket.on('registered', async data => {
        console.log(`Successfully registered to the hub !`)
        await storage.setItem('actuatorId', data.actuatorId)
        await storage.setItem('isRegistered', true)
        data.commands.forEach(async value => {
            await storage.setItem(value.name, value._id)
        })
        isRegistered = true
        await connectOrRegister()
    })

    socket.on('err', async data => {
        console.log(data)
        if (data.type === "NOT_REGISTERED") {
            isRegistered = false
            await storage.clear()
            process.exit(0)
        }
    })

    socket.on('disconnect', () => { console.log("It seems the hub disconnected or crashed !") });
}
main()