const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username should be at least five characters long!!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be at least ten characters long!!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least four characters long!!']
    }
})

userSchema.pre('save', async function () {
    try {
        console.log(this.password);
        const hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
    } catch (err) {
        console.log(err);
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;