import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';
import { Clock, SignalHigh, ArrowRight, Heart, Trash2, BookOpen } from 'lucide-react';

interface Recipe {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
    cooking_time: number | null;
    difficulty: 'easy' | 'medium' | 'hard';
    is_favorite: boolean;
    created_at: string;
}

interface Props {
    recipes: Recipe[];
}

export default function MyRecipes({ recipes }: Props) {
    return (
        <CookingLayout title="My Recipes - DapurCerdas">
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <span className="text-[var(--cooking-accent)] font-bold text-sm tracking-[0.2em] uppercase">
                            Collection
                        </span>
                        <h1 className="text-5xl font-bold font-['Newsreader',serif]">Management Resep</h1>
                        <p className="text-[var(--cooking-text-muted)] text-lg max-w-lg">
                            Daftar resep yang telah Anda buat bersama DapurCerdas AI. Simpan dan masak kapan saja.
                        </p>
                    </div>
                </div>

                {recipes.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-3xl border-2 border-dashed border-[var(--cooking-border)] p-20 text-center space-y-6 dark:bg-white/5 dark:border-white/10">
                        <div className="mx-auto size-24 bg-[var(--cooking-primary)]/10 rounded-full flex items-center justify-center text-[var(--cooking-primary)]">
                            <BookOpen className="w-12 h-12" />
                        </div>
                        <div className="max-w-md mx-auto space-y-2">
                            <h3 className="text-2xl font-bold font-['Newsreader',serif]">Belum ada resep tersimpan</h3>
                            <p className="text-[var(--cooking-text-muted)]">
                                Mulai dengan memotret bahan di dapur Anda dan biarkan AI kami berkreasi.
                            </p>
                        </div>
                        <Link
                            href="/cooking/ingredients/input"
                            className="inline-flex items-center gap-2 bg-[var(--cooking-primary)] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[var(--cooking-primary)]/20 hover:scale-105 transition-all"
                        >
                            Tambah Bahan Masakan
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    /* Grid List */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="group flex flex-col bg-white rounded-2xl border border-[var(--cooking-border)] overflow-hidden hover:shadow-2xl hover:shadow-[var(--cooking-primary)]/5 transition-all duration-500 dark:bg-[var(--cooking-card-dark)] dark:border-white/10">
                                {/* Image Overlay */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <div 
                                        className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url("${recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800'}")` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Action Buttons Overlay */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <button className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-colors ${recipe.is_favorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'}`}>
                                            <Heart className={`w-5 h-5 ${recipe.is_favorite ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>

                                    <div className="absolute bottom-4 left-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[var(--cooking-primary)] text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                                            {recipe.difficulty}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-medium text-[var(--cooking-text-muted)]">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{recipe.cooking_time || 30} mins</span>
                                            <span>•</span>
                                            <span>{new Date(recipe.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold font-['Newsreader',serif] leading-tight group-hover:text-[var(--cooking-primary)] transition-colors line-clamp-2">
                                            {recipe.title}
                                        </h3>
                                        <p className="text-[var(--cooking-text-muted)] text-sm line-clamp-2 leading-relaxed">
                                            {recipe.description || "Generated creatively by DapurCerdas AI."}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-[var(--cooking-border)] flex items-center justify-between dark:border-white/10">
                                        <Link
                                            href={`/cooking/recipes/${recipe.id}`}
                                            className="text-sm font-bold text-[var(--cooking-primary)] flex items-center gap-1.5 hover:gap-2.5 transition-all"
                                        >
                                            View Details
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Aesthetic Background Decoration */}
                <div className="fixed -bottom-20 -right-20 size-96 bg-[var(--cooking-primary)]/5 rounded-full blur-3xl -z-10" />
                <div className="fixed top-20 -left-20 size-72 bg-[var(--cooking-accent)]/5 rounded-full blur-3xl -z-10" />
            </main>
        </CookingLayout>
    );
}
