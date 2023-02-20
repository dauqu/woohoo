const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const categorySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        image: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        }
    },
    subcategoriesCount: {
        type: Number,
        required: true
    },
    subcategories: []
}, {
    timestamps: true,
    strict: false
});

module.exports = mongoose.model('Category', categorySchema);