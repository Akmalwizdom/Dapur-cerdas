import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Camera, Search, X } from 'lucide-react';

export default function IngredientInput() {
    const [ingredients, setIngredients] = useState([
        'Roma tomatoes',
        'Garlic',
        'Fresh Basil',
        'Olive Oil',
    ]);
    const [inputValue, setInputValue] = useState('');

    const addIngredient = () => {
        if (inputValue.trim()) {
            setIngredients([...ingredients, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addIngredient();
        }
    };

    return (
        <CookingLayout title="Add Ingredients - DapurCerdas">
            <main className="flex-1 flex justify-center py-12 px-6">
                <div className="max-w-[800px] w-full flex flex-col gap-10">
                    {/* Progress Bar Section */}
                    <div className="flex flex-col gap-4 px-4">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                                <span className="text-[var(--cooking-accent)] font-bold text-sm tracking-widest uppercase mb-1">
                                    Current Progress
                                </span>
                                <p className="text-2xl font-semibold">Step 1 of 3</p>
                            </div>
                            <p className="text-sm font-medium opacity-60">33% Complete</p>
                        </div>
                        <div className="h-3 w-full bg-[var(--cooking-border)] rounded-full overflow-hidden dark:bg-white/10">
                            <div
                                className="h-full bg-[var(--cooking-primary)] rounded-full transition-all duration-500"
                                style={{ width: '33.33%' }}
                            />
                        </div>
                        <p className="text-[var(--cooking-text-muted)] text-sm italic font-medium">
                            Identify what's available in your kitchen
                        </p>
                    </div>

                    {/* Headline & Intro */}
                    <div className="text-center px-4 space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight font-['Newsreader',serif]">
                            What's in your pantry?
                        </h1>
                        <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto leading-relaxed">
                            Type your ingredients below or upload a photo of your fridge to get started.
                            We'll craft the perfect recipe for you.
                        </p>
                    </div>

                    {/* Input & Actions Section */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--cooking-border)] space-y-8 dark:bg-white/5 dark:border-white/10">
                        {/* Text Input Field */}
                        <div className="relative group">
                            <label
                                className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider"
                                htmlFor="ingredient-input"
                            >
                                Add an Ingredient
                            </label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-[var(--cooking-border)] bg-transparent text-lg focus:outline-none focus:border-[var(--cooking-accent)] focus:ring-2 focus:ring-[var(--cooking-accent)]/20 transition-all dark:border-white/20"
                                        id="ingredient-input"
                                        placeholder="e.g. Roma tomatoes, garlic, fresh basil..."
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <button
                                    className="bg-[var(--cooking-primary)] hover:bg-[var(--cooking-primary)]/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-transform active:scale-95 shadow-lg shadow-[var(--cooking-primary)]/20"
                                    onClick={addIngredient}
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        {/* Upload Placeholder */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--cooking-primary)]/30 rounded-xl p-8 bg-[var(--cooking-primary)]/5 hover:bg-[var(--cooking-primary)]/10 transition-colors cursor-pointer group">
                            <Camera className="w-10 h-10 text-[var(--cooking-primary)] mb-3 group-hover:scale-110 transition-transform" />
                            <p className="font-bold text-[var(--cooking-primary)] text-lg">Upload a photo</p>
                            <p className="text-sm text-gray-500 mt-1 italic">
                                Scan your fridge or grocery receipt
                            </p>
                        </div>

                        {/* Ingredient Chips */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Your Ingredients
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {ingredients.map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 bg-[var(--cooking-primary)] text-white pl-5 pr-3 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer group"
                                    >
                                        <span className="text-lg font-semibold tracking-wide">{ingredient}</span>
                                        <button
                                            onClick={() => removeIngredient(index)}
                                            className="opacity-60 group-hover:opacity-100"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2 border-2 border-dashed border-gray-300 px-6 py-3 rounded-full text-gray-400 italic dark:border-white/20">
                                    <span>Add more...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex justify-between items-center py-8 border-t border-[var(--cooking-border)] dark:border-white/10">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-gray-500 font-bold hover:text-[var(--cooking-text)] transition-colors dark:hover:text-white"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Home
                        </Link>
                        <Link
                            href="/cooking/ingredients/confirm"
                            className="flex items-center gap-3 bg-[var(--cooking-primary)] text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl shadow-[var(--cooking-primary)]/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            Next Step
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </main>
        </CookingLayout>
    );
}
