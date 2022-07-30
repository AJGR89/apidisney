import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    imgUrl: { type: String, required: true },
    title: { type: String, required: true },
    release: { type: Number, required: true },
    score: { type: Number, required: true, default: 0, max: 5 },
    characters: [
      {
        ref: "Character",
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

export default model("Movie", movieSchema);
