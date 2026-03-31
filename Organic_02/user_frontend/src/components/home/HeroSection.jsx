import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { fadeInUp, staggerContainer } from '../../animations/variants'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center -mt-16 md:-mt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop')`,
        }}
      >
        {/* Gradient Overlay - darker on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-4"
        >
          {/* Small Label */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl font-medium text-white/80 tracking-wide"
          >
            FarmyCure Naturals
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold leading-[1.1] text-white"
          >
            Authentic Organic Products Straight From the Farm
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold leading-[1.1] text-white mt-6"
          >
            Soil to Soul
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Shop Now
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline-white" size="lg">
                Explore Categories
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export default HeroSection
