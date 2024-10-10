import React from 'react';
import {Search} from "lucide-react";

const Navbar = () => {
    return (
        <div className="navbar bg-white shadow-md px-10 max-w-7xl mx-auto py-4">
            <div className="flex items-center justify-between">
                <div>
                    <img className="w-12 h-12 rounded-full" src="https://cms.bibijaan.com/wp-content/uploads/2023/12/logo_v1.5_round.png" />
                </div>
                <div>
                    <ul className="flex flex-row items-center mx-auto ml-auto text-gray-600 font-bold space-x-5">
                        <li className="nav-item">মূলপাতা</li>
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
                <div className="flex items-center font-bold cursor-pointer hover:text-teal-600">
                    <Search size={18} className="me-1.5" />
                    <span>Search</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;