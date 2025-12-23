import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import {Navbar, Footer} from './html.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const cantoNavbar = document.getElementById('navbarMarota');
const cantoFooter = document.getElementById('footerMaroto');

const rootNavbar = createRoot(cantoNavbar);
const rootFooter = createRoot(cantoFooter);

rootNavbar.render(
    <StrictMode>
        <Navbar />
    </StrictMode>
)

rootFooter.render(
    <StrictMode>
        <Footer />
    </StrictMode>
)