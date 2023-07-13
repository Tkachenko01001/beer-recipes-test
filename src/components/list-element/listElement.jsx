import useBeerStore from "../../store/store";
import { Link } from "react-router-dom";
import "../../sass/index.css";

const ListElement = ({ recipe, rightClick }) => {
  const selectedRecipes = useBeerStore((state) => state.selectedRecipes);
  const isSelected = selectedRecipes.includes(recipe.id);

  return (
    <li
      onContextMenu={(e) => rightClick(e, recipe.id)}
      className={isSelected ? "list-element selected" : "list-element"}
    >
      <Link to={`recipe/${recipe.id}`}>
        <h3 className="list-element__name">{recipe.name}</h3>

        <p className="list-element__first-brewed">
          First brewed: {recipe.first_brewed}
        </p>
        <p className="list-element__tagline">{recipe.tagline}</p>
      </Link>
    </li>
  );
};

export default ListElement;
