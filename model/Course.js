const { array } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const Course = new Schema({

    name: String,
    discription: String,
    videoid: String,
    img: String,
    comment: Array,
    slug: { type: String, slug: 'name', unique: true }
});
mongoose.plugin(slug);

module.exports = mongoose.model('course', Course);
