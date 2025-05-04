
import { Layout } from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About MedNexus</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 text-med-neutral-700">
              MedNexus is a comprehensive healthcare platform dedicated to connecting patients with quality healthcare services and providers. Our mission is to make healthcare more accessible, efficient, and patient-centered.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8 text-med-neutral-900">Our Mission</h2>
            <p className="mb-6 text-med-neutral-700">
              We believe in a world where everyone has access to quality healthcare. MedNexus aims to bridge the gap between patients and healthcare providers, making healthcare services more accessible and efficient for everyone.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8 text-med-neutral-900">Our Vision</h2>
            <p className="mb-6 text-med-neutral-700">
              To transform the healthcare experience by leveraging technology to create a seamless platform that connects patients with the right healthcare providers and services when they need them most.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8 text-med-neutral-900">Our Values</h2>
            <ul className="list-disc pl-6 mb-6 text-med-neutral-700 space-y-2">
              <li><strong>Patient-Centered:</strong> We put patients first in everything we do.</li>
              <li><strong>Accessibility:</strong> We strive to make healthcare accessible to all.</li>
              <li><strong>Innovation:</strong> We continuously innovate to improve healthcare delivery.</li>
              <li><strong>Quality:</strong> We are committed to maintaining the highest standards of quality in healthcare services.</li>
              <li><strong>Privacy:</strong> We respect and protect the privacy and security of our users' health information.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8 text-med-neutral-900">Our Team</h2>
            <p className="mb-6 text-med-neutral-700">
              Our team consists of healthcare professionals, technologists, and industry experts who are passionate about transforming healthcare delivery. With our diverse expertise, we're able to approach healthcare challenges from multiple perspectives to create innovative solutions.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8 text-med-neutral-900">Contact Us</h2>
            <p className="text-med-neutral-700">
              If you have any questions or feedback, please feel free to <a href="/contact" className="text-primary hover:underline">contact us</a>. We'd love to hear from you!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
