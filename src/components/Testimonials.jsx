'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Budi Santoso',
    feedback:
      'Hasil pembubutan sangat presisi! Proses cepat dan harga bersahabat.',
    rating: 5,
  },
  {
    name: 'Andi Wijaya',
    feedback:
      'Pelayanan ramah dan hasil rapi, pasti rekomendasi ke teman-teman bengkel.',
    rating: 5,
  },
  {
    name: 'Siti Nuraini',
    feedback: 'Gear yang saya pesan sesuai ukuran, pemasangan lancar.',
    rating: 4,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className='py-16 bg-secondarylp'>
      <div className='max-w-3xl mx-auto px-6 text-center'>
        <motion.h2
          className='text-3xl font-bold mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Apa Kata Pelanggan Kami
        </motion.h2>

        <div className='relative h-48 overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className='bg-white shadow-lg rounded-xl p-6 absolute top-0 left-0 w-full'
            >
              <div className='flex justify-center gap-1 mb-3'>
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <FaStar key={i} className='text-yellow-500' />
                ))}
              </div>
              <p className='text-gray-700 italic mb-4'>
                "{testimonials[index].feedback}"
              </p>
              <h4 className='font-semibold text-gray-900'>
                - {testimonials[index].name}
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
