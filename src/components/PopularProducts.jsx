'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PopularProducts() {
  const [tools, setTools] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    async function fetchTools() {
      try {
        const res = await fetch('/api/tool');
        const data = await res.json();
        setTools(data);
      } catch (err) {
        console.error('Gagal fetch tools:', err);
      }
    }
    fetchTools();
  }, []);

  const totalPages = Math.ceil(tools.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const currentItems = tools.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className='py-20 bg-secondarylp' id='popular-product'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-primarylp text-center mb-12'>
          Produk Terpopuler
        </h2>

        <div className='relative'>
          {/* Grid wrapper */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
            >
              {currentItems.map((tool, index) => (
                <div
                  key={tool.id || index}
                  className='bg-white rounded-lg shadow-lg overflow-hidden group transform transition duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(255,215,0,0.5)]'
                >
                  <img
                    src={tool.imageUrl || '/default.jpg'}
                    alt={tool.title}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-6'>
                    <h3 className='text-xl font-semibold text-primarylp mb-2'>
                      {tool.title}
                    </h3>
                    <p className='text-gray-600 text-sm mb-4'>
                      {tool.description || 'Tidak ada deskripsi'}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrev}
                className='absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-primarylp hover:text-white transition'
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className='absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-primarylp hover:text-white transition'
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
