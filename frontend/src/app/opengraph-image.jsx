import { ImageResponse } from 'next/og';

export const alt = 'Amzad Ali Memorial Foundation — Serving Humanity with Compassion and Dedication';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #1b5e20 0%, #3674B5 100%)',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>AAMF • EST. 2007</div>
        <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, marginTop: 28, maxWidth: 980 }}>
          Amzad Ali Memorial Foundation
        </div>
        <div style={{ fontSize: 34, marginTop: 32, opacity: 0.92 }}>
          Healthcare • Education • Welfare • Community Development
        </div>
      </div>
    ),
    size,
  );
}
