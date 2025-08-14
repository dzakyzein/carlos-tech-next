'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className='bg-gradient-to-r from-primary to-accent min-h-screen flex items-center'>
      <div className='container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center'>
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-4xl md:text-6xl font-bold text-secondary leading-tight'>
            Ahli Pembubutan Mesin Presisi
          </h1>
          <p className='mt-6 text-secondary/90 text-lg'>
            Carlos Tech melayani pembubutan komponen mesin dengan tingkat
            presisi tinggi, cocok untuk industri, bengkel, maupun kebutuhan
            perorangan. Pengerjaan rapi, cepat, dan sesuai spesifikasi.
          </p>
          <div className='mt-8 flex gap-4'>
            <button className='btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-primary'>
              Hubungi Penjual
            </button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='flex justify-center'
        >
          <img
            src='https://via.placeholder.com/500x350'
            alt='Proses Pembubutan Mesin di CarlosTech'
            className='rounded-lg shadow-xl'
          />
        </motion.div>
      </div>
    </section>
  );
}
