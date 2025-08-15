'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CTA() {
  return (
    <section className='bg-secondary py-16 px-6 text-primary'>
      <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center'>
        {/* Kolom Kiri */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl md:text-4xl font-bold mb-4'
          >
            Siap Pesan Jasa Pembubutan Presisi?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='text-lg mb-8'
          >
            Hubungi kami sekarang dan dapatkan hasil pembubutan terbaik untuk
            kebutuhan mesin Anda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='flex flex-wrap gap-4'
          >
            <a
              href='/services'
              className='bg-accent text-primary px-6 py-3 rounded-full font-semibold hover:opacity-90 transition'
            >
              Pesan Sekarang
            </a>
            <a
              href='https://wa.me/6281234567890'
              target='_blank'
              rel='noopener noreferrer'
              className='border border-accent text-accent px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-primary transition'
            >
              Hubungi via WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Kolom Kanan */}
        <div className='flex justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src='/CTA.png' // letakkan di folder /public
              alt='Gear'
              width={240}
              height={240}
              className='object-contain'
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
