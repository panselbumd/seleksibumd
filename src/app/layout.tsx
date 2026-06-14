import type { Metadata, Viewport } from 'next'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SIMBUBALADA – Pemerintah Kota Batu',
    template: '%s | SIMBUBALADA',
  },
  description: 'Sistem Informasi Manajemen Seleksi BUMD dan BLUD Kota Batu – Portal resmi seleksi Direksi, Komisaris, dan Dewan Pengawas BUMD/BLUD Pemerintah Kota Batu.',
  keywords: ['BUMD', 'BLUD', 'seleksi', 'Kota Batu', 'Direksi', 'Komisaris'],
  authors: [{ name: 'Pemerintah Kota Batu' }],
  robots: 'noindex, nofollow',
}

export const viewport: Viewport = {
  themeColor: '#1E3A5F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontSize:     '13px',
              borderRadius: '12px',
              border:       '1px solid #E2E8F0',
              boxShadow:    '0 4px 24px rgba(0,0,0,.1)',
              fontFamily:   'Inter, system-ui, sans-serif',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  )
}
