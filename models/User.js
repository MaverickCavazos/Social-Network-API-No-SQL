const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: [true, 'Username is Required!']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is Required!'],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
        }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)

const User = model('User', UserSchema);

module.exports = User;
