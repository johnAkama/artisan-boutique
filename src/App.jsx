import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageProgress';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';

function App() {
    return (
        <LangProvider>
            <Router>
                <PageLoader />
                <Navbar />
                <main style={{ padding: 0 }}>
                    <PageTransition>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </PageTransition>
                </main>
                <Footer />
            </Router>
        </LangProvider>
    );
}

export default App;
