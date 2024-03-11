import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export default class Authentication {
    static privateKey() {
        return process.env.JWT_SECRET
    }

    static generateAuthToken(user) {
        const authToken = jwt.sign(
            { data: JSON.stringify(user) },
            this.privateKey(),
            {
                expiresIn: '30d',
                algorithm: 'HS256',
            }
        )
        return authToken
    }

    static extractUser(authToken) {
        // sent by frontend as 'Bearer <token>'
        if (authToken.startsWith('Bearer ')) {
            const splitToken = authToken.split(' ')
            try{
                const decoded = jwt.verify(splitToken[1], this.privateKey())
                console.log(decoded)
                return JSON.parse(decoded.data)
            } catch(error) {
                if (error instanceof jwt.TokenExpiredError) {
                    return 'Token Expired'
                } else {
                    return 'Incorrect Token'
                }
            }
        }
        return 'Authorization header was not Bearer'
    }
}
