import mongoose, { Schema, Document } from "mongoose";

export interface TaskDocument extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    dueDate?: string;
    tag?: string;
    note?: string;
    completed: boolean;
}

const taskSchema = new Schema<TaskDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        dueDate: String,
        tag: {
            type: String,
            enum: ["URGENT", "NOT_URGENT", "HIGH", "MEDIUM", "LOW"],
        },
        note: String,
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Task = mongoose.model<TaskDocument>("Task", taskSchema);