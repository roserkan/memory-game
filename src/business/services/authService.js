const UserDal = require('../../dataAccess/userDal');
const { successResult, errorResult } = require('../../core/results/results');
const hashing = require('../../core/security/hashing')
const { generateJwtToken, verifyJwtToken } = require('../../core/jwt/jwt')

class AuthService {
    constructor() {
        this.userDal = new UserDal();
    }

    async login(object) {
        const users = await this.userDal.getAll();
        const user = users.filter(user => user.username === object.username)[0];

        if(!user) return errorResult("Kullanıcı bulunamadı")
        if(user.password != hashing(object.password)) return errorResult("Kullanıcı bulunamadı")

        const token = await generateJwtToken(user.id, user.username, user.claim)
        const result = {
            data: user,
            message: 'Success',
            status: 200,
            token: token
        }

        return result;
    }



}

module.exports = AuthService;