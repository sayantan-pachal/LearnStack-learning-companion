import React from 'react'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

function Layout() {
    return (
        <div>
            <Header />
            <ScrollToTop />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout