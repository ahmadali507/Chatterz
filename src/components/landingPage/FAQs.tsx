import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useState } from 'react'
import { Faqs } from '@/config/config'
const FAQs = () => {
    const [selectedFaq, setSelectedFaq] = useState<number|null>(null)

    return (
    <div>
      <section id="faq" className="py-16 px-4 md:px-8 bg-gray-800/30 backdrop-blur-md relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {Faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-4"
            >
              <motion.button
                className="w-full text-left p-4 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300"
                onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{faq.question}</span>
                  {selectedFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </motion.button>
              <motion.div
                initial={false}
                animate={{ height: selectedFaq === index ? 'auto' : 0, opacity: selectedFaq === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-gray-700/30 backdrop-blur-md rounded-lg mt-2 p-4"
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center relative z-10  "
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Ready to transform your team communication?
          </h2>
          <p className="text-xl mb-8">Join thousands of teams already using Chatterz to boost their productivity and collaboration.</p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started for Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-purple-500 hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105"
            >
              Schedule a Demo
            </Button>
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none" />
      </section>

    </div>
  )
}

export default FAQs
