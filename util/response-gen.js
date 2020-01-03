
/**
 * 
 * @param {string} msg 
 * @param {number} code
 * @param {string} redirect 
 * @param {boolean} refresh
 */
let responseGen = function (msg, code=200, redirect = undefined, refresh = false) {
    response = {};
    response['msg'] = msg;
    response['code'] = code;
    response['redirect'] = redirect;
    response['refresh'] = refresh;
    return response;
}

module.exports = responseGen;