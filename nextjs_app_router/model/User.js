import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minlength: [2, "First name must be at least 2 characters"],
            maxlength: [50, "First name must be at most 50 characters"],
        },
        lname: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minlength: [2, "Last name must be at least 2 characters"],
            maxlength: [50, "Last name must be at most 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
            minlength: [2, "City must be at least 2 characters"],
            maxlength: [100, "City must be at most 100 characters"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model("User", userSchema);