"use client";
import { motion } from "framer-motion";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm bg-black/40 p-4">
      <motion.div
        className="relative w-full max-w-3xl h-[90%] overflow-y-auto rounded-2xl bg-linear-to-br from-[#0f172a] to-[#1e293b] border border-white/10 shadow-xl"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 cursor-pointer rounded-md bg-gray-600 hover:bg-white/20 transition-all"
        >
          <img src="/assets/close.svg" alt="Close" className="w-5 h-5" />
        </button>

        {/* Project Image */}
        <img
          src={image}
          alt={title}
          className="w-full h- object-cover rounded-t-2xl border-b border-white/10"
        />

        {/* Content */}
        <div className="p-6 space-y-4 text-white">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            {description}
          </p>

          <div className="space-y-2">
            {subDescription.map((item, idx) => (
              <p key={idx} className="text-sm text-neutral-400 leading-snug">
                • {item}
              </p>
            ))}
          </div>

          {/* Tags & Link */}
          <div className="flex flex-col justify-between items-start md:items-center gap-4 pt-4 border-t border-white/10 mt-6">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center relative overflow-hidden rounded-full border border-cyan-600 px-5 py-2 gap-2 text-sm font-medium text-cyan-500 transition-all duration-300 group"
            >
              <span className="relative z-10 group-hover:text-white transition-all duration-300">
                View Project
              </span>
              <img
                src="/assets/arrow-up.svg"
                alt="View"
                className="w-4 h-4 relative z-10 group-hover:invert transition-all duration-300"
              />

              <span className="absolute inset-0 z-0 bg-cyan-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out rounded-full"></span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
