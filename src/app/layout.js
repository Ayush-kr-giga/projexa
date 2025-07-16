import '../styles/globals.css';

export const metadata = {
  title: 'Projexa',
  description: 'Manage your projects efficiently with Projexa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
