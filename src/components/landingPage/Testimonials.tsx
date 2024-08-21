
import { TestimonialsData } from '@/config/config'
import { motion } from 'framer-motion'
const Testimonials = () => {
  return (
    <div>
      <section id="testimonials" className="py-16 px-4 md:px-8 relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TestimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)" }}
              className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg flex flex-col border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
            >
              <p className="text-lg mb-4 flex-grow italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Testimonials
