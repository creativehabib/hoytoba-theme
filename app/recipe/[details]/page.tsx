import RecipeDetailsItem from "@/components/RecipeDetails";
// Define an interface for the params object
interface RecipeParams {
    params: {
        details: string;
    };
}

async function fetchRecipeDetails(currentRecipeId: string | undefined) {
    try {
        const apiResponse = await fetch(`https://dummyjson.com/recipes/${currentRecipeId}`);
        return await apiResponse.json();
    } catch (e) {
        throw new Error(`Failed to fetch recipe details: ${e}`);
    }
}

export default async function RecipeDetails({params}: RecipeParams) {
    const getRecipeDetails = await fetchRecipeDetails(params?.details);
    return (
        <RecipeDetailsItem getRecipeDetails={getRecipeDetails} />
    );
}