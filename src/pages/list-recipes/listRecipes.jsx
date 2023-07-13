import useBeerStore from "../../store/store";
import axios from "axios";
import ListElement from "../../components/list-element/listElement";
import { useEffect } from "react";
import "../../sass/index.css";

axios.defaults.baseURL = "https://api.punkapi.com/v2";

const ListRecipes = () => {
  const beerRecipes = useBeerStore((state) => state.listRecipes);
  const selectedRecipes = useBeerStore((state) => state.selectedRecipes);
  const setSelectedRecipes = useBeerStore((state) => state.setSelectedRecipes);
  const deleteRecipes = useBeerStore((state) => state.deleteRecipes);

  const visibleRecipes = beerRecipes.slice(0, 15);

  useEffect(() => {
    if (beerRecipes.length === 0) {
      const fetchMoreRecipes = async () => {
        try {
          const nextPage = useBeerStore.getState().page + 1;
          const response = await axios.get(`/beers?page=${nextPage}`);
          const { data } = response;
          useBeerStore.setState((state) => ({
            listRecipes: [...state.listRecipes, ...data],
            page: nextPage,
            hasMore: data.length > 0,
          }));
        } catch (error) {
          console.log(error);
        }
      };

      fetchMoreRecipes();
    }
  }, [beerRecipes]);

  const handleRecipeContextMenu = (e, recipeId) => {
    e.preventDefault();

    const isRecipeSelected = selectedRecipes.includes(recipeId);

    if (isRecipeSelected) {
      const updatedSelectedRecipes = selectedRecipes.filter(
        (id) => id !== recipeId
      );
      setSelectedRecipes(updatedSelectedRecipes);
    } else {
      const updatedSelectedRecipes = [...selectedRecipes, recipeId];
      setSelectedRecipes(updatedSelectedRecipes);
    }
  };

  const handleDeleteRecipes = () => {
    deleteRecipes();
    setSelectedRecipes([]);
  };

  return (
    <div className="list-recipes">
      {beerRecipes.length > 0 && (
        <>
          <ul className="list-recipes__list">
            {visibleRecipes.map((recipe) => (
              <ListElement
                key={recipe.id}
                recipe={recipe}
                rightClick={handleRecipeContextMenu}
              />
            ))}
          </ul>
          {selectedRecipes.length > 0 && (
            <button
              className="list-recipes__delete-button"
              onClick={handleDeleteRecipes}
            >
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ListRecipes;
