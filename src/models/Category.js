import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    movies: [
        {
          ref: "Movie",
          type: Schema.Types.ObjectId,
        },
      ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Category", categorySchema);
