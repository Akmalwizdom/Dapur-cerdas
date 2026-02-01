import CookingLayout from '@/layouts/cooking-layout';
import { Link } from '@inertiajs/react';
import { Utensils, Smile, Meh, Frown, Check, FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';

const sentiments = [
    {
        id: 'success',
        title: 'Success',
        description: "Perfect! I'd make this again exactly the same.",
        icon: Smile,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYq5JQRYg-MqTxLNTePA7RPe30jvL7El1aoqYLq4KI94X4EEjUpDgiRykuz1Yg1xVH1ijR_cs5gqj0vzE8JiSRL3WkA09GFloSc6D5ozvq63WyWkZhpXR0DtowDTaRxSIZNsPVB__RdZY8Vg4kIxAdd1BpYWN6IuU_aGSSlfvb1eklE2cG5vtn4MkSLQYmW-9k1yUOHcB2lBcjiezUA_vCvFl7ySNfTCkRoZeJWOhB1tV9yjBIXZOaekqoA0asyw8ZsKH4BURi1atu'
    },
    {
        id: 'partial',
        title: 'Partial Success',
        description: 'Good, but needs a few tweaks.',
        icon: Meh,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6imyFQSn4HIwX-EchRN56XM9zdbGQPoPnjGfYk18ej6torgJrvvFu7on3aSnukthWfmKiArJvwcwBjgvR0-GIMyff8R3LaeePf_wZ5gu-Ug0XJjdeYaowhe0kjjreNv4cGHVxTBx0u9h12aFJf5zGhJ9b5EH9TgPVENRTewRg5Hs3lp4yeguvzDajnK8uQFZ1ns1_QviFui0d83MHWYVpjiV9n77GUnS5ZEdyIVM06QWzn902ajnlLEfZ1L4lEKH4CHTK3iCi5xS3'
    },
    {
        id: 'better',
        title: 'Could be better',
        description: "Not quite right, let's figure out why.",
        icon: Frown,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo-ors22Y8UUj3_XVmk9yEutN20rCmpx3dNXTfXXxIwb-ia54ep2N6g65qwGn1wC5dc4RR-APV1WEgQo6L1O2UFzLhJBEfKxVZ4W6_7aJ1K-OWvoKDHxwBQGdKp7aOq4BXDIO2dvqmZ0c24wrAioI_1ZR9bYW87h5hTjGPa7CyF2JKAeqZUon1-7cFuX2ngvoLH8CVUL-ctUdt380uQb5bOn6Nqgl8WUI9uEReb6iumwBh1o7RtzbMuCJ6Wb8x56jBNbMGQiRS73xU'
    }
];

export default function PostCookingFeedback() {
    const [selectedId, setSelectedId] = useState('partial');

    return (
        <CookingLayout title="Feedback - DapurCerdas" showFooter>
            <main className="flex-1 flex justify-center py-10">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-6">
                    {/* Headline Section */}
                    <div className="pt-10 pb-4">
                        <h1 className="text-[var(--cooking-text)] dark:text-white tracking-light text-[40px] font-bold leading-tight text-center font-['Newsreader',serif]">
                            How did it turn out?
                        </h1>
                        <p className="text-[var(--cooking-text-muted)] text-lg font-normal leading-normal pt-2 text-center font-['Newsreader',serif] italic dark:text-gray-400">
                            Every dish is a learning experience
                        </p>
                    </div>

                    {/* Sentiment Selection Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-8">
                        {sentiments.map((s) => (
                            <button 
                                key={s.id}
                                onClick={() => setSelectedId(s.id)}
                                className={`flex flex-col gap-4 p-6 rounded-xl bg-white border-2 transition-all text-left shadow-sm group relative dark:bg-neutral-800 ${
                                    selectedId === s.id 
                                        ? 'border-[var(--cooking-primary)] shadow-md' 
                                        : 'border-transparent hover:border-[var(--cooking-primary)]/50 dark:border-white/5'
                                }`}
                            >
                                {selectedId === s.id && (
                                    <div className="absolute -top-3 -right-3 bg-[var(--cooking-primary)] text-white p-1 rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                                <div 
                                    className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg overflow-hidden"
                                    style={{ backgroundImage: `url("${s.image}")` }}
                                >
                                    <div className={`w-full h-full transition-colors ${selectedId === s.id ? 'bg-transparent' : 'bg-[var(--cooking-primary)]/10 group-hover:bg-transparent'}`} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <s.icon className="w-6 h-6 text-[var(--cooking-primary)]" />
                                        <p className="text-[var(--cooking-text)] dark:text-white text-xl font-semibold leading-normal font-['Newsreader',serif]">
                                            {s.title}
                                        </p>
                                    </div>
                                    <p className="text-[var(--cooking-text-muted)] dark:text-gray-400 text-sm font-normal leading-normal mt-1">
                                        {s.description}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Notes Input Area */}
                    <div className="flex flex-col items-center justify-center w-full mt-12 mb-12">
                        <div className="flex flex-col w-full max-w-[640px] px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <div className="flex items-center gap-2 pb-3">
                                    <FileText className="w-6 h-6 text-[var(--cooking-text-muted)]" />
                                    <p className="text-[var(--cooking-text)] dark:text-white text-lg font-medium leading-normal font-['Newsreader',serif]">
                                        Notes for next time
                                    </p>
                                </div>
                                <textarea 
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[var(--cooking-text)] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[var(--cooking-primary)]/20 border border-[var(--cooking-border)] bg-white dark:bg-neutral-800 dark:border-white/5 focus:border-[var(--cooking-primary)] min-h-40 placeholder:text-[var(--cooking-text-muted)] p-5 text-base font-normal leading-relaxed transition-all shadow-inner" 
                                    placeholder="Add notes about seasoning, substitutions, or timing..."
                                />
                            </label>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col items-center gap-4 pb-20">
                        <Link 
                            href="/dashboard"
                            className="flex min-w-[280px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-10 bg-[var(--cooking-primary)] text-white text-lg font-bold tracking-[0.015em] hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
                        >
                            Save &amp; Finish
                        </Link>
                        <button className="text-[var(--cooking-text-muted)] dark:text-gray-400 text-sm font-medium hover:text-[var(--cooking-primary)] transition-colors py-2 px-4 rounded-lg">
                            Skip for now
                        </button>
                    </div>
                </div>
            </main>
            
            {/* Success Decoration */}
            <div className="fixed bottom-0 right-0 p-10 pointer-events-none hidden lg:block opacity-20">
                <Sparkles className="w-32 h-32 text-[var(--cooking-primary)]" />
            </div>
        </CookingLayout>
    );
}
