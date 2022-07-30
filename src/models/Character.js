import { Schema, model } from "mongoose";

const characterSchema = new Schema(
  {
    imgUrl: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    history: { type: String, required: true },
    movies: [
      {
        ref: "Movie",
        type: Schema.Types.ObjectId,
      },
    ],
    createdBy: { ref: "User", type: Schema.Types.ObjectId },
    updatedBy: { ref: "User", type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Character", characterSchema);
