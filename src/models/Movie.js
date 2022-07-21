import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    imgUrl: { type: String, required: true },
    title: { type: String, required: true },
    release: { type: Date, required: true },
    score: { type: Number, required: true },
    characters: [
        {
          ref: "Character",
          type: Schema.Types.ObjectId,
        },
      ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Movie", movieSchema);