export const metadata = {
  title: 'Agil.ai - Smart Search Engine',
  description: 'Mesin pencari pintar by Agil',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body style={{ backgroundColor: '#0a0a0a', margin: 0, color: 'white' }}>
        {children}
      </body>
    </html>
  )
}
