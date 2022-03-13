/* const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {

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
)

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction; */