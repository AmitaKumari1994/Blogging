const {verifyToken} = require( '../services/authentication')

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        console.log(`Token cookie value: ${tokenCookieValue}`)
        if (!tokenCookieValue) {

            console.log('No token cookie found');
            return next();
        }

        else{
            try {
                console.log("attempt to validate try....")
                const userPayload = verifyToken(tokenCookieValue);
                console.log(`User payload: ${JSON.stringify(userPayload)}`);
                req.user = userPayload;
                // return req.user
            } catch (error) { }
    

        }

       
        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
