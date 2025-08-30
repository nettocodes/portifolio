import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Ivo Netto - Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 900,
              margin: 0,
              marginBottom: '20px',
              letterSpacing: '-4px',
            }}
          >
            Ivo Netto
          </h1>
          <p
            style={{
              fontSize: '32px',
              fontWeight: 400,
              margin: 0,
              color: '#a3a3a3',
              fontFamily: 'monospace',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Full-Stack Developer
          </p>
          <div
            style={{
              marginTop: '40px',
              width: '80px',
              height: '4px',
              backgroundColor: '#fafafa',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
