import RecipeDetailsItem from "@/components/RecipeDetails";

async function fetchRecipeDetails(currentRecipeId: string) {
    try {
        const apiResponse = await fetch(`https://dummyjson.com/recipes/${currentRecipeId}`)
        return await apiResponse.json();
    } catch (e:never) {
        throw new Error(`Failed to fetch recipe details ${e}`);
    }
}

export default async function RecipeDetails({params}) {
    const getRecipeDetails = await fetchRecipeDetails(params?.details);
    return (
        <RecipeDetailsItem getRecipeDetails={getRecipeDetails}/>
    )
}