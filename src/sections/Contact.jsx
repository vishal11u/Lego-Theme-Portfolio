import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Check,
  AlertCircle,
} from "lucide-react";

// Alert Component - LEGO Style
const Alert = ({ type, text }) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 ${isSuccess ? "bg-green-500" : "bg-red-500"} rounded-lg shadow-2xl border-b-4 ${isSuccess ? "border-green-700" : "border-red-700"}`}
      >
        {isSuccess ? (
          <Check size={24} className="text-white" />
        ) : (
          <AlertCircle size={24} className="text-white" />
        )}
        <p className="text-white font-black uppercase">{text}</p>
      </div>
    </motion.div>
  );
};

// Floating LEGO Particles
const FloatingBricks = () => {
  const bricks = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    color: ["bg-red-500", "bg-blue-500", "bg-yellow-400", "bg-green-500"][
      i % 4
    ],
    size: Math.random() * 20 + 10,
    delay: Math.random() * 2,
    duration: Math.random() * 10 + 10,
    x: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bricks.map((brick) => (
        <motion.div
          key={brick.id}
          className={`absolute ${brick.color} rounded opacity-20`}
          style={{
            width: brick.size,
            height: brick.size * 0.6,
            left: `${brick.x}%`,
          }}
          animate={{
            y: ["-10%", "110%"],
            rotate: [0, 360],
          }}
          transition={{
            duration: brick.duration,
            delay: brick.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xjkovvdy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        showAlertMessage("success", "Message Sent Successfully!");
      } else {
        throw new Error(result?.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      showAlertMessage("danger", "Oops! Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 overflow-hidden"
      id="contact"
    >
      {/* LEGO Baseplate Background */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={`h-${i}`}>
            <div
              className="absolute w-full h-1 bg-gray-800"
              style={{ top: `${i * 7}%` }}
            />
            <div
              className="absolute h-full w-1 bg-gray-800"
              style={{ left: `${i * 7}%` }}
            />
          </div>
        ))}
      </div>

      {/* Floating LEGO Bricks */}
      <FloatingBricks />

      {/* Alert */}
      <AnimatePresence>
        {showAlert && <Alert type={alertType} text={alertMessage} />}
      </AnimatePresence>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-8"
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-gray-900 uppercase mb-6"
              style={{ fontFamily: "Bungee, cursive" }}
            >
              Let's Build
              <br />
              Something
              <br />
              <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
                Together!
              </span>
            </motion.h2>

            <p className="text-xl text-gray-700 font-bold leading-relaxed">
              Whether you're looking to build a new website, improve your
              existing platform, or bring a unique project to life, I'm here to
              help.
            </p>
          </div>

          {/* Decorative LEGO Bricks */}
          <div className="hidden md:flex gap-4">
            <motion.div
              whileHover={{ y: -10, rotate: 5 }}
              className="w-32 h-20 bg-red-500 rounded-lg shadow-xl border-b-4 border-red-700 relative flex flex-col items-center justify-center"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-red-700" />
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-red-700" />
              </div>
              <Mail size={24} className="text-white mb-1" />
              <p className="text-white font-black text-xs uppercase">Email</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10, rotate: -5 }}
              className="w-32 h-20 bg-blue-500 rounded-lg shadow-xl border-b-4 border-blue-700 relative flex flex-col items-center justify-center"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-700" />
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-700" />
              </div>
              <MessageSquare size={24} className="text-white mb-1" />
              <p className="text-white font-black text-xs uppercase">Chat</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10, rotate: 5 }}
              className="w-32 h-20 bg-yellow-400 rounded-lg shadow-xl border-b-4 border-yellow-600 relative flex flex-col items-center justify-center"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-yellow-600" />
                <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-yellow-600" />
              </div>
              <Send size={24} className="text-white mb-1" />
              <p className="text-white font-black text-xs uppercase">Send</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* LEGO-style container */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-8 border-yellow-400 relative">
            {/* LEGO studs on top of div */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg" />
              <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg" />
              <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg" />
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-black uppercase text-gray-700 mb-2">
                  <User size={18} className="text-red-500" />
                  Full Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your awesome name"
                  className="w-full px-4 py-3 rounded-lg border-4 border-gray-300 focus:border-red-500 focus:outline-none font-bold text-gray-900 transition-all"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-black uppercase text-gray-700 mb-2">
                  <Mail size={18} className="text-blue-500" />
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border-4 border-gray-300 focus:border-blue-500 focus:outline-none font-bold text-gray-900 transition-all"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="flex items-center gap-2 text-sm font-black uppercase text-gray-700 mb-2">
                  <MessageSquare size={18} className="text-green-500" />
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your awesome project..."
                  className="w-full px-4 py-3 rounded-lg border-4 border-gray-300 focus:border-green-500 focus:outline-none font-bold text-gray-900 resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95, y: 0 }}
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-black uppercase text-white shadow-xl border-b-4 transition-all ${
                  isLoading
                    ? "bg-gray-400 border-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-700 hover:from-purple-600 hover:to-pink-600"
                }`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>

            {/* Bottom decoration */}
            <div className="absolute -bottom-3 right-8 flex gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full shadow" />
              <div className="w-4 h-4 bg-pink-500 rounded-full shadow" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scattered LEGO studs */}
      <div className="absolute bottom-10 left-10 w-8 h-8 bg-red-500 rounded-full opacity-40" />
      <div className="absolute top-20 right-20 w-6 h-6 bg-blue-500 rounded-full opacity-40" />
      <div className="absolute top-1/3 left-20 w-7 h-7 bg-yellow-400 rounded-full opacity-40" />
    </section>
  );
};

export default Contact;
