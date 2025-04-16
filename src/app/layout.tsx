import './globals.css';

export const metadata = {
  title: 'TaskDrop',
  description: 'Task Manager',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-zinc-950 text-white p-4">{children}</body>
    </html>
  )
}
