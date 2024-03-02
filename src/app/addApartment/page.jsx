/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UploadCloudinary, createBook, getUser } from "@/services";
import  createApartment  from "../../fauna/createApartment"
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const addCollection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [images, setImages] = useState([]);

  const handleImageUpload = async (event) => {
    const uploadedImages = Array.from(event.target.files);

    setImageUploadLoading(true);

    // Resize and upload each image
    const uploadPromises = uploadedImages.map(async (file) => {
      const compressedImage = await compressImage(file);
      return UploadCloudinary(compressedImage);
    });

    try {
      // Wait for all uploads to complete
      const uploads = await Promise.all(uploadPromises);

      // Extract the secure URLs from the uploads
      const secureURLs = uploads.map((upload) => upload.secure_url);

      // Optionally, you can add the secure URLs to your state or handle them as needed
      setImages(secureURLs);

      console.log('Uploaded images:', secureURLs);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.1, // Set the target size in MB
      maxWidthOrHeight: 800, // Adjust this based on your requirements
    };

    try {
      const compressedFile = await imageFileResizer(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      return file; // Return the original file in case of an error
    }
  };

  React.useEffect(() => {
		if (!getUser()) {
			window.location.href = "/login";
		}
	}, []);

  // Function to handle image selection
  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImageUploadLoading(true);
  //     const upload = await UploadCloudinary(file);
  //     // const convertedFile = await Convert(file) // switch this to use base64
  //     // setResume(upload.secure_url);
  //     setImage(upload.secure_url);
  //     setImageUploadLoading(false);
  //   }
  // };

  // Remove the selected image
  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCollection = {
      title,
      description,
      location,
      features: categories,
      images,
    };
    
    if (!title || !description || !location || categories.length === 0 || images.length === 0) {
      toast.error('Please fill in all required fields and upload at least one image.');
      return; 
    }

    const response = await createApartment(newCollection);

    if (response.ts) {
      toast.success("Apartment created successfully");
    }

    setTitle("");
    setDescription("");
    setImage("");
    setCategories([]);
    setCategoryId("");
  };

  // const handleCategoryChange = (e) => {
  //   const selectedCategory = e.target.value;
  //   if (!categories.includes(selectedCategory)) {
  //     setCategories([...categories, selectedCategory]);
  //   }
  //   setCategoryId("");
  // };


const handleCategoryChange = () => {
  const trimmedCategory = categoryId.trim();
  if (trimmedCategory && !categories.includes(trimmedCategory)) {
    setCategories([...categories, trimmedCategory]);
  }
  setCategoryId("");
};

  const removeCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const features = [ 
    "WiFi",
    "Ps5 Console",
    "Vinyl Recorder",
    "Telescope",
    "Netflix",
    "Dstv",
    "Guitar",
    "Drum",
    "Mini bar",
    "Coffee machine",
    "Inverter backed up",
    "Water view",
    "24/7 Power",
    "24/7 Security",
    "House Attendant on Standby",
    "Chef on Standby",
    "Access Control",
    "Ice Machine",
    "Smart TVs",
    "Smart Refrigerator",
    "Complimentaries",
    "Gated Compound",
    "House Keeping",
    "Washing Machine",

];

  return (
    <>
      <ToastContainer />
      
      <nav className="flex sm:justify-center space-x-4" style={{marginTop: 20}}>
        
        {[
          ["Create Apartment", "/addApartment"],
          ["Apartments", "/apartments"],
        ].map(([title, url]) => (
          <a key={url} href={url} className="bg-gray-500 rounded-lg px-3 py-2 text-white-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a>
        ))}
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-dark-600 py-2 px-6 sm:px-6 lg:px-1">
        <div className="max-w-screen-md w-full space-y-12">
          {/* <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">
              Add Apartment
            </h2>
          </div> */}
          <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lekki Apartment 001"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Location
                </label>
                <input
                  id="title"
                  name="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lekki phase 1"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Spacious Apartment at the heart of Lagos"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  House Features
                </label>
                <div className="mb-2">
                <p className="text-sm font-semibold text-gray-500 mb-1">Common Features:</p>
                <ul className="flex flex-wrap space-x-2">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      onClick={() => setCategoryId(feature)}
                      className="cursor-pointer hover:bg-blue-700 text-gray-700 px-2 py-1 rounded mr-2 mb-2"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="categoryInput"
                    name="categoryInput"
                    placeholder="Enter a category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleCategoryChange}
                    className="bg-blue-500 text-white rounded-r-lg px-4 py-2.5 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="m-6">
                Selected Categories:
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="ml-2 text-white-900 cursor-pointer clickable-category underline"
                    onClick={() => removeCategory(index)}
                  >
                    {category} (x)
                  </span>
                ))}
              </div>
            {/* </div> */}
            <div style={{marginTop: 100}}>
              <div className="mb-6">
              <label htmlFor="image" className="block text-sm font-medium text-white-700">
                Image Upload:
              </label>
              {images.length > 0 ? (
                <div className="mt-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Selected Image ${index + 1}`}
                        className="w-full h-24 rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : null
              }
              <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
              <button
                type="submit"
                onClick={handleSubmit}
                style={{ marginTop: 20 }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {imageUploadLoading ? "Image Loading..." : "Add Apartment"}
              </button>
              <a
                style={{ marginTop: 20 }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                href="/apartments"
                rel="noopener noreferrer"
              >
                Go back
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default addCollection;
