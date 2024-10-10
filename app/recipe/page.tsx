import React from 'react';
import RecipeList from "@/components/recipe-list";

async function fetchRecipes() {
    try {
        const apiResponse = await fetch('http://dummyjson.com/recipes')
        const data = await apiResponse.json();
        return data?.recipes;
    } catch (e){
        throw new Error(`Could not fetch recipes for ${e}`);
    }
}

const Recipes = async () => {
    const recipeList = await fetchRecipes();
    return (
        <div>
           <RecipeList recipeList={recipeList} />
        </div>
    );
};

export default Recipes;