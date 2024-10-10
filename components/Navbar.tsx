"use client"
import React, { useState } from 'react';
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            {/* Navbar */}
            <div className="navbar bg-white shadow-md px-6 sm:px-10 max-w-7xl mx-auto py-4">
                <div className="flex items-center justify-between">
                    
                    {/* Hamburger Menu (Mobile) */}
                    <div className="sm:hidden">
                        <button onClick={toggleDrawer} className="focus:outline-none">
                            <Menu size={24} />
                        </button>
                    </div>
                    
                    {/* Logo */}
                    <div>
                        <Link href={'/'}>
                            <img
                                className="w-12 h-12 rounded-full"
                                src="https://cms.bibijaan.com/wp-content/uploads/2023/12/logo_v1.5_round.png"
                                alt="Logo"
                            />
                        </Link>
                    </div>


                    {/* Desktop Menu */}
                    <div className="hidden sm:flex flex-row items-center text-gray-600 font-bold space-x-5">
                        <ul className="flex flex-row items-center space-x-5">
                            <li className="nav-item"><Link href={'/'}>মূলপাতা</Link></li>
                            <li className="nav-item">মিডিয়া</li>
                            <li className="nav-item">দেওয়াল চিত্র</li>
                            <li className="nav-item">ইতিহাসের পাতা</li>
                            <li className="nav-item">ছড়ানো মুক্তা</li>
                            <li className="nav-item">সিরিজ</li>
                            <li className="nav-item">প্যারেন্টীং</li>
                            <li className="nav-item">কবিতা</li>
                            <li className="nav-item">তালিকাসমূহ</li>
                        </ul>
                    </div>

                    {/* Search Icon */}
                    <div className="flex items-center font-bold cursor-pointer hover:text-teal-600">
                        <Search size={18} className="me-1.5" />
                        <span>Search</span>
                    </div>
                </div>
            </div>

            {/* Mobile Left Drawer */}
            <div className={`fixed inset-0 z-50 transition-transform duration-300 transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} sm:hidden`}>
                {/* Drawer Content */}
                <div className="w-64 bg-white h-full shadow-md z-50 relative">
                    <div className="flex items-center justify-between p-4">
                        <img
                            className="w-10 h-10 rounded-full"
                            src="https://cms.bibijaan.com/wp-content/uploads/2023/12/logo_v1.5_round.png"
                            alt="Logo"
                        />
                        <button onClick={toggleDrawer} className="focus:outline-none">
                            <X size={24} />
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-3 text-gray-600 font-bold p-4">
                        <li className="nav-item"><Link href={'/'}>মূলপাতা</Link></li>
                        <li className="nav-item">মিডিয়া</li>
                        <li className="nav-item">দেওয়াল চিত্র</li>
                        <li className="nav-item">ইতিহাসের পাতা</li>
                        <li className="nav-item">ছড়ানো মুক্তা</li>
                        <li className="nav-item">সিরিজ</li>
                        <li className="nav-item">প্যারেন্টীং</li>
                        <li className="nav-item">কবিতা</li>
                        <li className="nav-item">তালিকাসমূহ</li>
                    </ul>
                </div>

                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={toggleDrawer}
                />
            </div>
        </>
    );
};

export default Navbar;