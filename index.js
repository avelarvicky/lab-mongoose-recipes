const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    let createdRecipe = {
      title: "Chocoghetti",
      level: "Amateur Chef",
      ingredients: ["Spaghetti", "Dark Chocolate"],
      cuisine: "Fast food",
      dishType: "soup",
      duration: 0.4,
      creator: "Victoria Avelar",
    };
    await Recipe.create(createdRecipe);

    let recipe = await Recipe.find({ title: "Chocoghetti" });
    console.log(recipe[0].title);

    await Recipe.insertMany(data)
    let allRecipes = await Recipe.find()

    let titles = [];
    for(let i=0; i<allRecipes.length; i++){
      titles.push(allRecipes[i].title)
    }
    console.log(titles);

    await Recipe.findOneAndUpdate({name: 'Rigatoni alla Genovese'}, {duration: 100});
    console.log('Success');

    await Recipe.deleteOne({title: 'Carrot Cake'});
    console.log('Success');

  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
