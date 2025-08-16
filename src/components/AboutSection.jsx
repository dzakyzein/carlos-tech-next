'use client';

import { motion } from 'framer-motion';

export default function About() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='bg-secondary py-20'>
      <div className='container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* Gambar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='flex justify-center'
        >
          <img
            src='/about-img.jpg'
            alt='Proses pembubutan mesin di Carlos Tech'
            className='w-full max-w-md md:max-w-lg h-auto rounded-lg shadow-lg border-4 border-primary transform hover:scale-105 transition-transform duration-300'
          />
        </motion.div>

        {/* Teks */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className='text-lg text-primary/70 mb-2 uppercase tracking-wide underline'>
            Presisi & Kecepatan untuk Kebutuhan Anda
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-primary mb-4'>
            Tentang Carlos Tech
          </h2>
          <p className='text-primary/80 leading-relaxed mb-6'>
            Carlos Tech adalah bengkel spesialis pembubutan mesin yang berlokasi
            di Solo. Dengan pengalaman bertahun-tahun, kami melayani pembuatan
            komponen presisi, perbaikan part mesin, dan custom parts sesuai
            kebutuhan industri maupun perorangan.
          </p>
          <p className='text-primary/80 leading-relaxed mb-6'>
            Didukung peralatan modern dan tenaga ahli berpengalaman, kami
            menjamin hasil kerja yang presisi, cepat, dan berkualitas tinggi.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToServices}
            className='btn bg-primary text-secondary hover:bg-primary/90'
          >
            Lihat Layanan
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
