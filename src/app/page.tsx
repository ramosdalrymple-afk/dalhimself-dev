'use client'; // Required for useState

import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Added
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"; // Added icons

const PROJECTS = [
  {
    title: "Orbital Foundry",
    description: "A high-fidelity, industrial-grade decentralized application for materializing and managing aerospace assets on the Sui Network. Orbital Foundry utilizes on-chain randomness to unseal secure deployment modules, revealing cryptographically unique aerospace components.",
    tech: ["Sui Move", "TypeScript", "NextJS", "Tailwind CSS", "Lucide React"],
    link: "https://github.com/ramosdalrymple-afk/orbital-foundry.git",
  },
  {
    title: "The Vault.",
    description: "The Vault is a secure, end-to-end asset repository built on Sui. Engineered for security and speed, it provides a streamlined environment for users to organize, track, and safeguard their most important data.",
    tech: ["Sui Move", "NextJS", "TypeScript", "Tailwind CSS", "Lucide React"],
    link: "https://github.com/ramosdalrymple-afk/vault-sui-escrow.git",
  },
  {
    title: "NFT Dynamic Badge",
    description: "A blockchain-based system for issuing Dynamic NFTs as badges. Unlike traditional static NFTs, these badges evolve, level up, and change their appearance based on on-chain activities, off-chain milestones, or time-based triggers.",
    tech: ["Sui Move", "React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/ramosdalrymple-afk/nft-dynamic-badge.git",
  },
  {
    title: "Glitch Freak NFT Marketplace",
    description: "A specialized NFT marketplace platform built on the Sui blockchain. Features unique genetic sequences and on-chain volatility attributes for 'freak-themed' digital assets.",
    tech: ["Sui Move", "React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/ramosdalrymple-afk/glitch-freak-nft-marketplace",
  },
  {
    title: "Beats Music NFT Marketplace",
    description: "A decentralized music ecosystem on Sui allowing artists to tokenize tracks as unique objects. Facilitates secure, transparent music ownership and direct artist-to-fan engagement.",
    tech: ["Sui Move", "React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/ramosdalrymple-afk/beats-music-nft-marketplace",
  },
  {
    title: "LinguaAR",
    description: "An AR-based learning platform for Filipino Sign Language (FSL). Empowers the Deaf community and educators through interactive lessons, real-time sign recognition overlays, and integrated text-to-speech features.",
    tech: ["Flutter", "Dart", "Machine Learning", "Python (Flask)"],
    link: "https://github.com/ramosdalrymple-afk/LinguaAR",
  },
];

export default function Home() {
  // --- PAGINATION LOGIC ---
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const totalPages = Math.ceil(PROJECTS.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = PROJECTS.slice(indexOfFirstProject, indexOfLastProject);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <main className="min-h-screen bg-background px-6 pt-24 pb-12 md:pt-32 md:pb-20 font-sans text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-2xl">
        
        {/* --- PROFILE SECTION --- */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 transition-transform hover:scale-105 duration-300">
            <Image 
              src="/witwi.jpg" 
              alt="Dalrymple Ramos" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Dalrymple Ramos</h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mt-1">Full-Stack Developer</p>
            <a 
              href="mailto:ramosdalrymple@gmail.com" 
              className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all hover:underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700"
            >
              ramosdalrymple@gmail.com
            </a>
          </div>
        </section>

        <div className="space-y-16">
          {/* --- ABOUT SECTION --- */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">About</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-prose">
              I am a <span className="text-zinc-900 dark:text-white font-medium">Full-Stack Developer and IT student</span> dedicated to developing high-performance digital products. Specialized in <span className="text-zinc-900 dark:text-white font-medium">building high-performance digital products across web, mobile, and decentralized platforms.</span>, I am passionate about translating complex technical requirements into seamless, user-centric experiences through clean architecture and modern frameworks.
            </p>
          </section>

          {/* --- EDUCATION SECTION --- */}
          <section className="space-y-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Education</h2>
            <div className="space-y-2">
              <div className="group -mx-4 rounded-xl p-4 transition-all hover:bg-card-hover">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-[140px_1fr] md:gap-4">
                  <span className="text-sm text-zinc-500 mt-1 uppercase tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                    2022 – PRESENT
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center flex-wrap gap-2">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white transition-colors">
                        Bachelor of Science in Information Technology
                      </h3>
                      <span className="text-zinc-300 dark:text-zinc-600">•</span>
                      <Link 
                        href="https://up.phinma.edu.ph/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-900 dark:text-white hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
                      >
                        PHINMA University of Pangasinan
                        <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[550px]">
                      Focused on Software Development, Web Development and Data Structures. 
                      Engaged in building practical solutions and exploring emerging technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- SKILLS SECTION --- */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Skills</h2>
            <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Mobile Development", "Web Development", "Teamwork & Collaboration", 
                  "Multitasking", "Version Control with Git", "Adaptability",
                ].map((skill) => (
                  <span key={skill} className="bg-zinc-100 dark:bg-zinc-900 px-3 py-1 text-sm rounded border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white cursor-default">
                    {skill}
                  </span>
                ))}
            </div>
          </section>

          {/* --- FEATURED PROJECTS SECTION --- */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Featured Projects</h2>
              
              {/* --- PAGINATION CONTROLS --- */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-1 rounded-md border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                </button>
                <span className="text-xs font-mono text-zinc-500">
                  {currentPage} / {totalPages}
                </span>
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-md border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentProjects.map((project) => (
                <Link 
                  key={project.title}
                  href={project.link} 
                  target="_blank"
                  className="group -mx-4 block rounded-xl p-4 transition-all hover:bg-card-hover"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-all group-hover:text-zinc-900 dark:group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-wider group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-24 pt-8 border-t border-zinc-200 dark:border-zinc-900 text-center">
          <p className="text-zinc-500 text-xs">
            © {new Date().getFullYear()} Dalrymple Ramos.
          </p>
        </footer>
      </div>
    </main>
  );
}