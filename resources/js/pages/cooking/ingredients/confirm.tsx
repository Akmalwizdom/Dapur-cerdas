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
    const [isGenerating, setIsGenerating] = useState(false);

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
                            name: d.name, // Use 'name' from backend mapping
                            confidence: Math.round(d.confidence * 100),
                            category: 'Detected'
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
        if (ingredients.length === 0 || isGenerating) return;

        console.log('Generating recipe with ingredients:', ingredients.map(i => i.name));
        setIsGenerating(true);
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
                setIsGenerating(false);
            }
        } catch (err: any) {
            alert('Failed to connect to recipe engine: ' + err.message);
            setIsGenerating(false);
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
                        {/* Page Layout: Image & List */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                            {/* Left Side: Image Preview */}
                            <div className="space-y-6">
                                {uploadedImage ? (
                                    <div className="sticky top-10">
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Your Photo</h3>
                                        <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
                                            <img 
                                                src={uploadedImage} 
                                                alt="Uploaded ingredients" 
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                            <div className="absolute bottom-6 left-8 flex items-center gap-3">
                                                <div className="size-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                                                <span className="text-white text-lg font-bold">Live Kitchen Scan</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-8 flex items-center gap-4">
                                            <Link href="/cooking/ingredients" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-[var(--cooking-border)] rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700">
                                                <Camera className="w-5 h-5 text-[var(--cooking-primary)]" />
                                                Scan Another
                                            </Link>
                                            <button 
                                                onClick={() => setIngredients([])}
                                                className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-[var(--cooking-border)] rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700"
                                            >
                                                <RefreshCw className="w-5 h-5 text-gray-400" />
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-[500px] bg-gray-100 rounded-3xl flex flex-col items-center justify-center border-4 border-dashed border-gray-200">
                                        <Camera className="w-16 h-16 text-gray-300 mb-4" />
                                        <p className="text-gray-400 font-bold">No photo available</p>
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Ingredient List */}
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Detected Ingredients ({ingredients.length})</h3>
                                    <button 
                                        onClick={() => setIsAddingManual(true)}
                                        className="text-[var(--cooking-primary)] font-bold text-sm flex items-center gap-1 hover:underline"
                                    >
                                        <Plus className="w-4 h-4" /> Add Manual
                                    </button>
                                </div>

                                {/* Manual Add Form */}
                                {isAddingManual && (
                                    <div className="p-6 bg-[var(--cooking-primary)]/5 rounded-2xl border-2 border-[var(--cooking-primary)]/20 animate-in slide-in-from-top-4">
                                        <h4 className="font-bold mb-3">Add missing item</h4>
                                        <div className="flex gap-3">
                                            <input 
                                                autoFocus
                                                type="text" 
                                                value={manualIngredient}
                                                onChange={(e) => setManualIngredient(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleAddManual()}
                                                placeholder="e.g. Soy Sauce..."
                                                className="flex-1 px-4 py-2 rounded-xl border-2 border-[var(--cooking-border)] focus:border-[var(--cooking-primary)] focus:outline-none"
                                            />
                                            <button onClick={handleAddManual} className="px-4 py-2 bg-[var(--cooking-primary)] text-white font-bold rounded-xl">Add</button>
                                            <button onClick={() => setIsAddingManual(false)} className="px-4 py-2 bg-gray-200 text-gray-600 font-bold rounded-xl">×</button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {ingredients.length === 0 ? (
                                        <div className="py-12 text-center text-gray-400 italic bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                            No ingredients found yet.
                                        </div>
                                    ) : (
                                        ingredients.map((ingredient) => (
                                            <div 
                                                key={ingredient.id}
                                                className="group flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-[var(--cooking-border)] hover:border-[var(--cooking-primary)]/30 transition-all shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`size-10 rounded-xl flex items-center justify-center ${ingredient.category === 'Detected' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                                        {ingredient.category === 'Detected' ? <Sparkles className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold font-['Newsreader',serif]">{ingredient.name}</h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-xs font-bold uppercase tracking-tight text-gray-400">{ingredient.category}</span>
                                                            <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">{ingredient.confidence}% confidence</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-gray-400 hover:text-[var(--cooking-primary)]"><Pencil className="w-5 h-5" /></button>
                                                    <button 
                                                        onClick={() => setIngredients(ingredients.filter(i => i.id !== ingredient.id))}
                                                        className="p-2 text-gray-400 hover:text-red-500"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recipe Generation Section */}
                        <div className="bg-[var(--cooking-primary)]/5 rounded-2xl p-8 border border-[var(--cooking-primary)]/20 flex flex-col md:flex-row items-center justify-between gap-6 mb-20 relative overflow-hidden">
                            {isGenerating && (
                                <div className="absolute top-0 left-0 h-1.5 w-1/2 bg-[var(--cooking-primary)] animate-[progress_1.5s_infinite_linear] rounded-full" />
                            )}
                            
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold font-['Newsreader',serif] mb-2">Ready to cook?</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {isGenerating 
                                        ? "DapurCerdas AI is crafting your recipes from the ingredients you provided..." 
                                        : `We'll find the best recipes matching your ${ingredients.length} ingredients, including pantry staples like olive oil and salt.`}
                                </p>
                            </div>
                            <button
                                onClick={handleGenerateRecipe}
                                disabled={isGenerating}
                                className={`w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 text-white text-lg font-bold rounded-xl shadow-lg transition-all ${
                                    isGenerating 
                                    ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                                    : 'bg-[var(--cooking-primary)] shadow-[var(--cooking-primary)]/20 hover:bg-[var(--cooking-primary)]/90 hover:-translate-y-1'
                                }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Generate Recipes
                                    </>
                                )}
                            </button>
                        </div>

                        <style dangerouslySetInnerHTML={{ __html: `
                            @keyframes progress {
                                0% { transform: translateX(-100%); }
                                100% { transform: translateX(200%); }
                            }
                        `}} />
                    </>
                )}
            </main>
        </CookingLayout>
    );
}
