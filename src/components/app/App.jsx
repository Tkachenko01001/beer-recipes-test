import ListRecipes from "../../pages/list-recipes/listRecipes";
import { Routes, Route } from "react-router-dom";
import OneRecipe from "../../pages/one-recipe/oneRecipe";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListRecipes />} />
        <Route path="recipe/:id" element={<OneRecipe />} />
      </Routes>
    </>
  );
};

export default App;
