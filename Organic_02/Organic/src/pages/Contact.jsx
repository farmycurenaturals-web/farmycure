import { Container } from '../components/ui/Container'

const Contact = () => {
  return (
    <main className="py-16 md:py-24 bg-background min-h-[60vh]">
      <Container>
        <div className="text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Contact Us
          </h1>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out to our team and 
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </Container>
    </main>
  )
}

export default Contact
