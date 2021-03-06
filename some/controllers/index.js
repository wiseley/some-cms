function Controllers(app) {
    
    var utils = app.some.utils;
    
    // define API controllers
    var controllers = {};
    var ControllerClasses = {
        'page': require('./page'),
        'node': require('./node'),
        'test': require('./test')
    };
    
    // add custom controllers
    var custom_api_controllers = app.config.custom_api_controllers;
    for (var name in custom_api_controllers) {
        ControllerClasses[name] = custom_api_controllers[name];
    }
    
    // instantiate API controllers
    for (name in ControllerClasses) {
        controllers[name] = new ControllerClasses[name](app);
    }
    
    // front-end request controller
    var FrontController = require('./front');
    var front_controller = new FrontController(app);

    // direct /some/:section/:action to the approriate controller and method 
    this.route_api = function(req, res, next) {
        var section = req.params.section;
        var action = req.params.action;
        if (!action) action = 'index';
        var controller = controllers[section];
        if (typeof controller == 'undefined') {
            res.send(404, utils.error("Unmapped API section '" + section + "'"));
            return;
        }
        if (typeof controller[action]=='undefined') {
            res.send(404, utils.error("Unmapped API action: '" + section + '/' + action + "'"));
            return;
        } else {
            controller[action](req, res, next);
        }
    };
    
    // front-end content requests
    this.front = function(req, res, next) {
        front_controller.display(req, res, next);        
    };
    
}
module.exports = Controllers;
