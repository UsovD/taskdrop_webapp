
export const metadata = {
  title: 'TaskDrop',
  description: 'Task manager',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head />
      <body>{children}</body>
    </html>
  )
}
