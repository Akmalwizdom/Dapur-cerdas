import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';
import { Clock, Users, Timer, Lightbulb, Share2, PlayCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const ingredients = [
    '2 Fresh Salmon Fillets (6oz each)',
    '4 tbsp Unsalted Butter, softened',
    '2 cloves Garlic, finely minced',
    '1 tbsp Fresh Parsley, chopped',
    '1/2 Lemon (for zest and juice)',
    'Kosher Salt & Cracked Black Pepper',
];

const steps = [
    {
        number: '01',
        title: 'Prepare the Herb Butter',
        description: 'In a small bowl, combine the softened butter, minced garlic, parsley, lemon zest, and a pinch of salt. Mix well until creamy and set aside.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHDhhKV3Co1s1AZf6d0r_2AwwxyxsvUKPLdc8JeiyheFefznjBCSwrLc4QQUiRuWHEG0Z0vjzz0P_GL2XgrQ1KcXnap917Vp-Slh9ieFppneFQ7_BpqEHqheVFvsm795b_701-0o5j7wNBjBZ0NrfUaYrFLfy3-1adTWTmpD8whE59w9n3H2RQu0auFfkzI4bQOrbjsHH2wEF-u_L_GJyBkzpxmOg8k3PiA_uU5rNT-nqJ6wX2pgkJUHvYDZc7wZjHmFXJYVGpSsJL',
    },
    {
        number: '02',
        title: 'Season and Sear',
        description: 'Season the salmon generously with salt and pepper. Heat a large non-stick skillet over medium-high heat with a drizzle of oil. Once shimmering, place salmon fillets skin-side down.',
    },
    {
        number: '03',
        title: 'The Perfect Finish',
        description: 'Sear for 4-5 minutes until the skin is crispy. Flip and immediately top each fillet with a generous dollop of the herb butter. Cook for another 3-4 minutes, spooning the melting butter over the fish.',
    },
    {
        number: '04',
        title: 'Rest and Serve',
        description: 'Remove from heat and let rest for 2 minutes. Serve with fresh lemon wedges and your choice of seasonal greens.',
    },
];

export default function RecipeShow() {
    const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

    const toggleIngredient = (index: number) => {
        if (checkedIngredients.includes(index)) {
            setCheckedIngredients(checkedIngredients.filter(i => i !== index));
        } else {
            setCheckedIngredients([...checkedIngredients, index]);
        }
    };

    return (
        <CookingLayout title="Pan-Seared Salmon - DapurCerdas">
            <main className="max-w-[1000px] mx-auto px-6 py-10 pb-32">
                {/* Header Image & Title Section */}
                <div className="mb-12">
                    <div className="group relative w-full h-[500px] overflow-hidden rounded-xl mb-8">
                        <div 
                            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105"
                            style={{ 
                                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHaynYrhNWFGD5sG665WTa-9HMnhvQpntloaEpAtzFjbmJd2lQf5klecW8WHqCu9ciPDa5u0ZXbdOsyFr1tQ1NfQ9zi7nQRxFM62Kvs4u535hTdJ9j5vHxxYPHq2pa0KpmbBOECtL-9Nj5Jjvcs-DOApgBCk1MJezV5w2VWQ0N5TpElLOCI4kZd-Nn2xWkFoJ0tsKQ1JG_TqK4Q_39p3uxKgpWTI_H4O4nu2Yk-OJoV0o9-L_OfEeJI3-v2niT3KwRS-fJBqsw3-IW")` 
                            }}
                        />
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <span className="bg-[var(--cooking-primary)] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4 inline-block">
                                Chef's Choice
                            </span>
                            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg font-['Newsreader',serif]">
                                Pan-Seared Salmon with Herb Butter
                            </h1>
                        </div>
                    </div>

                    {/* Metadata Stats */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {[
                            { label: 'Prep Time', value: '15 mins', icon: Clock },
                            { label: 'Cook Time', value: '12 mins', icon: PlayCircle }, // Closest to 'cooking' symbol
                            { label: 'Servings', value: '2 People', icon: Users },
                        ].map((stat) => (
                            <div key={stat.label} className="flex-1 min-w-[140px] flex flex-col gap-1 rounded-xl p-6 border border-[var(--cooking-border)] bg-white/50 dark:bg-white/5 dark:border-white/10">
                                <div className="flex items-center gap-2 text-[var(--cooking-primary)]">
                                    <stat.icon className="w-5 h-5" />
                                    <p className="text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                                </div>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                        ))}
                        <div className="flex-1 min-w-[140px] flex flex-col gap-1 rounded-xl p-6 bg-[var(--cooking-primary)]/10 border border-[var(--cooking-primary)]/20">
                            <div className="flex items-center gap-2 text-[var(--cooking-primary)]">
                                <Timer className="w-5 h-5" />
                                <p className="text-sm font-bold uppercase tracking-wider">Total Time</p>
                            </div>
                            <p className="text-2xl font-bold mt-1">27 mins</p>
                        </div>
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
                                {ingredients.map((ing, idx) => (
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
                                                {ing}
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
                            {steps.map((step) => (
                                <div key={step.number} className="flex gap-6">
                                    <span className="text-5xl font-bold text-[var(--cooking-primary)]/30 font-['Newsreader',serif] shrink-0">
                                        {step.number}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                                        <p className="text-lg text-[var(--cooking-text-muted)] leading-relaxed mb-4 dark:text-gray-300">
                                            {step.description}
                                        </p>
                                        {step.image && (
                                            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden dark:bg-white/5">
                                                <img alt={step.title} className="w-full h-full object-cover opacity-80" src={step.image} />
                                            </div>
                                        )}
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
                        <p className="font-bold text-lg">Pan-Seared Salmon</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 border border-[var(--cooking-border)] rounded-xl font-bold hover:bg-gray-50 transition-colors dark:border-white/20 dark:hover:bg-white/10">
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>
                        <Link
                            href="/cooking/cook/1"
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
