const router = require('../router')

module.exports = request => {
    return new Promise((resolve, reject) => {
        const requestRoute = request.originalUrl.split('/')
        for (let route of router.routes) {
            splittedRoute = route.route.split('/')
            if (splittedRoute.length === requestRoute.length) {
                let isOneInvalid = splittedRoute.some((element, i) => !((element[0] === ":" && requestRoute[i] !== undefined) || element === requestRoute[i]))
                if (!isOneInvalid && route.method === request.method)
                    resolve(route.fn(request))
            }
        }
        resolve({ code: 501, message: `${request.method} of ${request.originalUrl} not implemented by device` })
    })
}