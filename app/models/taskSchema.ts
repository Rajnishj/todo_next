import mongoose,{Schema} from "mongoose";

const taskSchema = new Schema(
    {
        text: {
            type : String,
            required: true,
        },
        completed: Boolean
    },
    {timestamps:true}
)

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task