'use client';

export default function Contact() {
  return (
    <section id='kontak' className='bg-secondary text-primary py-16'>
      <div className='container mx-auto px-6 lg:px-20'>
        <h2 className='text-3xl font-bold text-primary mb-20 text-center'>
          Kontak & Lokasi
        </h2>

        <div className='grid md:grid-cols-2 gap-10'>
          {/* Kontak */}
          <div>
            <h3 className='text-2xl font-semibold mb-4'>Hubungi Kami</h3>
            <p className='mb-2'>
              📍 <strong>Alamat Workshop:</strong> Jl. Contoh No. 123, Solo
            </p>
            <p className='mb-2'>
              📱 <strong>WhatsApp:</strong>{' '}
              <a
                href='https://wa.me/6281234567890'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                +62 812-3456-7890
              </a>
            </p>
            <p className='mb-2'>
              📧 <strong>Email:</strong>{' '}
              <a
                href='mailto:carlostech@email.com'
                className='text-primary hover:underline'
              >
                carlostech@email.com
              </a>
            </p>
          </div>

          {/* Google Maps */}
          <div>
            <h3 className='text-2xl font-semibold mb-4'>Lokasi Workshop</h3>
            <div className='rounded-lg overflow-hidden shadow-lg'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.211879333792!2d110.8312287758436!3d-7.548909992463534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a168f2b75b3fb%3A0x5f74fce3e6fbb72b!2sSolo!5e0!3m2!1sid!2sid!4v1692434523456!5m2!1sid!2sid'
                width='100%'
                height='300'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
