import jwt, { JwtPayload } from 'jsonwebtoken'

export const createToken = (content: string | object): string => {
    return jwt.sign(content, process.env.ACCESS_JWT_SECRET!!, {
        expiresIn: '1y',
    })
}

export const parseAndVerifyJWT = (token: string): JwtPayload | null => {
    const tokenParts = token.split(' ')[1]
    if (!tokenParts) {
        return null
    }
    try {
        return jwt.verify(
            tokenParts,
            process.env.ACCESS_JWT_SECRET!!
        ) as JwtPayload
    } catch (err) {
        console.log(err)
        return null
    }
}
