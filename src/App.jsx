import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageProgress';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Story from './pages/Story';
import Contact from './pages/Contact';

function App() {
    return (
        <LangProvider>
            <Router>
                <PageLoader />
                <Navbar />
                <main style={{ padding: 0 }}>
                    <PageTransition>
                        <Routes>
                            <Route path="/"        element={<Home />} />
                            <Route path="/shop"    element={<Shop />} />
                            <Route path="/about"   element={<About />} />
                            <Route path="/story"   element={<Story />} />
                            <Route path="/contact" element={<Contact />} />
                            {/* legacy redirect */}
                            <Route path="/products" element={<Shop />} />
                        </Routes>
                    </PageTransition>
                </main>
                <Footer />
            </Router>
        </LangProvider>
    );
}

export default App;
