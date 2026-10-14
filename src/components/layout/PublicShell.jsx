import Navbar from './Navbar';
import Footer from './Footer';
import FloatingSocial from './FloatingSocial';
import CompareBar from '../vehicles/CompareBar';

export default function PublicShell({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CompareBar />
      <FloatingSocial />
    </>
  );
}
