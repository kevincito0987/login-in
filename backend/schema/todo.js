const Moongose = require("mongoose");

const TodoSchema = new Moongose.Schema({
    id: { type: Object },
    idUser: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },

});

module.exports = Moongose.model("Todo", TodoSchema);