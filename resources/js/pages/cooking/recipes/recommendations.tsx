import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';
import { Search, ChevronDown, ShieldCheck, Clock, SignalHigh, ArrowRight } from 'lucide-react';

const recipes = [
    {
        id: 1,
        title: 'Simple Vegetable Stir-fry',
        category: 'Healthy & Fast',
        risk: 'Low Risk',
        time: '25 mins',
        difficulty: 'Beginner',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV6zgXvxCPL0PrVi-cZCEssqvq0xm-Z09jwhwrUpJPERYaeAM5yiq9kZR_ZzoacpgSrheXaDis2GQvVm7wbhC4E0JrDEkSNBIp8EL1vgyEah7pR8P-Hn54v2y_l7kwV9R7ULiotOVz_UD8Hsm6MIixBYjZlbkxbq3M4IJXDnrurCb18VlKaVC0nEHL374CzTG0INFEMt0VnG-asXd2N69VBzlUpmUAboLhipfKOidrKp6oPOPBJ3FAZFOvFhPROyS_8d9_WPWidyG0',
        pantryIngredients: ['Broccoli', 'Carrots', 'Soy Sauce', 'Ginger'],
    },
    {
        id: 2,
        title: 'Pan-Seared Chicken with Herbs',
        category: 'Protein Rich',
        risk: 'Low Risk',
        time: '30 mins',
        difficulty: 'Beginner',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvtwD6EcHIdhdeQoBDDOV3v_K6tASGBDTCkn3aZowdwutxrN_KTeH3mrZIDML4Z8VnXL2Q4O3qNrkQc2Ad4WfTYs8mPdo8yufuJAd1RMqWdpziN4D99cFiDS_f6R2gnIOYUCrefogL81znljpsU_E9iKuVAgm9pLmtMub68Zo_ykwfUY6A7b-HvcP-i_aXvb6w53QBo6vf7zw4CAjOP0Iqm8Gj4AZLjgz6G5FPYJR7h6YHvPFQrxXrO_f8bh5yKixiCM_wu01BTDeB',
        pantryIngredients: ['Chicken Breast', 'Rosemary', 'Garlic', 'Olive Oil'],
    },
    {
        id: 3,
        title: 'Creamy Garlic Pantry Pasta',
        category: 'Pantry Comfort',
        risk: 'Low Risk',
        time: '20 mins',
        difficulty: 'Beginner',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa8YoF33vtvlWIEvnNoHx1D4Q1WwDk61KhfPyn8u4QbSquSkpOdbqziieLJgubXiUCXvgGhRmXYHn4LYPqEUSX0d1Efd9GORSEt7lD3sznBvqphOmXUMNN2Djq9yMjvqpehrkirq2fCbLUMcLc5Xt7aXM7jlIybhwJaTbEBuR4gJA4eEvh7fhLvGFuvA4pJeYJ_O1vElgTcL7BhgyumPVaPzRBDjhGNaDvaGERzQpi5HrjWH3dUn4VnLbJdmRUcFYBd5SxGui-AdfF',
        pantryIngredients: ['Spaghetti', 'Butter', 'Garlic', 'Parmesan'],
    },
];

export default function RecipeRecommendations() {
    return (
        <CookingLayout title="Recommendations - DapurCerdas">
            <main className="flex-1 max-w-[1024px] mx-auto w-full px-6 py-12">
                {/* Page Heading */}
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-black tracking-tight mb-3 font-['Newsreader',serif]">
                        Personalized Recommendations
                    </h1>
                    <p className="text-[var(--cooking-text-muted)] text-lg">
                        Curated meals based on your current pantry and time constraints
                    </p>
                </div>

                {/* Filter Chips */}
                <div className="flex justify-center gap-3 mb-12 flex-wrap">
                    <button className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-5 hover:bg-[var(--cooking-primary)]/10 transition-colors group dark:bg-white/10">
                        <p className="text-sm font-medium">Quick Meals</p>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[var(--cooking-primary)]" />
                    </button>
                    <button className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-5 hover:bg-[var(--cooking-primary)]/10 transition-colors group dark:bg-white/10">
                        <p className="text-sm font-medium">Beginner Friendly</p>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[var(--cooking-primary)]" />
                    </button>
                    <button className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-[var(--cooking-primary)] text-white px-5 shadow-lg shadow-[var(--cooking-primary)]/20 transition-transform active:scale-95">
                        <p className="text-sm font-medium">Low Risk Only</p>
                        <ShieldCheck className="w-4 h-4" />
                    </button>
                </div>

                {/* Recipe Grid */}
                <div className="flex flex-col gap-8">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="group">
                            <div className="flex flex-col md:flex-row items-stretch justify-start rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white overflow-hidden border border-[var(--cooking-border)] hover:border-[var(--cooking-primary)]/50 transition-all duration-300 dark:bg-[var(--cooking-card-dark)] dark:border-white/10">
                                <Link 
                                    href={`/cooking/recipes/${recipe.id}`}
                                    className="w-full md:w-1/3 min-h-[240px] bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url("${recipe.image}")` }}
                                />
                                <div className="flex flex-1 flex-col justify-between p-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[var(--cooking-primary)] text-xs font-bold tracking-[0.1em] uppercase">
                                                {recipe.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-[var(--cooking-text-muted)] text-sm bg-gray-100 px-2 py-1 rounded dark:bg-white/10">
                                                <ShieldCheck className="w-4 h-4" />
                                                {recipe.risk}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold tracking-tight leading-tight font-['Newsreader',serif]">
                                            {recipe.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-[var(--cooking-text-muted)] text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                <span>{recipe.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <SignalHigh className="w-4 h-4" />
                                                <span>{recipe.difficulty}</span>
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-[var(--cooking-text-muted)] text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
                                                Key Ingredients from Pantry
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {recipe.pantryIngredients.map((ing) => (
                                                    <span key={ing} className="px-2 py-1 rounded-md bg-gray-100 text-[var(--cooking-text)] text-xs dark:bg-white/5 dark:text-white/80">
                                                        {ing}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <Link
                                            href={`/cooking/recipes/${recipe.id}`}
                                            className="flex min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-xl h-11 px-6 bg-[var(--cooking-primary)] text-white text-sm font-bold shadow-md shadow-[var(--cooking-primary)]/20 hover:bg-[var(--cooking-primary)]/90 transition-all"
                                        >
                                            <span>View Recipe</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer / More button */}
                <div className="mt-16 text-center">
                    <button className="text-[var(--cooking-primary)] font-bold text-sm flex items-center gap-2 mx-auto hover:underline uppercase tracking-widest">
                        See more suggestions
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </main>
        </CookingLayout>
    );
}
