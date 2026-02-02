import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';

const recentRecipes = [
    {
        id: 1,
        title: 'Roasted Root Vegetables with Thyme',
        meta: '45 Minutes • Simple • Vegetarian',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL3bBA0vRDaU2XTIneKhVAdyp_TEM_0n1vraiBKmtbwnvSYTtpVQSt0zKT8IzfVX5tR3AcJIoAlNJuQu3qa8tFy9-IfY8Nhb-U1SunkHcPp14N6fSaBFFsP8BFxHCjQdsVkZPzxK46xq5nPmD9WNCsP6cXFpJKq7kPcswzrEGHs9DabLDsyW01ZXzN4zKXWOKUNq1xVVyzj5vkGr_Cq-Ih8D5281dWfBzOebCjMSN5PoMzznzCGOqRG6UP5f0-2A26oNBEGWSGDvQX',
    },
    {
        id: 2,
        title: 'Lemon Garlic Linguine',
        meta: '20 Minutes • Easy • Classic',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1o3d84DQBT0ll1LUYgYNB2ow96n46HaoYWX2Porckz2zUStSWkQhpFuAhseeKPJCJmBxHfpmOmOtNxI4WuyChYtwQwipAU2H51lWX4bytNDYPjsT9h1Tm7Z7GoFMVNZbwXKW1-j8byacXLWlcb4JSu_pIGf6vmecUbEtATgkIvjWuFTFvfkDtUU99Dw2Kv4LM8L2unLOfYnp8Kk8SphfKAMAMEwYpARts3TG_ZSjmZO3ZdZm2g5HsskBP4IAduLYXgZHVGBSkyu2g',
    },
];

export default function CookingHome() {
    return (
        <CookingLayout title="Home - DapurCerdas">
            <div className="flex flex-1 justify-center py-12">
                <div className="flex flex-col max-w-[800px] flex-1 px-4">
                    {/* Headline Section */}
                    <div className="pb-8 pt-12 space-y-4">
                        <h1 className="tracking-tight text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-center font-['Newsreader',serif] italic">
                            What's in your pantry today?
                        </h1>
                        <p className="text-[var(--cooking-text-muted)] text-lg md:text-xl font-normal leading-relaxed text-center max-w-lg mx-auto">
                            Transform your available ingredients into a chef-curated meal.
                        </p>
                    </div>

                    {/* Button Group */}
                    <div className="flex justify-center pb-20">
                        <div className="flex flex-1 gap-4 max-w-[520px] flex-col sm:flex-row items-stretch px-4">
                            <Link
                                href="/cooking/ingredients/input"
                                className="flex-1 flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-[var(--cooking-primary)] text-white text-lg font-bold leading-normal tracking-wide shadow-sm hover:brightness-95 transition-all"
                            >
                                <span className="truncate">Cook with ingredients</span>
                            </Link>
                            <Link
                                href="/cooking/ingredients/input?action=upload"
                                className="flex-1 flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-gray-100 text-[var(--cooking-text)] text-lg font-bold leading-normal tracking-wide hover:bg-gray-200 transition-all dark:bg-white/10 dark:text-white"
                            >
                                <span className="truncate">Use ingredient photo</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Inspirations Section */}
                    <div className="px-4">
                        <div className="flex items-baseline justify-between border-t border-[var(--cooking-border)] pt-12 pb-8 dark:border-white/10">
                            <h2 className="text-2xl font-bold font-['Newsreader',serif] italic">
                                Recent Inspirations
                            </h2>
                            <Link
                                href="/cooking/recipes"
                                className="text-[var(--cooking-primary)] text-sm font-bold uppercase tracking-widest"
                            >
                                View All
                            </Link>
                        </div>

                        {/* Recipe Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {recentRecipes.map((recipe) => (
                                <Link
                                    key={recipe.id}
                                    href={`/cooking/recipes/${recipe.id}`}
                                    className="flex flex-col group cursor-pointer"
                                >
                                    <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 mb-4">
                                        <img
                                            alt={recipe.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={recipe.image}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold font-['Newsreader',serif]">
                                        {recipe.title}
                                    </h3>
                                    <p className="text-sm text-[var(--cooking-text-muted)] font-medium mt-1 uppercase tracking-tighter">
                                        {recipe.meta}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Quote */}
                    <div className="py-24 px-4 text-center">
                        <div className="max-w-md mx-auto border-t border-[var(--cooking-border)] pt-8 italic opacity-40 dark:border-white/10">
                            "The kitchen is the heart of every home, and every ingredient tells a story."
                        </div>
                    </div>
                </div>
            </div>
        </CookingLayout>
    );
}
