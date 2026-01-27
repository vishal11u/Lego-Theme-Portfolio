import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronRight } from "lucide-react";
import { myProjects } from "../constants";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={closeModal}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[80vh] mt-24 z-50 overflow-y-auto rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEGO studs decoration on modal */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <div className="w-4 h-4 bg-white bg-opacity-30 rounded-full" />
          <div className="w-4 h-4 bg-white bg-opacity-30 rounded-full" />
          <div className="w-4 h-4 bg-white bg-opacity-30 rounded-full" />
        </div>

        {/* Close Button - LEGO Style */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-3 bg-red-500 rounded-lg shadow-lg border-b-4 border-red-700 hover:border-red-800 transition-all"
        >
          <X size={20} className="text-white" />
        </motion.button>

        {/* Project Image with LEGO brick frame */}
        <div className="relative border-8 border-yellow-400 rounded-t-2xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-96 object-fill"
          />
          {/* Image overlay pattern */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 bg-white rounded-b-2xl space-y-6">
          <div>
            <h2
              className="text-2xl font-black text-gray-900 uppercase mb-3"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              {title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              {description}
            </p>
          </div>

          {/* Features - LEGO Brick Style */}
          <div className="space-y-3">
            {subDescription.map((item, idx) => {
              const colors = [
                "bg-red-400",
                "bg-blue-400",
                "bg-green-400",
                "bg-yellow-400",
                "bg-purple-400",
              ];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${colors[idx % colors.length]} p-4 rounded-lg border-b-4 border-black border-opacity-20 shadow-md`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-white font-bold leading-relaxed">
                      {item}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tags & Link */}
          <div className="pt-6 border-t-4 border-gray-200 space-y-4">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <motion.span
                  key={tag.id}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="px-4 py-2 rounded-lg text-sm font-black uppercase bg-gray-900 text-white shadow-md border-b-4 border-gray-700"
                >
                  {tag.name}
                </motion.span>
              ))}
            </div>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg font-black uppercase shadow-lg border-b-4 border-green-700 hover:bg-green-600 transition-all"
            >
              <span>View Project</span>
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl overflow-hidden shadow-xl border-4 border-yellow-400 hover:shadow-2xl transition-shadow duration-300"
      >
        {/* LEGO studs on card */}
        <div className="absolute -top-3 left-6 flex gap-2 z-10">
          <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg" />
          <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg" />
        </div>

        {/* Project Image */}
        <div className="relative h-62 overflow-hidden border-b-4 border-blue-500">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-fill transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4">
          <h3
            className="text-xl font-black text-gray-900 uppercase"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            {project.title}
          </h3>

          <p className="text-gray-700 font-semibold line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-lg text-xs font-black uppercase bg-blue-500 text-white shadow-md border-b-4 border-blue-700"
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* View Project Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-black uppercase shadow-lg border-b-4 border-red-700 hover:from-red-600 hover:to-pink-600 transition-all mt-4"
          >
            View Project
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <ProjectDetails
            title={project.title}
            description={project.description}
            subDescription={project.subDescription}
            image={project.image}
            tags={project.tags}
            href={project.href}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Projects = () => {
  return (
    <section
      className="relative py-20 px-6 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 overflow-hidden"
      id="projects"
    >
      {/* LEGO Baseplate Background */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <React.Fragment key={i}>
            <div
              className="absolute w-full h-1 bg-gray-800"
              style={{ top: `${i * 7}%` }}
            />
            <div
              className="absolute h-full w-1 bg-gray-800"
              style={{ left: `${i * 7}%` }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Floating LEGO studs */}
      <div className="absolute top-20 right-10 w-8 h-8 bg-red-500 rounded-full opacity-40 animate-pulse" />
      <div className="absolute bottom-40 left-10 w-6 h-6 bg-blue-500 rounded-full opacity-40 animate-pulse" />
      <div className="absolute top-40 left-1/4 w-5 h-5 bg-yellow-400 rounded-full opacity-30 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-5xl md:text-7xl font-black text-gray-900 uppercase text-center mb-4"
            style={{ fontFamily: "Bungee, cursive" }}
          >
            My Selected Projects
          </h2>
          <div className="relative h-3">
            <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-full" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 flex gap-3">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full" />
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
