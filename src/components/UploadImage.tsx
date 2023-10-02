import React, { useState, ChangeEvent } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export default function UploadImage (){
    const [files, setFiles] = useState<File[]>([]);


    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        
        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                const fileType = fileList[i].type;
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                if (validImageTypes.includes(fileType)) {
                    setFiles([...files, fileList[i]]);
                }
            }
        }
    };

    const removeImage = (name: string) => {
        setFiles(files.filter(file => file.name !== name));
    };

    return (
    <div className='p-4 sm:ml-64 sm:mt-10'>
        <div className='cover_image_container w-96 shadow-md rounded-xl'>
            {/* Header */}
            <div className=' bg-cyan-200 rounded-t-xl'>
                <h2 className='text-black font-semibold text-left p-3'>
                    Upload Cover Image
                </h2>
            </div>

            {/* Upload Image Area */}   
            <div className=''>
                <div className="flex justify-center items-center px-3">
                    <div className="rounded-lg ">
                        {files && files.length > 0 ? (
                            <div className="">
                                <div className="relative w-96 h-52 overflow-hidden">
                                    <img
                                    className="w-full h-full object-cover"
                                    src={URL.createObjectURL(files[0])}
                                    alt={files[0].name}
                                    />
                                    
                                </div>
                                <div className="m-2 rounded-b-xl bg-white">
                                    <button
                                        className="text-red-500 hover:text-red-700 flex"
                                        onClick={() => removeImage(files[0].name)}
                                    >
                                        <IoIcons.IoMdClose className="w-6 h-6 mr-2"/>
                                        <p className=" text-red-500 hover:text-red-700 font-extrabold">Delete and re-upload</p>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="m-4 p-4 rounded-b-xl">
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex flex-col items-center justify-center pt-7">
                                        <AiIcons.AiOutlineUpload className='w-9 h-9' />
                                        <h1 className='font-semibold'>Upload cover Image</h1>
                                        <p className="text-xs text-gray-500">16:9 ratio is recommended, Max Image size 1mb</p>
                                    </div>
                                    <input type="file" onChange={handleFile} className="opacity-0" multiple name="files[]" />
                                    </label>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>  
    );
}