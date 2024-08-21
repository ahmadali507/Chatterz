import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { Plans } from '@/config/config'


const Plan = () => {
  return (
    <div>
       <section id="pricing" className="py-16 px-4 md:px-8 bg-gray-800/30 backdrop-blur-md relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(167, 139, 250, 0.4)" }}
              className="bg-gradient-to-b from-gray-800/50 to-purple-900/30 backdrop-blur-md p-8 rounded-lg text-center flex flex-col border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {plan.price}
              </p>
              <ul className="text-left mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="flex items-center mb-2"
                  >
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <Button
                size="lg"
                className= "bg-gradient-to-r hover:scale-110 active: scale-110 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-70"
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Plan
