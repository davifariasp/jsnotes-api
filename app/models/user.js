const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
})

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')){
        //outro método
        try {
            //console.log(this.password)
            const hashedPassword = await bcrypt.hash(this.password, 8)
            this.password = hashedPassword
            //console.log(this.password)
            next()
        } catch (error) {         
            next(error)
        }

        //método da video aula
        // await bcrypt.hash(this.password, 8, function (err, hashedPassword){
        //         if (err) {
        //             next(err)
        //         } else {
        //             this.password = hashedPassword
        //             next()
        //         }
        // })
    }
})

userSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function(err, same){
        if (err){
            callback(err)
        } else {
            callback(err, same)
        }
    })
}

module.exports = mongoose.model('User', userSchema)