import type { Metadata, Viewport } from 'next';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind',
  display: 'swap',
});

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ['400', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-serif-bengali',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'মিনুর স্মৃতি',
  description: 'নওরিনের প্রিয় বিড়াল মিনুর স্মৃতিতে একটি গভীর ভালোবাসার মোবাইল মেমোরিয়াল ওয়েবসাইট।',
  openGraph: {
    title: 'মিনুর স্মৃতি – Minu\'s Memorial',
    description: 'নওরিনের প্রিয় বিড়াল মিনুর স্মৃতিতে একটি গভীর ভালোবাসার মেমোরিয়াল।',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'মিনুর স্মৃতি – Minu\'s Memorial',
    description: 'নওরিনের প্রিয় বিড়াল মিনুর স্মৃতিতে একটি গভীর ভালোবাসার মেমোরিয়াল।',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕯️</text></svg>',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0b1026',
};

// Polyfill script to allow extensions & sandbox tools to wrap window.fetch without throwing
const fetchShimScript = `
(function() {
  try {
    var _fetch = window.fetch;
    try {
      Object.defineProperty(window, 'fetch', {
        configurable: true,
        enumerable: true,
        get: function() { return _fetch; },
        set: function(v) { _fetch = v; }
      });
    } catch(err1) {
      var proto = Object.getPrototypeOf(window);
      if (proto) {
        Object.defineProperty(proto, 'fetch', {
          configurable: true,
          enumerable: true,
          get: function() { return _fetch; },
          set: function(v) { _fetch = v; }
        });
      }
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${notoSerifBengali.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: fetchShimScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#04060c] text-[#fff4e0] antialiased overflow-x-hidden min-h-[100dvh] font-sans selection:bg-[#f4c56a]/30 selection:text-[#fff4e0]"
      >
        {children}
      </body>
    </html>
  );
}
