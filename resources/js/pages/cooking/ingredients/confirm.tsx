import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';
import { Camera, RefreshCw, Pencil, Trash2, Plus, Sparkles } from 'lucide-react';

const detectedIngredients = [
    {
        id: 1,
        name: 'Tomato',
        category: 'Fresh Produce',
        confidence: 98,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgmPm5m7MrunuY9ieANqsAaAz3Ro46vNyXtpGbCXBm5GQVCgKNpEgSUV5asGtxCMUJ0xw8_ZEnx0JrS-JLOBIaMZCUScxnytSQ94kQsC1XRyBIta0F168Wiam0q528kC2_ytb1WoFy40a5YmV-J1RyUe15JAOL00cPJAPsHqUHy6SA5Y-pxYgrKo75eBXnwbFGfRXKUvF28QSED1AIcKjaWxHo6m_IBN6FkPxGr7Cfoqt9IGy9JWKp5x-xFzvPVM9vwuAQzBtb44Pq',
    },
    {
        id: 2,
        name: 'Yellow Onion',
        category: 'Root Vegetable',
        confidence: 92,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWjkumxbkPRLKKnsfeGFNBkvARPw5XZjxbJlfDtct2_OxdkBEmUrDtoChgDrL-W4mvR6xgzcRp_pUJsyicZqMzJfOB2PTsdkrfYY6N-EpsfUwVaQy7_3wknhiy84j8UTgDgM_DC2eozkYNPtUWtjMh50c9jlP-6Y4PVKNlA--IXvUeLt45IUnVNV18ieMfyG7JdpqI1YFkmDquL9FgUDvCMCZyYnYqGV82y-ngdc2gm-Eqwhje7I9K7-nQ3lTntK7V5yVtq16H3t7U',
    },
    {
        id: 3,
        name: 'Chicken Breast',
        category: 'Poultry',
        confidence: 95,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIM3DhzaY38wP-FPSn59Nr1MIco6liEqRJHZSt1f_yCig28EvmHJ9hm-aWcH8CjZECH4AuK69t-EVa3LLHRQWPZh7uG5pezwejdj5jwFKaZF2YneCGPFU098_4N3V6T94pbZNExUF6JjXiz9aAGwcyuc4Ge39LEWm5NBAqEgfHzTtQiZV1uFV5Po6GdoMZK9WmS_ZFiYtdoK3qVtIoKt0gxF0GKhtxLT6qBV7PiCQ6e0tSJpGAM-wVgq-aeMuLnxCOp--SoPLLlHh7',
    },
    {
        id: 4,
        name: 'Garlic',
        category: 'Seasoning',
        confidence: 95,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYdIpPlM_VAhuatGyN436eNBxdzKczxwe0NH7bSxIsrXfZAYtiHhZiUHhIuGUTifafcEo2FXxKa2dpMLApXXfisTi5tT1lPwNQawDsIPAM2xhvB-FWZTBigf1__lcffy_V7K3ZR7-ckTWaU4bE7SiykcLlYw-QA5YwC-hPO24_EKISSHT8GMF_flqaZomThAV9v_gTFVlAJuva0IR6zW8CYlIB5YLFCES_umxKiRX8UDyJwEb3yOLG7VEwjJVaOhNnAxaFZhRI95Z5',
    },
];

export default function ConfirmIngredients() {
    return (
        <CookingLayout title="Confirm Ingredients - DapurCerdas" showFooter>
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 lg:px-40 py-10">
                {/* Page Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight font-['Newsreader',serif]">
                        Is this everything?
                    </h1>
                    <p className="text-[var(--cooking-text-muted)] text-lg mt-3 max-w-2xl">
                        We detected {detectedIngredients.length} ingredients. Add anything we missed or adjust the list below before we generate your custom recipe.
                    </p>
                </div>

                {/* Action Bar Quick Links */}
                <div className="flex items-center gap-4 mb-8">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--cooking-border)] rounded-xl hover:bg-gray-50 transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10">
                        <Camera className="w-5 h-5 text-[var(--cooking-primary)]" />
                        <span className="text-sm font-semibold">Scan More</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--cooking-border)] rounded-xl hover:bg-gray-50 transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10">
                        <RefreshCw className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-semibold">Reset List</span>
                    </button>
                </div>

                {/* Ingredient Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {detectedIngredients.map((ingredient) => (
                        <div
                            key={ingredient.id}
                            className="bg-white rounded-xl overflow-hidden border border-[var(--cooking-border)] shadow-sm hover:shadow-md transition-shadow group dark:bg-[var(--cooking-card-dark)] dark:border-white/10"
                        >
                            <div
                                className="relative h-48 w-full bg-center bg-cover"
                                style={{ backgroundImage: `url("${ingredient.image}")` }}
                            >
                                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-2 shadow-sm">
                                    <div className="size-2 rounded-full bg-[var(--cooking-primary)]" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
                                        {ingredient.confidence}% Confidence
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold font-['Newsreader',serif]">{ingredient.name}</h3>
                                    <p className="text-xs text-[var(--cooking-text-muted)]">{ingredient.category}</p>
                                </div>
                                <button className="text-[var(--cooking-primary)] hover:text-[var(--cooking-primary)]/80">
                                    <Pencil className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Empty State / Add More Card */}
                    <div className="flex flex-col items-center justify-center p-6 bg-transparent border-2 border-dashed border-[var(--cooking-border)] rounded-xl min-h-[12rem] text-center hover:bg-[var(--cooking-primary)]/5 transition-colors cursor-pointer group dark:border-white/20">
                        <div className="bg-[var(--cooking-primary)]/10 text-[var(--cooking-primary)] p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold font-['Newsreader',serif]">Missing something?</h4>
                        <p className="text-sm text-[var(--cooking-text-muted)] mt-1">Tap to add an ingredient manually</p>
                    </div>
                </div>

                {/* Recipe Generation Section */}
                <div className="bg-[var(--cooking-primary)]/5 rounded-2xl p-8 border border-[var(--cooking-primary)]/20 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold font-['Newsreader',serif] mb-2">Ready to cook?</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            We'll find the best recipes matching your {detectedIngredients.length} ingredients, including pantry staples like olive oil and salt.
                        </p>
                    </div>
                    <Link
                        href="/cooking/recipes"
                        className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[var(--cooking-primary)] text-white text-lg font-bold rounded-xl shadow-lg shadow-[var(--cooking-primary)]/20 hover:bg-[var(--cooking-primary)]/90 transition-all hover:-translate-y-1"
                    >
                        <Sparkles className="w-5 h-5" />
                        Generate Recipes
                    </Link>
                </div>
            </main>
        </CookingLayout>
    );
}
