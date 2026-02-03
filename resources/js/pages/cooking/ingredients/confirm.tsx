import CookingLayout from '@/layouts/cooking-layout';
import { Link, router } from '@inertiajs/react';
import { Camera, RefreshCw, Pencil, Trash2, Plus, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ConfirmIngredients() {
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [status, setStatus] = useState<'loading' | 'processing' | 'completed' | 'failed'>('loading');
    const [error, setError] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [manualIngredient, setManualIngredient] = useState('');
    const [isAddingManual, setIsAddingManual] = useState(false);

    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('job_id');

    useEffect(() => {
        if (!jobId) {
            setStatus('completed'); // Assuming manual entry if no jobId
            return;
        }

        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(`/cooking/ingredients/jobs/${jobId}`);
                const data = await response.json();

                if (data.success) {
                    const jobStatus = data.data.status;
                    if (data.data.image_url) {
                        setUploadedImage(data.data.image_url);
                    }
                    if (jobStatus === 'completed') {
                        setIngredients(data.data.results.map((d: any, index: number) => ({
                            id: `ai-${index}`,
                            name: d.class_name,
                            confidence: Math.round(d.confidence * 100),
                            category: 'Detected',
                            image: data.data.image_url || 'https://via.placeholder.com/150?text=' + d.class_name
                        })));
                        setStatus('completed');
                        clearInterval(pollInterval);
                    } else if (jobStatus === 'failed') {
                        setStatus('failed');
                        setError(data.data.error || 'Detection failed');
                        clearInterval(pollInterval);
                    } else {
                        setStatus('processing');
                    }
                }
            } catch (err) {
                console.error('Polling error:', err);
            }
        }, 2000);

        return () => clearInterval(pollInterval);
    }, [jobId]);

    const handleGenerateRecipe = async () => {
        if (ingredients.length === 0) return;

        try {
            const response = await fetch('/cooking/recipes/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
                },
                body: JSON.stringify({
                    ingredients: ingredients.map(i => i.name)
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Generation failed');
            }

            const data = await response.json();
            if (data.success) {
                router.visit(`/cooking/recipes/${data.data.id}`);
            } else {
                alert('Generation failed: ' + data.message);
            }
        } catch (err: any) {
            alert('Failed to connect to recipe engine: ' + err.message);
        }
    };

    const handleAddManual = () => {
        if (manualIngredient.trim()) {
            setIngredients([
                ...ingredients,
                {
                    id: `manual-${Date.now()}`,
                    name: manualIngredient.trim(),
                    confidence: 100,
                    category: 'Manual',
                    image: 'https://via.placeholder.com/150?text=' + manualIngredient.trim()
                }
            ]);
            setManualIngredient('');
            setIsAddingManual(false);
        }
    };
    return (
        <CookingLayout title="Confirm Ingredients - DapurCerdas" showFooter>
            <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 lg:px-40 py-10">
                {/* Page Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight font-['Newsreader',serif]">
                        {status === 'processing' ? 'Analyzing your kitchen...' : 'Is this everything?'}
                    </h1>
                    <p className="text-[var(--cooking-text-muted)] text-lg mt-3 max-w-2xl">
                        {status === 'processing' 
                            ? "Our AI is scanning your photo to identify ingredients. This usually takes just a few seconds." 
                            : `We detected ${ingredients.length} ingredients. Add anything we missed or adjust the list below.`}
                    </p>
                </div>

                {/* State-specific UI */}
                {(status === 'loading' || status === 'processing') && (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/50 border-2 border-dashed border-[var(--cooking-border)] rounded-2xl mb-12">
                        <Loader2 className="w-16 h-16 text-[var(--cooking-primary)] animate-spin mb-6" />
                        <h3 className="text-2xl font-bold font-['Newsreader',serif]">Identifying Ingredients...</h3>
                        <p className="text-gray-500 mt-2 italic">Running YOLO detection on your server</p>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="flex flex-col items-center justify-center py-20 bg-red-50 border-2 border-dashed border-red-200 rounded-2xl mb-12">
                        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
                        <h3 className="text-2xl font-bold font-['Newsreader',serif] text-red-800">Something went wrong</h3>
                        <p className="text-red-600 mt-2">{error || 'Failed to analyze photo.'}</p>
                        <Link href="/cooking/ingredients" className="mt-6 font-bold text-[var(--cooking-primary)] hover:underline">
                            Try again with a different photo
                        </Link>
                    </div>
                )}

                {status === 'completed' && (
                    <>
                        {/* Uploaded Image Preview */}
                        {uploadedImage && (
                            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Uploaded Photo</h3>
                                <div className="relative aspect-video max-h-[400px] w-full md:w-2/3 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                                    <img 
                                        src={uploadedImage} 
                                        alt="Uploaded ingredients" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                    <div className="absolute bottom-4 left-6 flex items-center gap-2">
                                        <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-white text-sm font-bold">Original Image</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Bar Quick Links */}
                        <div className="flex items-center gap-4 mb-8">
                            <Link href="/cooking/ingredients" className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--cooking-border)] rounded-xl hover:bg-gray-50 transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10">
                                <Camera className="w-5 h-5 text-[var(--cooking-primary)]" />
                                <span className="text-sm font-semibold">Scan More</span>
                            </Link>
                            <button 
                                onClick={() => setIngredients([])}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--cooking-border)] rounded-xl hover:bg-gray-50 transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                            >
                                <RefreshCw className="w-5 h-5 text-gray-500" />
                                <span className="text-sm font-semibold">Reset List</span>
                            </button>
                        </div>

                        {/* Ingredient Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                            {ingredients.map((ingredient) => (
                                <div
                                    key={ingredient.id}
                                    className="bg-white rounded-xl overflow-hidden border border-[var(--cooking-border)] shadow-sm hover:shadow-md transition-shadow group dark:bg-[var(--cooking-card-dark)] dark:border-white/10"
                                >
                                    <div
                                        className="relative h-48 w-full bg-center bg-cover"
                                        style={{ backgroundImage: `url("${ingredient.image}")` }}
                                    >
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => setIngredients(ingredients.filter(i => i.id !== ingredient.id))}
                                                className="bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 shadow-sm"
                                            >
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
                            <div 
                                onClick={() => setIsAddingManual(true)}
                                className="flex flex-col items-center justify-center p-6 bg-transparent border-2 border-dashed border-[var(--cooking-border)] rounded-xl min-h-[12rem] text-center hover:bg-[var(--cooking-primary)]/5 transition-colors cursor-pointer group dark:border-white/20"
                            >
                                <div className="bg-[var(--cooking-primary)]/10 text-[var(--cooking-primary)] p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <Plus className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold font-['Newsreader',serif]">Missing something?</h4>
                                <p className="text-sm text-[var(--cooking-text-muted)] mt-1">Tap to add an ingredient manually</p>
                            </div>
                        </div>

                        {/* Manual Add Dialog / Inline form */}
                        {isAddingManual && (
                            <div className="mb-8 p-6 bg-white rounded-2xl border-2 border-[var(--cooking-primary)]/30 animate-in zoom-in-95 dark:bg-white/5">
                                <h3 className="text-xl font-bold font-['Newsreader',serif] mb-4">Add Missing Ingredient</h3>
                                <div className="flex gap-4">
                                    <input 
                                        autoFocus
                                        type="text" 
                                        value={manualIngredient}
                                        onChange={(e) => setManualIngredient(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddManual()}
                                        placeholder="e.g. Scallions, Oyster Sauce..."
                                        className="flex-1 px-4 py-3 rounded-xl border border-[var(--cooking-border)] focus:outline-none focus:ring-2 focus:ring-[var(--cooking-primary)]/20"
                                    />
                                    <button 
                                        onClick={handleAddManual}
                                        className="px-6 py-3 bg-[var(--cooking-primary)] text-white font-bold rounded-xl"
                                    >
                                        Add
                                    </button>
                                    <button 
                                        onClick={() => setIsAddingManual(false)}
                                        className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Recipe Generation Section */}
                        <div className="bg-[var(--cooking-primary)]/5 rounded-2xl p-8 border border-[var(--cooking-primary)]/20 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold font-['Newsreader',serif] mb-2">Ready to cook?</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We'll find the best recipes matching your {ingredients.length} ingredients, including pantry staples like olive oil and salt.
                                </p>
                            </div>
                            <button
                                onClick={handleGenerateRecipe}
                                className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[var(--cooking-primary)] text-white text-lg font-bold rounded-xl shadow-lg shadow-[var(--cooking-primary)]/20 hover:bg-[var(--cooking-primary)]/90 transition-all hover:-translate-y-1"
                            >
                                <Sparkles className="w-5 h-5" />
                                Generate Recipes
                            </button>
                        </div>
                    </>
                )}
            </main>
        </CookingLayout>
    );
}
