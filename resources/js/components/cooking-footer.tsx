import { Link } from '@inertiajs/react';

export default function CookingFooter() {
    return (
        <footer className="w-full bg-white border-t border-[var(--cooking-border)] py-12 px-6 dark:bg-[var(--cooking-bg-dark)] dark:border-white/10 mt-auto">
            <div className="max-w-[1204px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-2xl font-bold font-['Newsreader',serif] italic text-[var(--cooking-primary)]">DapurCerdas</span>
                        <p className="text-[var(--cooking-text-muted)] text-sm mt-2">Elevating every kitchen with intelligent recipes.</p>
                    </div>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--cooking-text)] dark:text-white">Pantry</h4>
                            <Link href="/cooking/ingredients/input" className="text-sm text-[var(--cooking-text-muted)] hover:text-[var(--cooking-primary)] transition-colors">Add Ingredients</Link>
                            <Link href="/cooking/ingredients/confirm" className="text-sm text-[var(--cooking-text-muted)] hover:text-[var(--cooking-primary)] transition-colors">Confirm Inventory</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--cooking-text)] dark:text-white">Recipes</h4>
                            <Link href="/cooking/recipes" className="text-sm text-[var(--cooking-text-muted)] hover:text-[var(--cooking-primary)] transition-colors">Browse All</Link>
                            <Link href="/dashboard" className="text-sm text-[var(--cooking-text-muted)] hover:text-[var(--cooking-primary)] transition-colors">Recommendations</Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-[var(--cooking-border)] flex flex-col md:flex-row justify-between items-center gap-4 dark:border-white/5">
                    <p className="text-[var(--cooking-text-muted)] text-xs">
                        &copy; {new Date().getFullYear()} DapurCerdas. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-[var(--cooking-text-muted)] hover:text-[var(--cooking-primary)] transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-[var(--cooking-text-muted)] hover:text-[var(--cooking-primary)] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
