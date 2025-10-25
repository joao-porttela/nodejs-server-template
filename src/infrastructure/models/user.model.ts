// Modules
import { Schema, model, models } from "mongoose";

// Interfaces
import { IUser } from "../../core/entities/user.interface";

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: [true, 'Email is required'], unique: [true, 'Email is already being used'] },
        username: { type: String, required: [true, 'Username is required'], unique: [true, 'Username is already being used'] },
        password: { type: String, required: [true, 'Password is required'] },
        role: { type: String, required: [true, "Role is required"], enum: ['ADMIN', 'USER'] }
    },
    {
        timestamps: true
    }
);

export const User = models.User || model('User', userSchema);