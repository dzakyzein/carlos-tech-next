'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className='bg-secondary py-20'>
      <div className='container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center'>
        {/* Gambar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='flex justify-center'
        >
          <img
            src='https://via.placeholder.com/500x350'
            alt='Proses pembubutan mesin'
            className='rounded-lg shadow-lg border-4 border-primary'
          />
        </motion.div>

        {/* Teks */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
          <button className='btn bg-primary text-secondary hover:bg-primary/90'>
            Lihat Layanan
          </button>
        </motion.div>
      </div>
    </section>
  );
}
