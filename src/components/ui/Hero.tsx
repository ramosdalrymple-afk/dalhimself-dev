// "use client";

// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="flex min-h-screen items-center justify-center bg-white px-4 pt-24 text-center sm:pt-0">
//       {/* Container Updates:
//         1. max-w-5xl: Widen container to match Navbar
//         (Note: Text stays readable because <p> has its own limit)
//       */}
//       <div className="max-w-5xl space-y-6">
        
//         {/* Animated Heading */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-extrabold tracking-tight sm:text-6xl text-gray-900"
//         >
//           Building digital products with <span className="text-blue-600">purpose</span>.
//         </motion.h1>

//         {/* Animated Subtext */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           // Kept max-w-2xl here so the paragraph doesn't stretch too wide and become hard to read
//           className="mx-auto max-w-2xl text-lg text-gray-600"
//         >
//           I'm a Full Stack Developer specializing in React, Next.js, and modern UI design. 
//           I turn complex problems into simple, beautiful interfaces.
//         </motion.p>

//         {/* Animated Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="flex justify-center gap-4"
//         >
//           <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-all">
//             View Projects
//           </button>
//           <button className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
//             Contact Me
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }