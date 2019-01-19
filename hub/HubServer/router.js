class Router {
    constructor() { this.routes = [] }
    add(method, route, fn) {
        this.routes.push({ route, fn, method })
    }
    use() {

    }
}

let router = new Router()
module.exports = router