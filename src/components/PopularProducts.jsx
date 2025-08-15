'use client';

import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: 'Bubut Pulley',
    description:
      'Layanan pembubutan pulley presisi tinggi untuk mesin industri.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    name: 'Bubut Poros',
    description: 'Perbaikan dan pembuatan poros sesuai spesifikasi Anda.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    name: 'Sparepart Custom',
    description: 'Pembuatan komponen custom yang tidak tersedia di pasaran.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 4,
    name: 'Perbaikan Ulir',
    description:
      'Perbaikan ulir rusak untuk berbagai ukuran dan jenis material.',
    image: 'https://via.placeholder.com/300x200',
  },
];

export default function PopularProducts() {
  return (
    <section className='py-20 bg-secondary' id='popular-product'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-primary text-center mb-12'>
          Produk Terpopuler
        </h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white rounded-lg shadow-lg overflow-hidden group transform transition duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(255,215,0,0.5)]'
            >
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-primary mb-2'>
                  {product.name}
                </h3>
                <p className='text-gray-600 text-sm mb-4'>
                  {product.description}
                </p>
                <button className='btn bg-primary text-white hover:bg-primary/90 w-full'>
                  Pesan Sekarang
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
