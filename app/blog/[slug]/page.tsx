"use client";

import VorqNav from "../../components/VorqNav";
import { VorqFooter } from "../../components/VorqFooter";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowLeft, Rocket, Code, Users } from "lucide-react"; // Assuming lucide-react is available, or use text/svgs

import { blogPosts } from "../blogData";
import { useParams } from "next/navigation";
import ShareButtons from "../../components/ShareButtons";

const assets = {
    rocket: "/images/rock.png",
    freelance: "/images/free.png",
    devtools: "/images/dev.png"
};

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const post = blogPosts[slug];

    if (!post) {
        return (
            <main className="min-h-screen bg-white text-[#111] font-[family-name:var(--font-archivo)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post not found</h1>
                    <Link href="/blog" className="text-blue-500 hover:underline">Return to Blog</Link>
                </div>
            </main>
        );
    }

    // Determine assets based on slug for demo purposes if needed, or just keep placeholders.
    // Ideally these should be in the blogData too, but for now we keep using the `post` object.

    return (
        <main className="min-h-screen bg-white text-[#111] font-[family-name:var(--font-archivo)] selection:bg-teal-500 selection:text-white mt-30">
            <VorqNav />

            <div className="vorq-container mx-auto w-full max-w-7xl pt-40 pb-20 px-4 md:px-8">

                <div className="lg:flex lg:gap-24">
                    {/* Left Sidebar - Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="hidden lg:block w-48 flex-shrink-0"
                    >
                        <div className="sticky top-40">
                            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-[#111] hover:text-gray-600 transition-colors flex items-center gap-2 group">
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> ALL POSTS
                            </Link>
                        </div>
                    </motion.div>

                    {/* Mobile Back Link (visible only on small screens) */}
                    <div className="lg:hidden mb-8">
                        <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-[#111] flex items-center gap-2">
                            <span>←</span> ALL POSTS
                        </Link>
                    </div>

                    {/* Main Content Column */}
                    <div className="max-w-3xl">
                        {/* Header */}
                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-16"
                        >
                            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-6 block">{post.category}</span>
                            <h1 className="text-5xl md:text-7xl font-medium leading-[1.1] tracking-tighter text-gray-900 mb-8">
                                {post.title}
                            </h1>

                            <div className="flex flex-col gap-6 items-start border-t border-gray-100 pt-8 mt-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                        <Image src={post.author.image} alt={post.author.name} width={48} height={48} className="object-cover" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold text-gray-900">{post.author.name}</span>
                                        <span className="text-gray-400 mx-2">•</span>
                                        <span className="text-gray-500">{post.author.date}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4 w-full">
                                    <ShareButtons title={post.title} />
                                </div>
                            </div>
                        </motion.header>

                        {/* Content */}
                        <motion.article
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-xl prose-gray max-w-none mb-20 prose-headings:font-medium prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed"
                        >
                            {post.content}
                        </motion.article>

                        {/* Newsletter CTA */}
                        <div className="bg-gray-50 rounded-[2rem] p-10 md:p-16 text-center my-20">
                            <h3 className="text-3xl font-medium text-gray-900 leading-tight mb-3">
                                Subscribe to our <span className="text-blue-500">newsletter</span>
                            </h3>
                            <p className="text-lg text-gray-500 mb-10">for industry insights</p>

                            <div className="w-full max-w-md mx-auto flex flex-col gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white border border-gray-200 rounded-full px-8 py-4 text-base focus:outline-none focus:border-blue-500 transition-colors shadow-sm text-center placeholder:text-gray-400"
                                />
                                <button className="w-full bg-[#111] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                                    Subscribe ↗
                                </button>
                            </div>
                        </div>

                        {/* Author Footer */}
                        <div className="border-t border-gray-100 pt-10 pb-20 flex flex-col gap-6 items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                    <Image src={post.author.image} alt={post.author.name} width={48} height={48} className="object-cover" />
                                </div>
                                <div>
                                    <div className="text-base font-bold text-gray-900">{post.author.name}</div>
                                    <div className="text-sm text-gray-500">{post.author.date}</div>
                                </div>
                            </div>
                            <div className="flex gap-4 w-full">
                                <ShareButtons title={post.title} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Related Posts Section */}
            <div className="bg-gray-50 py-20 ">
                <div className="vorq-container mx-auto w-full max-w-7xl px-4 md:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-medium text-gray-900">Related posts</h2>
                        <Link href="/blog" className="text-xs font-bold uppercase tracking-widest px-4 py-2 border border-gray-200 rounded-full hover:bg-white transition-colors">
                            View All Posts ↗
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8">
                        {/* Related Card 1 (Orange Style) */}
                        <div className="bg-[#fcd34d] rounded-[2rem] p-8 min-h-[300px] relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1">
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex gap-2">
                                    <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Design Team</span>
                                    <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Freelance</span>
                                </div>

                                <div className="mt-auto">
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 block">Oct 13, 2025</span>
                                    <h3 className="text-2xl font-medium leading-tight">
                                        Design Team or Freelancer: What Works for Startups
                                    </h3>
                                </div>
                            </div>
                            {/* Abs Image */}
                            <div className="absolute top-8 right-8 w-32 h-32 md:w-40 md:h-40 pointer-events-none group-hover:scale-110 transition-transform">
                                <Image src={assets.freelance} alt="Icon" fill className="object-contain" />
                            </div>
                        </div>

                        {/* Related Card 2 (Pink Style) */}
                        <div className="bg-[#f472b6] rounded-[2rem] p-8 min-h-[300px] relative overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1 text-white">
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex gap-2">
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                        <span>▶</span> Watch Video
                                    </span>
                                    <span className="bg-[#0d9488] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                        <span>P</span> DevTools Tips
                                    </span>
                                </div>

                                <div className="mt-auto">
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2 block">Oct 5, 2025</span>
                                    <h3 className="text-2xl font-medium leading-tight">
                                        Most Marketing Sites Don't Work for DevTools
                                    </h3>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <VorqFooter />
        </main>
    );
}
