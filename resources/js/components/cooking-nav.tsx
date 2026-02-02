import { Link, router, usePage } from '@inertiajs/react';
import { Menu, Search, User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const navItems = [
    { title: 'Recipes', href: '/cooking/recipes' },
    { title: 'Pantry', href: '/cooking/ingredients/input' },
    { title: 'Meal Plan', href: '/dashboard' },
];

export default function CookingNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { auth } = usePage<any>().props;
    const user = auth?.user;

    const handleLogout = () => {
        router.post('/logout');
    };

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

                    {/* User Profile Dropdown */}
                    <div className="relative group/profile">
                        <button 
                            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-white/10"
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                            <div className="size-10 rounded-full border-2 border-[var(--cooking-primary)]/20 bg-[var(--cooking-primary)]/5 flex items-center justify-center dark:bg-white/10">
                                <User className="w-5 h-5 text-[var(--cooking-primary)]" />
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {userMenuOpen && (
                            <>
                                <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={() => setUserMenuOpen(false)}
                                />
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-[var(--cooking-border)] overflow-hidden z-50 py-2 animate-in fade-in slide-in-from-top-2 dark:bg-[var(--cooking-bg-dark)] dark:border-white/10">
                                    <div className="px-5 py-3 border-b border-[var(--cooking-border)] mb-2 dark:border-white/10">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                                        <p className="text-sm font-bold truncate dark:text-white">
                                            {user?.name || 'Chef'}
                                        </p>
                                    </div>
                                    
                                    <Link 
                                        href="/settings/profile"
                                        className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-600 hover:bg-[var(--cooking-primary)]/5 hover:text-[var(--cooking-primary)] transition-colors dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Profile Settings
                                    </Link>

                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-red-950/30"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        )}
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
