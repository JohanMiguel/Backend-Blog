import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    nameUser: {
        type: String,
        required: true, 
    },
    content: {
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true, 
});

export default model("Comment", commentSchema);