import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, max: 100},
    password: {type: String , require: true}
});

const usuario =  mongoose.model('usuarios', UserSchema)

module.exports = { usuario };