'use client';

import { motion } from 'framer-motion';

export default function Workflow() {
  const steps = [
    {
      title: 'Konsultasi Awal',
      desc: 'Diskusikan kebutuhan pembubutan mesin Anda dengan tim kami untuk solusi yang tepat.',
      icon: '💬',
    },
    {
      title: 'Pemeriksaan & Pengukuran',
      desc: 'Kami melakukan pengecekan detail dan pengukuran presisi sebelum mulai pengerjaan.',
      icon: '📏',
    },
    {
      title: 'Proses Pembubutan',
      desc: 'Proses pembubutan dilakukan dengan mesin dan teknisi berpengalaman.',
      icon: '⚙️',
    },
    {
      title: 'Finishing & Pengiriman',
      desc: 'Hasil akhir dicek kualitasnya lalu dikirim sesuai kesepakatan.',
      icon: '📦',
    },
  ];

  return (
    <section className='py-20 bg-secondarylp'>
      <div className='container mx-auto px-6 md:px-12'>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl md:text-4xl font-bold text-primarylp text-center mb-16'
        >
          Alur Kerja Kami
        </motion.h2>

        <div className='relative'>
          {/* Garis tengah */}
          <div className='hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primarylp/30 transform -translate-x-1/2'></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`mb-12 flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Spasi untuk garis */}
              <div className='md:w-1/2'></div>

              {/* Konten step */}
              <div className='bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto md:mx-0 relative z-10'>
                <div className='text-4xl mb-2'>{step.icon}</div>
                <h3 className='text-xl font-bold text-primarylp'>
                  {step.title}
                </h3>
                <p className='text-primarylp/80'>{step.desc}</p>
              </div>

              {/* Titik di garis tengah */}
              <div className='hidden md:block absolute left-1/2 w-6 h-6 bg-primarylp rounded-full transform -translate-x-1/2'></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
