class Router {
    constructor() { this.routes = [] }
    add(method, route, fn) {
        this.routes.push({ route, fn, method })
    }
    use() {

    }
}

router = new Router()
module.exports = router