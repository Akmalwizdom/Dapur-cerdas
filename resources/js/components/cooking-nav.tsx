import { Link } from '@inertiajs/react';
import { Menu, Search, User } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { title: 'Recipes', href: '/cooking/recipes' },
    { title: 'Pantry', href: '/cooking/ingredients/input' },
    { title: 'Meal Plan', href: '/dashboard' },
];

export default function CookingNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--cooking-border)] px-6 md:px-10 lg:px-40 py-4 dark:bg-[var(--cooking-bg-dark)]/80 dark:border-white/10">
            <div className="flex items-center justify-between max-w-[1200px] mx-auto w-full">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="size-8 bg-[var(--cooking-primary)] rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">restaurant</span>
                        </div>
                        <h2 className="text-xl font-bold leading-tight tracking-tight font-['Newsreader',serif]">
                            DapurCerdas
                        </h2>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="text-sm font-medium text-[var(--cooking-text)] hover:text-[var(--cooking-primary)] transition-colors dark:text-white/80"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <label className="hidden sm:flex items-center min-w-40 h-10 max-w-64">
                        <div className="flex w-full items-stretch rounded-xl bg-gray-100 px-3 dark:bg-white/10">
                            <Search className="flex items-center text-gray-500 w-5 h-5 my-auto" />
                            <input
                                className="w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-gray-500 px-3 py-2"
                                placeholder="Search recipes..."
                            />
                        </div>
                    </label>

                    {/* User Avatar */}
                    <div className="size-10 rounded-full border-2 border-[var(--cooking-primary)]/20 bg-gray-100 flex items-center justify-center dark:bg-white/10">
                        <User className="w-5 h-5 text-gray-500" />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="md:hidden mt-4 pt-4 border-t border-[var(--cooking-border)] dark:border-white/10">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="text-base font-medium text-[var(--cooking-text)] hover:text-[var(--cooking-primary)] transition-colors dark:text-white/80"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
