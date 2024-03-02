'use client'
import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooks, getUser } from "@/services";
import ReactPaginate from 'react-paginate';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import { toast, ToastContainer } from "react-toastify";
import getAllApartments from "../../fauna/getApartments";
import deleteCollection from "../../fauna/deleteCollection";

const Apartments = () => {
  const [allApartments, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [apartmentsPerPage] = useState(10); // Number of books to display per page
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [filteredApartments, setFilteredApartments] = useState([]); // State to store filtered books
  const [sortBy, setSortBy] = useState(""); // State to store the selected sort option
  const [sortByCategory, setSortByCategory] = useState(""); // State to store the selected category for sorting

  useEffect(() => {
    if (!getUser()) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const apartments = await getAllApartments();
            const reformedCollection = apartments.map((collection) => {
                return { ...collection.data, id: collection.ref.id };
            });
            setCollection(reformedCollection);
      setLoading(false);
    }
    fetchData();
  }, []);

  const deleteApartmentFunction = async (apartmentId) => {
      const response = await deleteCollection('properties',apartmentId);

      if (response.ts) {
        const filteredApartments = allApartments.filter(apartment => apartment.id !== apartmentId);

        setFilteredApartments(filteredApartments);
        toast.success("Apartment deleted successfully");
      }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    // Filter books based on the search term
    const filtered = allApartments.filter((collection) =>
      collection.title.toLowerCase().includes(searchTerm.toLowerCase())
      // collection.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort books based on the selected option
    let sortedBooks = [...filtered];

    if (sortBy === "title") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "author") {
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === "price") {
      sortedBooks.sort((a, b) => a.price - b.price);
    } else if (sortBy === "category") {
      sortedBooks.sort((a, b) => a.category.localeCompare(b.category));
    }

    setFilteredApartments(sortedBooks);
  }, [searchTerm, sortBy, allApartments]);

  const indexOfLastCollection = (currentPage + 1) * apartmentsPerPage;
  const indexOfFirstBook = indexOfLastCollection - apartmentsPerPage;
  const currentApartments = filteredApartments.slice(indexOfFirstBook, indexOfLastCollection);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  // Function to handle sorting by title, author, price, or category
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);

    if (selectedOption === "category") {
      // If sorting by category, set the sortByCategory state
      const selectedCategory = e.target.options[e.target.selectedIndex].getAttribute("data-category");
      setSortByCategory(selectedCategory);
    } else {
      setSortByCategory(""); // Reset category sorting
    }
  };

  console.log('current', currentApartments)

  return (
    <>
     <ToastContainer />
      <main className="min-h-screen flex-col items-center justify-between" style={{ margin: 20 }}>
      <Image
              src={'https://tiracrest.vercel.app/_next/image?url=https%3A%2F%2Fucarecdn.com%2F4c781150-fca0-4151-ba4e-3d3ae8186258%2FtiraLogo.png&w=256&q=75'}
              alt={'Tira Crest'}
              width={100}
              height={100}
              style={{ resizeMode: 'cover' }}
            />
        <nav className="items-center space-x-4 justify-center" style={{ marginTop: 20, marginBottom: 20 }}>
          {[
            ["Create Apartment", "/addApartment"],
            ["Apartments", "/apartments"],
          ].map(([title, url]) => (
            <a
              key={url}
              href={url}
              className="bg-gray-500 rounded-lg px-3 py-2 text-white-700 font-medium hover:bg-slate-100 hover:text-slate-900"
            >
              {title}
            </a>
          ))}
         
        </nav>
        <h1 className="text-3xl font-bold mb-4">All Apartments</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Location</th>
                <th scope="col" className="px-6 py-3">Picture</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentApartments.map((collection) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={collection.id}>
                  <td className="px-6 py-4">{collection?.title}</td>
                  <td className="px-6 py-4">{collection?.location}</td>
                  <td className="px-6 py-4">
                    {collection.images && (
                    <Image
                      src={collection.images[0]}
                      alt={collection.title}
                      width={100}
                      height={100}
                      style={{ resizeMode: 'cover' }}
                    />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {/* <Link
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                      href={{
                        pathname: 'editApartment',
                        query: { id: collection.id },
                      }}
                    >Edit</Link> */}
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteApartmentFunction(collection.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          pageCount={Math.ceil(filteredApartments.length / apartmentsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center space-x-2 mt-4"} // Style the container
          pageClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the page button
          activeClassName={"bg-blue-600"} // Style the active page button
          previousClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the previous button
          nextClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the next button
          breakClassName={"bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"} // Style the break button
          disabledClassName={"bg-gray-300 text-gray-500 cursor-not-allowed"} // Style the disabled button
        />
      </main>
      <Footer />
    </>
  );
};

export default Apartments;