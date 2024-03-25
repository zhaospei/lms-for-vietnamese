import Authentication from './authentication.js'

export const auth = (req, res, next) => {
    try {
        const authToken = req.get('Authorization')
        // console.log(authToken)
        // const authToken = req.cookies.authToken;
        // console.log(authToken)
        if (!authToken) {
            res.status(400).json({
                error: 'Auth token not provided',
            })
            return
        } else {
            const decodedUser = Authentication.extractUser(authToken)
            // console.log({decodedUser})
            if (decodedUser === 'Token Expired') {
                res.status(401).json({
                    error: 'Auth token expired',
                })
                return
            } else if (decodedUser === 'Incorrect Token') {
                res.status(401).json({
                    error: 'Incorrect auth token',
                })
                return
            } if (decodedUser === 'Authorization header was not Bearer') {
                res.status(401).json({
                    error: 'Bearer auth token not provided',
                })
                return
            } else if (!decodedUser?.Id) {
                res.status(401).json({
                    error: 'Invalid auth token',
                })
                return
            }
            res.locals.decodedUser = decodedUser
            next()
        }
    } catch (e) {
        res.status(401).json({
            error: 'Invalid request!',
        })
        return
    }
}
