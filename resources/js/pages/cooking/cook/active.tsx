import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';
import { Utensils, Egg, PlayCircle, ArrowLeft, ArrowRight, Mic } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ActiveCooking() {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return {
            mins: String(mins).padStart(2, '0'),
            secs: String(secs).padStart(2, '0')
        };
    };

    const timeValues = formatTime(timeLeft);

    return (
        <CookingLayout title="Cooking Mode - DapurCerdas" showNav={false}>
            <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[var(--cooking-bg-light)] dark:bg-[var(--cooking-bg-dark)]">
                {/* Top Progress Bar Section */}
                <header className="w-full pt-6 pb-2">
                    <div className="max-w-[1200px] mx-auto px-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-2">
                                    <Utensils className="w-5 h-5 text-[var(--cooking-primary)]" />
                                    <p className="text-sm font-bold uppercase tracking-widest text-[var(--cooking-primary)]">
                                        Classic Beef Bourguignon
                                    </p>
                                </div>
                                <p className="text-lg font-bold leading-none">Step 3 of 12</p>
                            </div>
                            <div className="h-2 w-full rounded-full bg-[var(--cooking-border)] dark:bg-white/10">
                                <div className="h-2 rounded-full bg-[var(--cooking-primary)]" style={{ width: '25%' }} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col items-center justify-center px-8 text-center max-w-[1200px] mx-auto w-full">
                    {/* Instructional Image */}
                    <div className="mb-8 w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-sm border border-[var(--cooking-border)] bg-white dark:bg-white/5 dark:border-white/10">
                        <img 
                            alt="Instructional cooking step" 
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAhtgPYQCxj2n8NbLkGfDSqLbJlWUPXBXOplsykvnsoLfYHAvleXsw4QpeL36mU0Cn607P6GufbS5H0L7HvWAE7o6cVRkVyPomM8BkULH3lXNy6NciY48cl4HPg-9g3Yr7bjWE9WcAWfIXMpstJcO0ZRaGJgiER_Kxvn0OaOlFDOKQ2lDb-T8gmaxZXOdv0T0S1ZwKC9ugY9CIW-iaLX8jsr7kmZSPNEK6j_yVAy1X3X7Vbf0mtcWn7cPJomK7unA23vhFfviTK1Ch"
                        />
                    </div>
                    
                    {/* Extra Large Instruction */}
                    <h1 className="text-[var(--cooking-text)] dark:text-white tracking-tight text-5xl md:text-6xl font-extrabold leading-[1.15] mb-8 font-['Newsreader',serif]">
                        Chop the onions finely into 1cm cubes, ensuring uniform size for even cooking.
                    </h1>

                    {/* Ingredients/Tools Shortcut */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <div className="flex items-center gap-3 rounded-lg border border-[var(--cooking-primary)]/30 bg-[var(--cooking-primary)]/5 px-6 py-3">
                            <Egg className="w-6 h-6 text-[var(--cooking-primary)]" />
                            <span className="text-lg font-bold">2 Large Onions</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-[var(--cooking-primary)]/30 bg-[var(--cooking-primary)]/5 px-6 py-3">
                            <Utensils className="w-6 h-6 text-[var(--cooking-primary)]" />
                            <span className="text-lg font-bold">Chef's Knife</span>
                        </div>
                    </div>

                    {/* Timer Widget */}
                    <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-[var(--cooking-accent)]/10 border border-[var(--cooking-accent)]/20">
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-neutral-800">
                                    <p className="text-[var(--cooking-accent)] text-3xl font-bold font-['Newsreader',serif]">{timeValues.mins}</p>
                                </div>
                                <p className="text-xs font-bold uppercase mt-2 tracking-tighter opacity-70">Minutes</p>
                            </div>
                            <div className="text-3xl font-bold flex items-center h-16 pt-0 text-[var(--cooking-accent)]">:</div>
                            <div className="flex flex-col items-center">
                                <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-neutral-800">
                                    <p className="text-[var(--cooking-accent)] text-3xl font-bold font-['Newsreader',serif]">{timeValues.secs}</p>
                                </div>
                                <p className="text-xs font-bold uppercase mt-2 tracking-tighter opacity-70">Seconds</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsActive(!isActive)}
                            className="mt-4 flex items-center gap-2 text-[var(--cooking-accent)] font-bold uppercase tracking-widest text-sm"
                        >
                            <PlayCircle className="w-5 h-5" />
                            {isActive ? 'Pause Timer' : 'Start Timer'}
                        </button>
                    </div>
                </main>

                {/* Bottom Navigation */}
                <footer className="w-full bg-white border-t border-[var(--cooking-border)] py-6 px-8 dark:bg-[var(--cooking-bg-dark)] dark:border-white/10">
                    <div className="max-w-[1200px] mx-auto flex gap-6">
                        <button className="flex-1 flex items-center justify-center gap-3 h-20 rounded-xl bg-gray-100 text-[var(--cooking-text)] text-xl font-bold transition-all hover:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                            <ArrowLeft className="w-6 h-6" />
                            <span>Back</span>
                        </button>
                        <Link 
                            href="/cooking/cook/1/feedback"
                            className="flex-[2] flex items-center justify-center gap-3 h-20 rounded-xl bg-[var(--cooking-primary)] text-white text-2xl font-bold transition-all hover:brightness-110 shadow-lg shadow-[var(--cooking-primary)]/20"
                        >
                            <span>Next Step</span>
                            <ArrowRight className="w-7 h-7" />
                        </Link>
                    </div>
                    {/* Voice Hint */}
                    <div className="flex justify-center mt-4">
                        <div className="flex items-center gap-2 text-sm opacity-50 font-bold uppercase tracking-widest">
                            <Mic className="w-4 h-4" />
                            Say "Next" to advance
                        </div>
                    </div>
                </footer>
            </div>
        </CookingLayout>
    );
}
