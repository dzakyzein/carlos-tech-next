'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToPopularProduct = () => {
    document
      .getElementById('popular-product')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className='relative bg-gradient-to-r from-primary to-accent min-h-screen flex items-center'
      style={{
        backgroundImage: 'url(/bg-hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay tipis biar teks tetap jelas */}
      <div className='absolute inset-0 bg-black/20'></div>

      <div className='container max-w-full mx-auto px-6 md:px-12 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='max-w-2xl text-center md:text-left'
        >
          <h1 className='text-4xl md:text-6xl font-bold text-secondary leading-tight drop-shadow-lg'>
            Ahli Pembubutan Mesin Presisi
          </h1>
          <p className='mt-6 text-secondary/90 text-lg drop-shadow'>
            Carlos Tech melayani pembubutan komponen mesin dengan tingkat
            presisi tinggi, cocok untuk industri, bengkel, maupun kebutuhan
            perorangan. Pengerjaan rapi, cepat, dan sesuai spesifikasi.
          </p>

          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
            {/* CTA Utama */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-primary'
              onClick={() =>
                window.open('https://wa.me/6281226022666', '_blank')
              }
            >
              Hubungi Penjual
            </motion.button>

            {/* CTA Kedua */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='btn bg-secondary text-primary hover:bg-secondary/90'
              onClick={scrollToPopularProduct}
            >
              Lihat Produk
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
