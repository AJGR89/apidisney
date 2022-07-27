import Character from "../models/character";
import Movie from "../models/Movie";

export const getCharacters = async (req, res) => {
  try {
    const {name, age, movies} = req.query
    if(name){
      const characterByName = await Character.findOne({name:name});
      if(characterByName){
        res.status(200).json(characterByName);
        return
      }
      res.status(200).json({message:`User "${name}" not found`});
      return;
    }
    if(age){
      const charactersByAge = await Character.find({age:parseInt(age)});
      if(charactersByAge.length){
        res.status(200).json(charactersByAge);
        return
      }
      res.status(200).json({message:`Users with age:${age} not found`});
      return;
    }
    if(movies){
      const charactersByMovies = await Character.find({movies:movies});
      if(charactersByMovies.length){
        res.status(200).json(charactersByMovies);
        return
      }
      res.status(200).json({message:`Users with movies:${movies} not found`});
      return;
    }
    const allCharacters = await Character.find(
      {},
      { name: 1, imgUrl: 1, _id: 0 }
    );
    res.status(200).json(allCharacters);
  } catch (error) {
    res.status(500).json({ error: "Failed getting characters" });
  }
};

export const createCharacter = async (req, res) => {
  try {
    const charact = await Character.findOne({ name: req.body.name });
    if (charact)
      return res.status(400).json({ message: "The user already exists" });
    const {imgUrl,name,age,weight,history,movies} = req.body
    let newCharacter ={
      imgUrl:imgUrl,
      name:name,
      age:age,
      weight:weight,
      history:history
    }
    if(movies){
        const foundMovies = await Movie.find({title:{$in: movies}})
        newCharacter.movies = foundMovies.map(movie=>movie._id)
    }else{
        newCharacter.movies = [];
    }
      const characterC = await Character.create(newCharacter);
    res.status(201).json(characterC);
  } catch (error) {
    res.status(500).json({ error: "Failed creating character" });
  }
};

export const updateByIdCharacter = async (req, res) => {
  try {
    const id = req.params.id;
    const character = req.body;
    const characterU = await Character.findByIdAndUpdate(id, character);
    res.status(200).json({msg:`Character id:${id} updated`});
  } catch (error) {
    res.status(500).json({ error: "Failed updating character" });
  }
};

export const deleteByIdCharacter = async (req, res) => {
  try {
    const id = req.params.id;
    const characterD = await Character.findByIdAndDelete(id);
    res.status(200).json({ msg: `caharacter id deleted` });
  } catch (error) {}
};
