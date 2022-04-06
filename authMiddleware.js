const jwt = require("jsonwebtoken");

const APP_SECRET = "appsecret";
const USER_NAME = "admin";
const PASSWORD = "password";

const mappings = {
    get: ["/api/orders", "/orders"],
    post: ["/api/products", "/products", "/api/categories", "/categories"]
}

var requiresAuth = (method, url) => 
    (mappings[method.toLowerCase()] || []).find(p => url.startsWith(p)) !== undefined;

module.exports = function(request, response, next){
    if (request.url.endsWith("/login") && request.method == "POST"){
        if (request.body && request.body.name == USER_NAME && request.body.password == PASSWORD){
            let token = jwt.sign({data: USER_NAME, expiresIn: "1h"}, APP_SECRET);
            response.json({success: true, token: true});
        } else{
            response.json({success: false});
        }

        response.end();
        return;
    } else if (requiresAuth(request.method, request.url)){
        let token = request.headers["authorisation"] || "";

        if (token.startsWith("Bearer<")){
            token = token.substring(7, token.length - 1);

            try{
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch(err) { }
        }

        response.statusCode = 401;
        response.end();
        return;    
    }

    next();
}