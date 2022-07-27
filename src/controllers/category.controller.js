import Category from "../models/Category";
import Movie from "../models/Movie";

export const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { _id: 0 }
    ).populate("movies");
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed getting categories" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.name });
    if (category)
      return res.status(400).json({ message: "The category already exists" });
    
    const {name, imgUrl,movies} = req.body;
    let newCategory ={
        name:name,
        imgUrl:imgUrl,
    }
    if(movies){
        const foundMovies = await Movie.find({title:{$in: movies}})
        newCategory.movies = foundMovies.map(movie=>movie._id)
    }else{
        newCategory.movies = [];
    }
    const categoryC = await Category.create(newCategory);
    res.status(201).json(categoryC);
  } catch (error) {
    res.status(500).json({ error: "Failed creating category" });
  }
};

export const updateByIdCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = req.body;
    const categoryU = await Category.findByIdAndUpdate(id, category);
    res.status(200).json({ msg: `Category id:${id} updated` });
  } catch (error) {
    res.status(500).json({ error: "Failed updating character" });
  }
};

export const deleteByIdCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryD = await Category.findByIdAndDelete(id);
    res.status(200).json({ msg: `category id:${id} deleted` });
  } catch (error) {}
};
