import React from "react";
import InpFields from "@/app/components/inpFields/inpFields";
const Page = async ({ params }) => {
  const { id } = params;
  console.log(id, "id");

  try {
    const res = await fetch(`https://api.imgflip.com/get_memes`);
    const data = await res.json();
    const memeObj = data.data.memes.find((m) => m.id === id);
    console.log(memeObj, "ok");

    return (
    
    <InpFields memeObj={memeObj}/>);
  } catch (error) {
    console.error("Error fetching meme:", error.message);
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center text-red-600">
            Failed to load meme data.
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
