export default (originalString, ...params) => {
    if ((originalString.match(/%s/g) || []).length !== params.length)
        return originalString
    params.forEach(param => originalString = originalString.replace('%s', param))
    return originalString
}