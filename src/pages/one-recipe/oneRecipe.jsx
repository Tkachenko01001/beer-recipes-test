import React from "react";
import useBeerStore from "../../store/store";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import "../../sass/index.css";

const OneRecipe = () => {
  const { id } = useParams();
  const beerRecipes = useBeerStore((state) => state.listRecipes);

  const selectedRecipe = beerRecipes.find(
    (recipe) => recipe.id === parseInt(id)
  );

  return (
    <div className="one-recipe">
      {selectedRecipe ? (
        <>
          <img src={selectedRecipe.image_url} alt="" />
          <h3>{selectedRecipe.name}</h3>
          <p>First brewed: {selectedRecipe.first_brewed}</p>
          <p>{selectedRecipe.tagline}</p>
          <p>{selectedRecipe.description}</p>

          <div>
            <h3>Ingredients</h3>
            <div>
              <h4>Malt</h4>
              <table>
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRecipe.ingredients.malt.map((malt) => (
                    <tr key={nanoid()}>
                      <td>{malt.name}</td>
                      <td>
                        {malt.amount.value}
                        {malt.amount.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h4>Hops</h4>
              <table>
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Amount</th>
                    <th>Add</th>
                    <th>Attribute</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRecipe.ingredients.hops.map((hops) => (
                    <tr key={nanoid()}>
                      <td>{hops.name}</td>
                      <td>
                        {hops.amount.value}
                        {hops.amount.unit}
                      </td>
                      <td>{hops.add}</td>
                      <td>{hops.attribute}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div>Recipe not found</div>
      )}
    </div>
  );
};

export default OneRecipe;
