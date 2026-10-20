import React from 'react';

export interface BlogPost {
    title: string;
    category: string;
    date: string;
    author: {
        name: string;
        image: string;
        date: string;
    };
    content: React.ReactNode;
}

export const blogPosts: Record<string, BlogPost> = {
    'building-first-website': {
        title: "When’s the Right Time to Build Your First Professional Website?",
        category: "Startup Growth",
        date: "Jan 6, 2026",
        author: {
            name: "Ravi Pratap Singh",
            image: "/cofounder2.jpg",
            date: "Jan 6, 2026"
        },
        content: (
            <>
                <h2 className="text-4xl mb-6 mt-12">The Moment You Know It’s Time for a Pro Website</h2>
                <p className="mb-8">
                    <span className="font-bold text-gray-900">Spoiler:</span> Not on day one. In the early days, your startup is in motion.
                </p>
                <p className="mb-8">
                    You're talking to users, running demos, collecting feedback... and most importantly, changing things fast. The product evolves weekly. So does your messaging.
                </p>
                <p className="mb-8">
                    Which means your website? It should be simple? malleable - just something quick that you can update on the go before the next investor call or conference.
                </p>
                <p className="mb-8">
                    But then something shifts:
                </p>
                <ul className="list-none space-y-4 mb-12 pl-0">
                    <li className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                        You start getting traction.
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                        You stop rewriting your homepage headline every Friday.
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                        You begin to see what your product is actually valued for.
                    </li>
                </ul>
                <p className="mb-12">
                    <span className="font-bold text-gray-900">And that's the signal.</span> It's time to stop patching — and start cementing.
                    Here's how to know you're ready for your first real, professionally built website.
                </p>

                {/* Stylized List Section */}
                <div className="space-y-16 my-20 border-t border-gray-200 pt-20">
                    {/* Item 1 */}
                    <div className="flex gap-8">
                        <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center font-bold text-sm mt-1.5">1</div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">You've Defined the Core Problem You Solve</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Listing features is easy. But defining what you *actually* do can be confusing. You should consolidate any workflows that proved themselves and truly matter to your users. You understand the pain your product solves — and which solutions matter. That's what your homepage should reflect.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-8">
                        <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center font-bold text-sm mt-1.5">2</div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">You Know Who's Buying (and Why)</h3>
                            <p className="text-gray-600 leading-relaxed">
                                You're done guessing — and not tweaking your ICP before every call. Finally, it's clear who's zeroing buy from you — platform engineers, CTOs, enterprise buyers ... and what makes them say yes.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-8">
                        <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center font-bold text-sm mt-1.5">3</div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">You Have Real Signals: Usage, Feedback, and Proof</h3>
                            <p className="text-gray-600 leading-relaxed">
                                The docs are in place. The use cases are clear. You've got real user feedback — maybe even testimonials. At this stage, you're not just inviting people to "try it." You give them a solid reason to trust your product for their problem — plus tutorials and user stories to guarantee a smooth experience.
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-4xl font-medium text-gray-900 mb-8">More Than Just a Website — It's a Scalable Design System</h2>
                <p className="mb-8">
                    Some founders confuse the moment when finally-made landing pages are helpful... with the moment they start holding growth back. A professionally built website isn't just for looks.
                </p>
                <p className="mb-8">
                    It's a system:
                </p>
                <ul className="list-disc pl-5 space-y-4 mb-12 text-gray-600 marker:text-gray-300">
                    <li>Clear positioning</li>
                    <li>Focused messaging</li>
                    <li>Graphics, diagrams, and motion that explain how your product works — without overwhelming</li>
                    <li>A foundation for all your future launches.</li>
                </ul>
            </>
        )
    },
    'marketing-for-devtools': {
        title: "Most Marketing Sites Don't Work for DevTools",
        category: "DevTools Marketing",
        date: "Jan 5, 2026",
        author: {
            name: "Ravi Pratap Singh",
            image: "/cofounder2.jpg",
            date: "Jan 5, 2026"
        },
        content: (
            <>
                <h2 className="text-4xl mb-6 mt-12">The "Enterprise Polish" Trap</h2>
                <p className="mb-8">
                    Developers are cynical buyers. We know, because we are developers. When we land on a site that looks too polished, effectively "hiding" the product behind vague enterprise-speak about "synergy" and "digital transformation," we bounce.
                </p>
                <p className="mb-8">
                    The biggest mistake DevTools companies make is trying to market to CTOs using CIO language, while completely ignoring the engineers who actually do the implementation evaluation.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-12">What Developers Actually Care About</h3>
                <ul className="list-none space-y-4 mb-12 pl-0">
                    <li className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        <span className="font-bold">Documentation first:</span> Can I read the docs before I sign up?
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        <span className="font-bold">Transparent pricing:</span> Don't make me "contact sales" for the pro tier.
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        <span className="font-bold">Self-serve onboarding:</span> Let me try `npm install` immediately.
                    </li>
                </ul>

                <div className="bg-gray-50 p-8 rounded-2xl my-12 border-l-4 border-teal-500">
                    <p className="italic text-gray-700 font-medium text-lg">
                        "Your marketing site shouldn't just sell the promise. It should prove the implementation."
                    </p>
                </div>

                <h2 className="text-4xl font-medium text-gray-900 mb-8">Show, Don't Just Tell</h2>
                <p className="mb-8">
                    For DevTools, your "Hero Section" isn't a headline. It's a code snippet.
                </p>
                <p className="mb-8">
                    If your product saves time on configuration, show the 3 lines of config vs the 50 lines of boilerplate. If it offers better performance, show the benchmark graph right there.
                </p>
                <p className="mb-8">
                    Marketing for developers is about reducing friction. Every click, every required email field, every "book a demo" button is friction. The best marketing site for a developer tool often looks less like a brochure and more like a `README.md` file given a premium UI treatment.
                </p>
            </>
        )
    },
    'design-team-vs-freelancer': {
        title: "Design Team or Freelancer: What Works for Startups",
        category: "Startup Growth",
        date: "Jan 2, 2026",
        author: {
            name: "Priyanshu Bhardwaj",
            image: "/cofounder1.jpg",
            date: "Jan 2, 2026"
        },
        content: (
            <>
                <h2 className="text-4xl mb-6 mt-12">The Speed vs. Consistency Trade-off</h2>
                <p className="mb-8">
                    Early stage startups live and die by speed. When you need a landing page up *yesterday*, a talented freelancer is often the best bet. They can move fast, usually work on a project basis, and don't require the overhead of management.
                </p>
                <p className="mb-8">
                    But as you grow, the "patchwork problem" emerges.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                    <div className="bg-yellow-50 p-8 rounded-2xl">
                        <h3 className="text-xl font-bold text-yellow-800 mb-4">The Freelancer Path</h3>
                        <ul className="space-y-3 text-yellow-900">
                            <li>+ Extremely fast execution</li>
                            <li>+ Lower immediate cost</li>
                            <li>- Inconsistent design system</li>
                            <li>- Knowledge silos</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-8 rounded-2xl">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">The Design Team Path</h3>
                        <ul className="space-y-3 text-blue-900">
                            <li>+ Scalable design systems</li>
                            <li>+ Deep product knowledge</li>
                            <li>- Higher overhead</li>
                            <li>- Slower initial ramp-up</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-4xl font-medium text-gray-900 mb-8">When to Switch?</h2>
                <p className="mb-8">
                    The switch usually happens at Series A, or whenever "Design Debt" starts slowing down development.
                </p>
                <p className="mb-8">
                    If your engineers are spending more time fixing CSS conflicts because three different freelancers used three different naming conventions, it's time to bring design in-house (or hire a dedicated agency partner like Vorq).
                </p>
                <p className="mb-8">
                    A dedicated design team doesn't just "paint screens." They build the <span className="font-bold">Brand Operating System</span> — the core set of components, tone guides, and improved flows that allow you to ship 10x faster in the long run, even if the first week feels slower.
                </p>
            </>
        )
    }
};
