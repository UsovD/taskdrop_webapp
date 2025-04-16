export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        {children}
      </body>
    </html>
  );
}