import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true  
    }
);

const Course = mongoose.model("Course", courseSchema);
export default model("Course", courseSchema);