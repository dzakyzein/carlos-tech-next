'use client';

import { motion } from 'framer-motion';
import {
  WrenchScrewdriverIcon,
  CogIcon,
  CubeTransparentIcon,
} from '@heroicons/react/24/outline';

const services = [
  {
    icon: <CogIcon className='w-12 h-12 text-accent' />,
    title: 'Pembubutan Poros & Shaft',
    desc: 'Pembuatan dan perbaikan poros mesin dengan tingkat presisi tinggi untuk berbagai kebutuhan industri.',
  },
  {
    icon: <WrenchScrewdriverIcon className='w-12 h-12 text-accent' />,
    title: 'Komponen Custom',
    desc: 'Pengerjaan komponen custom sesuai desain & spesifikasi Anda, cocok untuk mesin yang sudah tidak diproduksi.',
  },
  {
    icon: <CubeTransparentIcon className='w-12 h-12 text-accent' />,
    title: 'Rekondisi Sparepart',
    desc: 'Mengembalikan fungsi komponen lama dengan pembubutan ulang sehingga siap digunakan kembali.',
  },
];

export default function Services() {
  return (
    <section className='bg-secondary py-20' id='services'>
      <div className='container mx-auto px-6 md:px-12 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl md:text-4xl font-bold text-primary'
        >
          Layanan Kami
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mt-4 text-primary/80 max-w-2xl mx-auto'
        >
          Kami menyediakan jasa pembubutan mesin dengan standar presisi tinggi
          dan hasil yang memuaskan.
        </motion.p>

        <div className='mt-12 grid gap-8 md:grid-cols-3'>
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className='bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition'
            >
              <div className='flex justify-center mb-6'>{service.icon}</div>
              <h3 className='text-xl font-semibold text-primary'>
                {service.title}
              </h3>
              <p className='mt-4 text-primary/70'>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
