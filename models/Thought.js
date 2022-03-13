const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Fill in the text to submit!'],
            minlength: [1, 'Must be between 1 - 280 Characters!'],
            maxlength: [280, 'Must be between 1 - 280 Characters!']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        userName: {
            type: String,
            required: [true, 'Username is required!']
        },
        reactions: [
            {
                reactionId: {
                    type: ObjectId,
                    default: new ObjectId
                },
                reactionBody: {
                    type: String,
                    required: true,
                    maxlength: [280, 'Max length is 280 Characters!']
                },
                userName: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    defaults: Date.now,
                    get: createdAtVal => dateFormat(createdAtVal)
                }
            }
        ] 

    }
)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
