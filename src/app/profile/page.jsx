'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { UserIcon } from 'lucide-react';

// Fungsi bantuan untuk men-format mata uang
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const ITEMS_PER_PAGE = 5; // jumlah pesanan per halaman

const UserProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [reservations, setReservations] = useState([]);
  const [isReservationsLoading, setIsReservationsLoading] = useState(true);
  const [uploadingStatus, setUploadingStatus] = useState({});

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Proteksi rute
  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login');
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (session) {
        setIsReservationsLoading(true);
        try {
          const response = await fetch('/api/reservation/user');
          if (!response.ok) throw new Error('Gagal mengambil data pesanan.');
          const data = await response.json();
          setReservations(data);
        } catch (error) {
          console.error('Error fetching reservations:', error);
        } finally {
          setIsReservationsLoading(false);
        }
      }
    };
    if (session) fetchReservations();
  }, [session]);

  // Upload pertama
  const handlePaymentProofUpload = async (reservationId, file) => {
    if (!file) return;
    setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'uploading' }));

    try {
      // STEP 1: Upload file
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/reservation/upload-payment-proof', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const fileUrl =
        typeof data.fileUrl === 'string' ? data.fileUrl : data.fileUrl.url;

      // STEP 2: Simpan ke DB
      await fetch('/api/reservation/update-payment-proof', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId,
          fileUrl,
        }),
      });

      setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'success' }));
    } catch (err) {
      console.error('Error upload:', err);
      setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'failed' }));
    }
  };

  // Reupload
  const handlePaymentProofReupload = async (reservationId, file) => {
    if (!file) return;
    setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'uploading' }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/reservation/upload-payment-proof', {
        method: 'POST', // tetap pakai POST untuk upload file
        body: formData,
      });

      const data = await res.json();
      const fileUrl =
        typeof data.fileUrl === 'string' ? data.fileUrl : data.fileUrl.url;

      await fetch('/api/reservation/update-payment-proof', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId,
          fileUrl,
        }),
      });

      setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'success' }));
    } catch (err) {
      console.error('Error reupload:', err);
      setUploadingStatus((prev) => ({ ...prev, [reservationId]: 'failed' }));
    }
  };

  // Data dengan pagination
  const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentReservations = reservations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <p className='text-xl text-gray-700 animate-pulse'>Memuat...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className='min-h-screen bg-gray-100 p-4 pt-20'>
        <div className='container mx-auto'>
          {/* Header Profil */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-8 text-center'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>
              Profil Pengguna
            </h1>

            <div className='mb-6 flex justify-center'>
              <div className='w-32 h-32 rounded-full border-4 border-gray-300 bg-gray-200 flex items-center justify-center'>
                <UserIcon className='w-16 h-16 text-gray-600' />
              </div>
            </div>

            <div className='space-y-4 text-left inline-block'>
              <div className='border-b pb-2'>
                <p className='text-gray-500 text-sm'>Nama</p>
                <p className='font-semibold text-gray-700'>
                  {session.user.name}
                </p>
              </div>
              <div className='border-b pb-2'>
                <p className='text-gray-500 text-sm'>Email</p>
                <p className='font-semibold text-gray-700'>
                  {session.user.email}
                </p>
              </div>
              <div className='border-b pb-2'>
                <p className='text-gray-500 text-sm'>Peran (Role)</p>
                <p className='font-semibold text-gray-700'>
                  {session.user.role}
                </p>
              </div>
            </div>
          </div>

          {/* Daftar Pesanan */}
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>
              Daftar Pesanan Saya
            </h2>

            {isReservationsLoading ? (
              <p className='text-center text-gray-500'>Memuat pesanan...</p>
            ) : reservations.length === 0 ? (
              <p className='text-center text-gray-500'>
                Anda belum memiliki pesanan.
              </p>
            ) : (
              <>
                <div className='space-y-6'>
                  {currentReservations.map((res) => (
                    <div
                      key={res.id}
                      className='border rounded-lg p-4 shadow-sm'
                    >
                      <div className='flex flex-col md:flex-row md:items-center justify-between'>
                        <div>
                          <p className='text-lg font-bold text-gray-800'>
                            {res.name}
                          </p>
                          <p className='text-sm text-gray-500'>
                            Pesanan pada:{' '}
                            {format(new Date(res.createdAt), 'dd MMMM yyyy', {
                              locale: id,
                            })}
                          </p>
                          <p className='text-sm text-gray-500'>
                            Total Harga: {formatCurrency(res.price)}
                          </p>
                        </div>

                        <div className='mt-4 md:mt-0 md:text-right'>
                          <p
                            className={`font-semibold text-sm ${
                              res.status === 'LUNAS'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            Status: {res.status}
                          </p>
                          <p className='text-sm text-gray-600'>
                            Progres: {res.progress}
                          </p>

                          {res.status === 'BELUM_LUNAS' && (
                            <div className='mt-2'>
                              {uploadingStatus[res.id] === 'uploading' ? (
                                <p className='text-sm text-blue-500 animate-pulse'>
                                  Mengunggah...
                                </p>
                              ) : (
                                <div>
                                  {!res.paymentProof ? (
                                    // Jika belum ada bukti pembayaran
                                    <>
                                      <input
                                        type='file'
                                        accept='image/*'
                                        id={`upload-proof-${res.id}`}
                                        className='hidden'
                                        onChange={(e) =>
                                          handlePaymentProofUpload(
                                            res.id,
                                            e.target.files[0]
                                          )
                                        }
                                      />

                                      <label
                                        htmlFor={`upload-proof-${res.id}`}
                                        className='inline-block bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition'
                                      >
                                        Upload Bukti
                                      </label>
                                    </>
                                  ) : (
                                    // Jika sudah ada bukti pembayaran
                                    <div className='space-y-2'>
                                      <img
                                        src={res.paymentProof}
                                        alt='Bukti Pembayaran'
                                        className='w-40 h-40 object-cover rounded-md border'
                                      />
                                      <input
                                        type='file'
                                        accept='image/*'
                                        id={`reupload-proof-${res.id}`}
                                        className='hidden'
                                        onChange={(e) =>
                                          handlePaymentProofReupload(
                                            res.id,
                                            e.target.files[0]
                                          )
                                        }
                                      />

                                      <label
                                        htmlFor={`reupload-proof-${res.id}`}
                                        className='inline-block bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition'
                                      >
                                        Reupload
                                      </label>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          {uploadingStatus[res.id] === 'success' && (
                            <p className='text-sm text-green-500 mt-2'>
                              Berhasil diunggah! Menunggu verifikasi.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className='flex justify-center items-center mt-6 gap-2'>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
                  >
                    Prev
                  </button>
                  <span className='px-3'>
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UserProfilePage;
