import { Linkedin, Github, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      url: "www.linkedin.com/in/priyanggshu",
      delay: 0.1,
    },
    {
      name: "X",
      icon: <Twitter size={24} />,
      url: "https://x.com/priyanggshu",
      delay: 0.2,
    },
    {
      name: "GitHub",
      icon: <Github size={24} />,
      url: "https://github.com/priyanggshu",
      delay: 0.3,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <footer className="m-2 py-2">
      {/* Main container with subtle gradient background */}
      <div className="bg-gradient-to-br from-transparent to-black/5 backdrop-blur-sm mx-4 md:mx-8 lg:mx-4 lg:max-w-8xl ">
        <div className="px-1 md:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Left side - Logo and copyright */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col space-y-4"
            >
              <div className="flex items-center">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#D1D1D2] font-bold text-2xl md:text-3xl font-Krona tracking-tight"
                >
                  <span className="relative">
                    Refyn
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#cac7e0] to-[#3933ae] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    ></motion.span>
                  </span>
                </motion.h1>
              </div>

              <p className="py-2 text-xs font-Krona text-[#D1D1D2]/70 max-w-sm">
                Refyn corp. All rights private.
              </p>
            </motion.div>

            {/* Right side - Repository and licensing */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col space-y-4 md:items-end"
            >
              <p className="text-sm font-Krona text-[#D1D1D2]/70">
                Connect with Ps.
              </p>

              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, delay: social.delay }}
                    viewport={{ once: true }}
                    className="text-[#D1D1D2]/70 hover:text-[#D1D1D2] transition-colors duration-200"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* links and copyright */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 pt-6 border-t border-[#D1D1D2]/10 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#D1D1D2]/60"
            >
              <a
                href="#"
                className="hover:text-[#D1D1D2] transition-colors duration-200 font-Krona"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-[#D1D1D2] transition-colors duration-200 font-Krona"
              >
                Terms of Service
              </a>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs font-Krona text-[#D1D1D2]/40 mt-4 md:mt-0"
            >
              © {currentYear} Refyn. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient reflection below the footer */}
      <div className="md:hidden h-2 bg-gradient-to-b from-[#716aeb]/5 to-transparent mx-6 md:mx-12 lg:mx-auto lg:max-w-6xl"></div>
    </footer>
  );
};

export default Footer;
