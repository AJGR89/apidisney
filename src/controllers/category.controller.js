import Category from "../models/Category";
import Movie from "../models/Movie";
import User from "../models/User";

/** GET CATEGORIES */
export const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}, { _id: 0 }).populate(
      "movies"
    );
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed getting categories" });
  }
};

/** CREATE CATEGORY */
export const createCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const category = await Category.findOne({ name: req.body.name });

    if (category)
      return res.status(400).json({ message: "The category already exists" });

    const { name, imgUrl, movies } = req.body;
    let newCategory = {
      name: name,
      imgUrl: imgUrl,
    };
    if (movies) {
      const foundMovies = await Movie.find({ title: { $in: movies } });
      newCategory.movies = foundMovies.map((movie) => movie._id);
    } else {
      newCategory.movies = [];
    }
    newCategory.createdBy = userId;
    newCategory.updatedBy = userId;
    const categoryC = await Category.create(newCategory);
    res.status(201).json(categoryC);
  } catch (error) {
    res.status(500).json({ error: "Failed creating category" });
  }
};

/** UPDATE CATEGORIES BY ID */
export const updateByIdCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    const { name, imgUrl, movies } = req.body;
    let category = {};
    category.updatedBy = userId;
    const categoryU = await Category.findByIdAndUpdate(id, category);

    res.status(200).json({ message: `Category id:${id} updated` });
  } catch (error) {
    res.status(500).json({ error: "Failed updating character" });
  }
};

/** DELETE CATEGORY BY ID*/
export const deleteByIdCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryD = await Category.findByIdAndDelete(id);
    res.status(200).json({ message: `category id:${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: "Failed deleting category" });
  }
};
