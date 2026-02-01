import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import CookingNav from '@/components/cooking-nav';
import CookingFooter from '@/components/cooking-footer';

interface Props {
    children: ReactNode;
    title?: string;
    showNav?: boolean;
    showFooter?: boolean;
}

export default function CookingLayout({
    children,
    title = 'DapurCerdas',
    showNav = true,
    showFooter = false,
}: Props) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-[var(--cooking-bg-light)] text-[var(--cooking-text)] font-sans transition-colors duration-200 dark:bg-[var(--cooking-bg-dark)] dark:text-white flex flex-col">
                {showNav && <CookingNav />}
                <main className="flex-1 flex flex-col">{children}</main>
                {showFooter && <CookingFooter />}
            </div>
        </>
    );
}
