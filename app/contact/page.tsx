import React from 'react';
import Link from "next/link";
import {FaFacebook, FaTwitter} from "react-icons/fa";
import {Metadata} from "next";

// Page-specific metadata
export const metadata: Metadata = {
    title: "Contact Us - Hoytoba",
    description: "Learn more about Hoytoba and our mission to connect music lovers.",
    openGraph: {
        title: "Contact Us - Hoytoba",
        description: "Explore Hoytoba's history and vision.",
        url: "https://hoytoba.vercel.app/contact",
    },
};


const Contact = () => {
    return (
        <div>
            <div className="text-center mt-5">
                <div className="mt-5">
                    <p>All contents of this web site are taken from <Link href={'https://hoytoba.com'} target={'_blank'} className="underline text-blue-700">hoytoba.com</Link>.
                    This web site is created purely for educational purpose</p>
                    <p className="mt-10">This website design & develop by:</p>
                    <h1 className="text-2xl font-bold">Habibur Rahaman</h1>
                    <p>creativehabibur@gmail.com</p>
                    <p>Gazipur-1704, Dhaka, Bangladesh</p>
                </div>
                <div className="flex space-x-2 items-center justify-center">
                    <Link href={'https://fb.com/creativehabibs'} target={'_blank'}
                          className="text-blue-700 text-2xl"><FaFacebook/></Link>
                    <Link href={'https://x.com/creativehabib'} target={'_blank'} className="text-2xl"><FaTwitter/></Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;