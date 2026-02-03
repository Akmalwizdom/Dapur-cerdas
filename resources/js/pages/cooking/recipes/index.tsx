import CookingLayout from '@/layouts/cooking-layout';
import { Link, useForm, router } from '@inertiajs/react';
import { Clock, SignalHigh, ArrowRight, Heart, Trash2, Pencil, X, Plus, Save, Loader2, BookOpen, Sparkles } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Recipe {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
    cooking_time: number | null;
    difficulty: 'easy' | 'medium' | 'hard';
    ingredients: any[];
    instructions: string[];
    is_favorite: boolean;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedRecipes {
    data: Recipe[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    recipes: PaginatedRecipes;
}

export default function MyRecipes({ recipes }: Props) {
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: '',
        description: '',
        cooking_time: 0,
        difficulty: 'easy' as 'easy' | 'medium' | 'hard',
        ingredients: [] as any[],
        instructions: [] as string[],
        image_url: '',
    });

    const openEditModal = (recipe: Recipe) => {
        setEditingRecipe(recipe);
        setIsCreating(false);
        setData({
            title: recipe.title,
            description: recipe.description || '',
            cooking_time: recipe.cooking_time || 0,
            difficulty: recipe.difficulty,
            ingredients: Array.isArray(recipe.ingredients) ? [...recipe.ingredients] : [],
            instructions: Array.isArray(recipe.instructions) ? [...recipe.instructions] : [],
            image_url: recipe.image_url || '',
        });
    };

    const openCreateModal = () => {
        setEditingRecipe(null);
        setIsCreating(true);
        reset();
        setData({
            title: '',
            description: '',
            cooking_time: 30,
            difficulty: 'easy',
            ingredients: [{ name: '', amount: '' }],
            instructions: [''],
            image_url: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isCreating) {
            post('/cooking/recipes', {
                onSuccess: () => {
                    setIsCreating(false);
                    reset();
                },
            });
        } else if (editingRecipe) {
            patch(`/cooking/recipes/${editingRecipe.id}`, {
                onSuccess: () => {
                    setEditingRecipe(null);
                    reset();
                },
            });
        }
    };

    const confirmDelete = (id: number) => {
        setRecipeToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (!recipeToDelete) return;
        router.delete(`/cooking/recipes/${recipeToDelete}`, {
            onSuccess: () => setIsDeleteDialogOpen(false),
        });
    };

    const addIngredient = () => {
        setData('ingredients', [...data.ingredients, { name: '', amount: '' }]);
    };

    const removeIngredient = (index: number) => {
        const newIngs = [...data.ingredients];
        newIngs.splice(index, 1);
        setData('ingredients', newIngs);
    };

    const updateIngredient = (index: number, field: string, value: string) => {
        const newIngs = [...data.ingredients];
        newIngs[index] = { ...newIngs[index], [field]: value };
        setData('ingredients', newIngs);
    };

    const addInstruction = () => {
        setData('instructions', [...data.instructions, '']);
    };

    const removeInstruction = (index: number) => {
        const newInst = [...data.instructions];
        newInst.splice(index, 1);
        setData('instructions', newInst);
    };

    const updateInstruction = (index: number, value: string) => {
        const newInst = [...data.instructions];
        newInst[index] = value;
        setData('instructions', newInst);
    };

    return (
        <CookingLayout title="My Recipes - DapurCerdas">
            <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <span className="text-[var(--cooking-accent)] font-bold text-sm tracking-[0.2em] uppercase">
                            Collection
                        </span>
                        <h1 className="text-5xl font-bold font-['Newsreader',serif]">Management Resep</h1>
                        <p className="text-[var(--cooking-text-muted)] text-lg max-w-lg">
                            Kelola koleksi resep pribadi Anda yang dibuat oleh AI DapurCerdas.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/cooking/ingredients/input"
                            className="bg-white border-2 border-[var(--cooking-primary)] text-[var(--cooking-primary)] px-6 py-4 rounded-xl font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                        >
                            <Sparkles className="w-5 h-5" />
                            Magic AI
                        </Link>
                        <button
                            type="button"
                            onClick={openCreateModal}
                            className="bg-[var(--cooking-primary)] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Buat Manual
                        </button>
                    </div>
                </div>

                {recipes.data.length === 0 ? (
                    <div className="bg-white rounded-3xl border-2 border-dashed border-[var(--cooking-border)] p-20 text-center space-y-6 dark:bg-white/5 dark:border-white/10">
                        <div className="mx-auto size-24 bg-[var(--cooking-primary)]/10 rounded-full flex items-center justify-center text-[var(--cooking-primary)]">
                            <BookOpen className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold">Belum ada resep tersimpan</h3>
                        <div className="flex justify-center gap-4">
                            <Link href="/cooking/ingredients/input" className="inline-flex items-center gap-2 text-[var(--cooking-primary)] font-bold hover:underline">
                                <Sparkles className="w-4 h-4" /> Magic AI
                            </Link>
                            <span className="text-gray-300">|</span>
                            <button onClick={openCreateModal} className="inline-flex items-center gap-2 text-[var(--cooking-primary)] font-bold hover:underline">
                                <Plus className="w-4 h-4" /> Buat Manual
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* 4 Columns Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {recipes.data.map((recipe) => (
                                <div key={recipe.id} className="group relative bg-white rounded-2xl border border-[var(--cooking-border)] overflow-hidden hover:shadow-xl transition-all dark:bg-[var(--cooking-card-dark)] dark:border-white/10">
                                    {/* Link covers the image part for clicking */}
                                    <Link href={`/cooking/recipes/${recipe.id}`} className="block relative aspect-video overflow-hidden">
                                        <div 
                                            className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url("${recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800'}")` }}
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white/90 text-[var(--cooking-primary)] px-4 py-2 rounded-full font-bold text-sm shadow-sm scale-90 group-hover:scale-100 transition-transform">
                                                Lihat Resep
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="p-5 space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" />
                                                {recipe.cooking_time || 30}m
                                            </div>
                                            <div className="px-2 py-0.5 bg-gray-100 rounded dark:bg-white/10">
                                                {recipe.difficulty}
                                            </div>
                                        </div>
                                        
                                        <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-[var(--cooking-primary)] transition-colors">
                                            {recipe.title}
                                        </h3>

                                        <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-white/5">
                                            <button 
                                                onClick={() => openEditModal(recipe)}
                                                className="p-2 text-gray-400 hover:text-[var(--cooking-primary)] hover:bg-[var(--cooking-primary)]/5 rounded-lg transition-all"
                                                title="Edit Resep"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => confirmDelete(recipe.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Hapus Resep"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {recipes.last_page > 1 && (
                            <div className="flex justify-center gap-2 pb-10">
                                {recipes.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                            link.active 
                                            ? 'bg-[var(--cooking-primary)] text-white shadow-lg shadow-[var(--cooking-primary)]/20' 
                                            : 'bg-white border border-[var(--cooking-border)] hover:bg-gray-50 dark:bg-white/5 dark:border-white/10'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed hidden sm:block' : ''}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* --- Modals --- */}
                
                {/* Create/Edit Modal */}
                <Dialog open={isCreating || !!editingRecipe} onOpenChange={(open) => {
                    if (!open) {
                        setIsCreating(false);
                        setEditingRecipe(null);
                    }
                }}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-['Newsreader',serif]">
                                {isCreating ? 'Buat Resep Baru' : 'Edit Resep'}
                            </DialogTitle>
                            <DialogDescription>
                                {isCreating ? 'Tulis resep kreasi Anda sendiri dari awal.' : 'Sesuaikan detail resep agar lebih pas dengan selera Anda.'}
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                            {/* General Info */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Nama Masakan</Label>
                                    <Input 
                                        id="title" 
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)} 
                                        placeholder="Contoh: Nasi Goreng Spesial"
                                    />
                                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image_url">Foto Masakan (URL)</Label>
                                    <Input 
                                        id="image_url" 
                                        value={data.image_url} 
                                        onChange={e => setData('image_url', e.target.value)} 
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Durasi (Menit)</Label>
                                        <Input 
                                            id="time" 
                                            type="number" 
                                            value={data.cooking_time} 
                                            onChange={e => setData('cooking_time', parseInt(e.target.value))} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Kesulitan</Label>
                                        <Select 
                                            value={data.difficulty} 
                                            onValueChange={(val: any) => setData('difficulty', val)}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="easy">Easy</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="hard">Hard</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="desc">Deskripsi Singkat</Label>
                                    <Textarea 
                                        id="desc" 
                                        value={data.description} 
                                        onChange={e => setData('description', e.target.value)}
                                        className="h-24"
                                    />
                                </div>
                            </div>

                            {/* Ingredients & Instructions */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="uppercase tracking-widest text-[10px] font-bold text-gray-500">Bahan-bahan</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addIngredient} className="h-7 gap-1">
                                            <Plus className="w-3 h-3" /> Tambah
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {data.ingredients.map((ing, idx) => (
                                            <div key={idx} className="flex gap-2 items-center">
                                                <Input 
                                                    placeholder="Nama bahan" 
                                                    value={ing.name} 
                                                    onChange={e => updateIngredient(idx, 'name', e.target.value)}
                                                    className="flex-[2]"
                                                />
                                                <Input 
                                                    placeholder="Jumlah" 
                                                    value={ing.amount} 
                                                    onChange={e => updateIngredient(idx, 'amount', e.target.value)}
                                                    className="flex-1"
                                                />
                                                <button type="button" onClick={() => removeIngredient(idx)} className="text-gray-400 hover:text-red-500">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="uppercase tracking-widest text-[10px] font-bold text-gray-500">Langkah Memasak</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addInstruction} className="h-7 gap-1">
                                            <Plus className="w-3 h-3" /> Tambah
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {data.instructions.map((inst, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold mt-2">
                                                    {idx + 1}
                                                </span>
                                                <Textarea 
                                                    value={inst} 
                                                    onChange={e => updateInstruction(idx, e.target.value)}
                                                    className="min-h-[60px]"
                                                />
                                                <button type="button" onClick={() => removeInstruction(idx)} className="text-gray-400 hover:text-red-500 mt-2">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="md:col-span-2 pt-6 border-t dark:border-white/10">
                                <Button type="button" variant="ghost" onClick={() => {
                                    setEditingRecipe(null);
                                    setIsCreating(false);
                                }}>Batal</Button>
                                <Button type="submit" disabled={processing} className="bg-[var(--cooking-primary)] hover:bg-[var(--cooking-primary)]/90 gap-2">
                                    {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Simpan Resep
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Resep?</DialogTitle>
                            <DialogDescription>Tindakan ini tidak dapat dibatalkan. Resep Anda akan dihapus permanen dari sistem.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2">
                            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>Batal</Button>
                            <Button variant="destructive" onClick={handleDelete}>Ya, Hapus Resep</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Aesthetic Background Decoration */}
                <div className="fixed -bottom-20 -right-20 size-96 bg-[var(--cooking-primary)]/5 rounded-full blur-3xl -z-10" />
            </main>
        </CookingLayout>
    );
}
