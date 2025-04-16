
import "@/app/globals.css";
export const metadata = {
  title: "TaskDrop",
  description: "Task manager powered by Flask backend",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-white min-h-screen font-sans">{
        children
      }</body>
    </html>
  );
}
