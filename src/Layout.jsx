// src/components/Layout.jsx
import React, { useRef, useEffect, useState } from 'react';
import './Layout.css';

function Layout({ children }) {
    const headerRef = useRef(null);
    const footerRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('100vh');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const footerHeight = footerRef.current?.offsetHeight || 0;
        setContentHeight(`calc(100vh - ${headerHeight}px - ${footerHeight}px)`);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="layout-container">
            <header ref={headerRef} className="layout-header">
                <button className="burger-menu" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1>My App Header</h1>
            </header>
            <div className="layout-content">
                <aside className={`layout-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <ul>
                        <li>Menu Item 1</li>
                        <li>Menu Item 2</li>
                        <li>Menu Item 3</li>
                    </ul>
                </aside>
                <main className="layout-main" style={{ height: contentHeight, overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
            <footer ref={footerRef} className="layout-footer">
                <p>My App Footer</p>
            </footer>
        </div>
    );
}

export default Layout;