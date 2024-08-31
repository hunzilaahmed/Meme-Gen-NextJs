'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";

const InpFields = ({ memeObj }) => {
    const router = useRouter();
    const [inp, setInp] = useState("");
    const [inp2, setInp2] = useState("");
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);   
        try {
            const res = await fetch(`https://api.imgflip.com/caption_image?template_id=${memeObj?.id}&username=hunzila&password=hunzilaahmed&text0=${inp}&text1=${inp2}`);
            const responseJson = await res.json();
            console.log(responseJson, "responseJson");
            setUrl(responseJson.data.url);
        } catch (error) {
            console.error("Error generating meme:", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 flex flex-col items-center">
            <div className="container max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                    Meme Generator
                </h1>

                <div className="mb-6">
                    <img
                        src={memeObj.url}
                        alt={memeObj.name}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                        className="bg-gray-100 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={inp}
                        placeholder="Top Text"
                        onChange={(e) => setInp(e.target.value)}
                    />
                    <input
                        className="bg-gray-100 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={inp2}
                        placeholder="Bottom Text"
                        onChange={(e) => setInp2(e.target.value)}
                    />
                </div>

                <button
                    className="bg-green-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={loading} 
                >
                    {loading ? 'Generating...' : 'Generate Meme'}
                </button>
            </div>

            {loading && (
                <div className="mt-6 text-lg text-blue-600">Generating your meme, please wait...</div>
            )}

            {url && !loading && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Your Generated Meme
                    </h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <Image 
                            src={url} 
                            alt="Generated Meme" 
                            height={500} 
                            width={500} 
                            className="rounded-lg mx-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InpFields;
