import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogIn, MessageCircle, UserPlus } from 'lucide-react'

const Header = () => {
  const controls = useAnimation();

  const handleScroll = async (targetId: any) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -100; // Adjust this offset value if necessary
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

      await controls.start({
        y: targetPosition,
        transition: { duration: 0.8, ease: [0.09, 1, 0.06, 1] }, // Smooth transition with custom easing
      });

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

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
          <ul className="flex space-x-6">
            {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item, index) => (
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
            className="flex space-x-2"
          >
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </nav>
      </motion.header>
    </>
  )
}

export default Header
