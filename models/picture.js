const { Schema, model } = require('mongoose');

const PictureSchema = Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    img: {
        type: String,
        required: [true, 'La imagen es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

PictureSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Picture', PictureSchema);