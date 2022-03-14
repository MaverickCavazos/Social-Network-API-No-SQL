const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
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
    },
    {
        toJSON: {
            getters: true
        }
    }
);

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
        reactions: [ReactionSchema]
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
