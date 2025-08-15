'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className='bg-primary text-secondary py-8'>
      <div className='container mx-auto px-6 lg:px-20'>
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Logo & Deskripsi */}
          <div>
            <h3 className='text-2xl font-bold text-accent mb-4'>Carlos Tech</h3>
            <p className='text-secondary/80'>
              Spesialis pembubutan mesin presisi untuk industri, bengkel, dan
              kebutuhan custom. Kualitas terjamin, pengerjaan cepat, sesuai
              spesifikasi.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Hubungi Kami</h4>
            <p className='mb-2'>📍 Jl. Contoh No. 123, Solo</p>
            <p className='mb-2'>📱 +62 812-3456-7890</p>
            <p>📧 carlostech@email.com</p>
          </div>
        </div>

        {/* Garis Bawah & Hak Cipta */}
        <div className='border-t border-secondary/30 mt-8 pt-6 text-center text-secondary/70 text-sm'>
          © {new Date().getFullYear()} Carlos Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
