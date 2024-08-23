'use client'
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, MessageCircle, UserPlus, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const controls = useAnimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = async (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -100;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      await controls.start({
        y: targetPosition,
        transition: { duration: 0.8, ease: [0.09, 1, 0.06, 1] },
      });

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    if (isMobile) setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = ["Features", "Pricing", "Testimonials", "FAQ"];

  return (
    <>
      <motion.header
        className="p-4 flex justify-between items-center fixed w-full top-0 bg-gray-800/50 backdrop-blur-md z-20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <MessageCircle className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Chatterz
          </span>
        </motion.div>
        <nav className="flex items-center space-x-4">
          <motion.button
            className="md:hidden text-blue-400 hover:text-blue-300"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(item.toLowerCase());
                  }}
                  className="hover:text-blue-400"
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex space-x-2"
          >
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800/90 backdrop-blur-md fixed top-16 left-0 right-0 z-10"
          >
            <ul className="flex flex-col items-center py-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    scroll={false}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(item.toLowerCase());
                    }}
                    className="block py-2 px-4 text-center hover:bg-blue-900/50"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: navItems.length * 0.1 }}
                className="w-full"
              >
                <Link href="/login" className="block w-full py-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-center py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: (navItems.length + 1) * 0.1 }}
                className="w-full px-4 pt-2"
              >
                <Link href="/signup" className="block w-full">
                  <Button className="w-full justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;