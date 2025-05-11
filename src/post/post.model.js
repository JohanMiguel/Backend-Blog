import { Schema, model } from "mongoose";

const postsSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
},
{
    versionKey: false,
    timestamps: true 
});

export default model("Post", postsSchema);