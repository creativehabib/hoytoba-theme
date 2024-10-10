import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function RecipeDetailsItem({getRecipeDetails}) {
    return (
        <div>
            <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
                <Link href={'/recipe/'}><Button variant={"outline"}>Go to recipe list</Button></Link>
                <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="w-full lg:sticky top-0 mt-5 sm:flex gap-2">
                        <img
                            src={getRecipeDetails?.image}
                            alt={getRecipeDetails?.name}
                            className="object-cover w-4/5 rounded"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-950">{getRecipeDetails.name}</h2>
                        <div className="flex items-center justify-between mt-5">
                            <p className="text-2xl text-gray-700">{getRecipeDetails?.mealType[0]}</p>
                            <p className="text-yellow-500 font-bold text-xl">Total Review: {getRecipeDetails.reviewCount}</p>
                        </div>
                        <div className="mt-5">
                            <p className="text-gray-800 text-xl">{getRecipeDetails?.cuisine}</p>
                        </div>
                        <div className="mt-5">
                            <div>
                                <h3 className="text-lg font-bold text-gray-700">Ingredients</h3>
                                <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-400">
                                    {
                                        getRecipeDetails?.ingredients.map((item) => (<li key={item.id}>{item}</li>))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div>
                            <ul className="flex items-center mt-4 text-sm text-gray-400">
                                {
                                    getRecipeDetails?.tags.map((item) => (
                                        <li className="me-2 bg-gray-500 rounded-lg px-2.5 text-white"
                                            key={item.id}>{item}</li>))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}