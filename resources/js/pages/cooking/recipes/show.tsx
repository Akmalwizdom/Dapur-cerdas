import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';
import { Clock, Users, Timer, Lightbulb, Share2, PlayCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface Ingredient {
    name: string;
    amount: string;
}

interface RecipeProps {
    recipe: {
        id: number;
        title: string;
        description: string;
        cooking_time: number;
        difficulty: string;
        ingredients: Ingredient[];
        instructions: string[];
        nutrition: any;
    };
}

export default function RecipeShow({ recipe }: RecipeProps) {
    const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

    const toggleIngredient = (index: number) => {
        if (checkedIngredients.includes(index)) {
            setCheckedIngredients(checkedIngredients.filter(i => i !== index));
        } else {
            setCheckedIngredients([...checkedIngredients, index]);
        }
    };

    if (!recipe) return null;

    return (
        <CookingLayout title={`${recipe.title} - DapurCerdas`}>
            <main className="max-w-[1000px] mx-auto px-6 py-10 pb-32">
                {/* Header Image & Title Section */}
                <div className="mb-12">
                    <div className="group relative w-full h-[500px] overflow-hidden rounded-xl mb-8">
                        <div 
                            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105"
                            style={{ 
                                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%), url("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop")` 
                            }}
                        />
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <span className="bg-[var(--cooking-primary)] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4 inline-block">
                                Generated for You
                            </span>
                            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg font-['Newsreader',serif]">
                                {recipe.title}
                            </h1>
                        </div>
                    </div>

                    {/* Metadata Stats */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {[
                            { label: 'Time', value: `${recipe.cooking_time} mins`, icon: Clock },
                            { label: 'Difficulty', value: recipe.difficulty, icon: PlayCircle },
                            { label: 'Servings', value: '2 People', icon: Users },
                        ].map((stat) => (
                            <div key={stat.label} className="flex-1 min-w-[140px] flex flex-col gap-1 rounded-xl p-6 border border-[var(--cooking-border)] bg-white/50 dark:bg-white/5 dark:border-white/10">
                                <div className="flex items-center gap-2 text-[var(--cooking-primary)]">
                                    <stat.icon className="w-5 h-5" />
                                    <p className="text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                                </div>
                                <p className="text-2xl font-bold mt-1 capitalize">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Ingredients Checklist */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <h2 className="text-3xl font-bold mb-6 font-['Newsreader',serif] border-b border-[var(--cooking-primary)]/20 pb-4">
                                Ingredients
                            </h2>
                            <ul className="space-y-4">
                                {recipe.ingredients.map((ing, idx) => (
                                    <li key={idx} className="flex items-start gap-3 group">
                                        <label className="flex items-start gap-4 cursor-pointer">
                                            <div className="relative mt-1">
                                                <input 
                                                    type="checkbox" 
                                                    className="peer sr-only"
                                                    checked={checkedIngredients.includes(idx)}
                                                    onChange={() => toggleIngredient(idx)}
                                                />
                                                <div className="w-5 h-5 border-2 border-[var(--cooking-border)] rounded transition-all peer-checked:bg-[var(--cooking-primary)] peer-checked:border-[var(--cooking-primary)]" />
                                                <CheckCircle2 className="absolute top-0 left-0 w-5 h-5 text-white opacity-0 transition-opacity peer-checked:opacity-100 p-0.5" />
                                            </div>
                                            <span className={`text-lg leading-tight group-hover:text-[var(--cooking-primary)] transition-all ${checkedIngredients.includes(idx) ? 'line-through opacity-50' : ''}`}>
                                                {ing.amount} {ing.name}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10 p-6 bg-[var(--cooking-primary)]/5 rounded-xl border border-[var(--cooking-primary)]/10">
                                <div className="flex items-center gap-2 text-[var(--cooking-primary)] mb-2">
                                    <Lightbulb className="w-5 h-5" />
                                    <h4 className="font-bold uppercase tracking-tighter text-sm">Chef's Tip</h4>
                                </div>
                                <p className="text-md italic leading-relaxed opacity-80">
                                    Pat the salmon skin completely dry with paper towels before searing for the ultimate crispy texture.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step Overview */}
                    <div className="lg:col-span-8">
                        <h2 className="text-3xl font-bold mb-8 font-['Newsreader',serif] border-b border-[var(--cooking-primary)]/20 pb-4">
                            Preparation
                        </h2>
                        <div className="space-y-12">
                            {recipe.instructions.map((step, idx) => (
                                <div key={idx} className="flex gap-6">
                                    <span className="text-5xl font-bold text-[var(--cooking-primary)]/30 font-['Newsreader',serif] shrink-0">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-3 tracking-tight">Step {idx + 1}</h3>
                                        <p className="text-lg text-[var(--cooking-text-muted)] leading-relaxed mb-4 dark:text-gray-300">
                                            {step}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-[var(--cooking-border)] p-6 z-40 dark:bg-[var(--cooking-bg-dark)]/80 dark:border-white/10">
                <div className="max-w-[1000px] mx-auto flex items-center justify-between">
                    <div className="hidden md:block">
                        <p className="text-xs uppercase tracking-widest font-bold text-[var(--cooking-primary)] mb-1">Current Recipe</p>
                        <p className="font-bold text-lg">{recipe.title}</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 border border-[var(--cooking-border)] rounded-xl font-bold hover:bg-gray-50 transition-colors dark:border-white/20 dark:hover:bg-white/10">
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>
                        <Link
                            href={`/cooking/cook/${recipe.id}`}
                            className="flex-[2] md:flex-none flex items-center justify-center gap-2 px-12 py-4 bg-[var(--cooking-primary)] text-white rounded-xl font-bold text-lg hover:brightness-110 shadow-lg shadow-[var(--cooking-primary)]/20 transition-all"
                        >
                            <PlayCircle className="w-6 h-6" />
                            Start Cooking
                        </Link>
                    </div>
                </div>
            </div>
        </CookingLayout>
    );
}
