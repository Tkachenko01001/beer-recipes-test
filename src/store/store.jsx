import { create } from "zustand";

const useBeerStore = create((set) => ({
  listRecipes: [],
  selectedRecipes: [],
  page: 1,
  hasMore: true,
  setRecipes: (newRecipes) => set({ listRecipes: newRecipes }),
  setSelectedRecipes: (selected) => set({ selectedRecipes: selected }),
  deleteRecipes: () =>
    set((state) => {
      const updatedListRecipes = state.listRecipes.filter(
        (recipe) => !state.selectedRecipes.includes(recipe.id)
      );
      const hasMore = updatedListRecipes.length > 0;

      return {
        listRecipes: updatedListRecipes,
        selectedRecipes: [],
        hasMore: hasMore,
      };
    }),
  setHasMore: (value) => set({ hasMore: value }),
}));

export default useBeerStore;
