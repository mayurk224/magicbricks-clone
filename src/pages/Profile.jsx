import React, { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import ListingCard from "../components/ListingCard";
import { MdOutlineDomainAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Profile() {
  const [isVisibleAction, setIsVisibleAction] = useState(false);
  const actionDropdown = () => {
    setIsVisibleAction(!isVisibleAction);
  };
  const [isHoveredAction, setIsHoveredAction] = useState(false);
  const [isHoveredFilter, setIsHoveredFilter] = useState(false);
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);
  const filterDropdown = () => {
    setIsVisibleFilter(!isVisibleFilter);
  };
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const editForm = () => {
    setIsVisibleForm(!isVisibleForm);
  };
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <div>
      <Header />
      <div className="profile mt-[65px]">
        <div className="relative lg:h-[400px] ms:h-[300px]">
          <img
            src="https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="object-cover lg:h-[400px] ms:h-[300px] w-full "
          />
          <div className="lg:w-72 bottom-0 top-0 lg:left-36 ms:w-full ms:left-0 ms:right-0 ms:top-0 absolute flex flex-col items-center justify-center ms:gap-3 lg:gap-4">
            {isVisibleForm ? (
              <div className="flex flex-col gap-2">
                <div>
                  <label className="text-xl font-bold">Edit Details</label>
                </div>
                <form  className="ms:gap-1 lg:gap-2 flex flex-col">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 h- text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="name"
                      value={name} placeholder="Name"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <input
                    className="block  w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                    accept="image/*"
                  />
                  <input
                    className="block  w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    placeholder=""
                    type="file"
                    accept="image/*"
                  />
                  <button
                    type="submit"
                    
                    className="text-white w-40 mx-auto mt-2 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2 ms:px-4 ms:py-2"
                  >
                    <FaUserEdit className="text-lg" />
                    Save Changes
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={auth.currentUser.photoURL ? auth.currentUser.photoURL : "https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=600" }
                  className="lg:h-40 lg:w-40 ms:h-28 ms:w-28 object-cover rounded-full"
                />
                <div className="flex flex-col text-center gap-1">
                  <div className="flex flex-col text-center gap-1">
                    <label className="lg:text-3xl ms:text-xl font-semibold">
                      {name}
                    </label>
                    <label className="lg:text-lg ms:text-sm">
                      {email}
                    </label>
                  </div>
                </div>
                <button
                  onClick={editForm}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2 ms:px-4 ms:py-2"
                >
                  <FaUserEdit className="text-lg" />
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="userlisting flex flex-col w-full h-96 ms:items-center lg:items-stretch bg-slate-400">
          <div className="title text-center items-center lg:py-8 ms:py-5">
            <label className="lg:text-3xl ms:text-2xl font-bold">
              Listings
            </label>
          </div>
          <div className="pb-5">
            <section className="bg-transparent dark:bg-gray-900 flex items-center">
              <div className=" px-4 mx-auto lg:px-12 lg:w-full ms:w-screen">
                <div className="relative bg-white shadow-md dark:bg-gray-800 ms:rounded-2xl sm:rounded-lg">
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2">
                      <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            id="searchInput"
                            type="search"
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search"
                            required=""
                          />
                        </div>
                        <button className="bg-primary-700 p-2 rounded-full ml-2">
                          <FaSearch className="text-white" />
                        </button>
                      </form>
                    </div>
                    <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                      <button
                        type="button"
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 gap-2 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                      >
                        <MdOutlineDomainAdd className="text-lg" />
                        Add Listing
                      </button>
                      <div className="flex items-center w-full space-x-3 md:w-auto">
                        <button
                          onClick={actionDropdown}
                          onMouseEnter={() => setIsHoveredAction(true)}
                          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          type="button"
                        >
                          <svg
                            className="-ml-1 mr-1.5 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              clipRule="evenodd"
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                          </svg>
                          Actions
                        </button>
                        {isVisibleAction ||
                          (isHoveredAction && (
                            <div
                              onMouseLeave={() => setIsHoveredAction(false)}
                              className="z-10 absolute lg:top-16 lg:right-20 ms:right-36 ms:top-[155px]  bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="actionsDropdownButton"
                              >
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Buy
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Rent
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    PG
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Plot
                                  </a>
                                </li>
                              </ul>
                            </div>
                          ))}
                        <button
                          onClick={filterDropdown}
                          onMouseEnter={() => setIsHoveredFilter(true)}
                          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="w-4 h-4 mr-2 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Filter By
                          <svg
                            className="-mr-1 ml-1.5 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              clipRule="evenodd"
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                          </svg>
                        </button>
                        {isVisibleFilter ||
                          (isHoveredFilter && (
                            <div
                              onMouseLeave={() => setIsHoveredFilter(false)}
                              className="z-10 absolute lg:top-16 lg:right-0 ms:top-[155px] ms:right-0 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                            >
                              <ul
                                className="space-y-2 text-sm"
                                aria-labelledby="dropdownDefault"
                              >
                                <li className="flex items-center">
                                  <input
                                    id="apple"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  />
                                  <label
                                    htmlFor="apple"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                  >
                                    Apple (56)
                                  </label>
                                </li>
                                <li className="flex items-center">
                                  <input
                                    id="fitbit"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  />
                                  <label
                                    htmlFor="fitbit"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                  >
                                    Fitbit (56)
                                  </label>
                                </li>
                                <li className="flex items-center">
                                  <input
                                    id="dell"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  />
                                  <label
                                    htmlFor="dell"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                  >
                                    Dell (56)
                                  </label>
                                </li>
                                <li className="flex items-center">
                                  <input
                                    id="asus"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  />
                                  <label
                                    htmlFor="asus"
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                  >
                                    Asus (97)
                                  </label>
                                </li>
                              </ul>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div
            id="listContainer"
            className="lists flex flex-wrap lg:px-16 ms:px-0 justify-center gap-5 "
          >
            {/* <label>No Listing Found</label> */}
            {/* {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))} */}
              <ListingCard/>
              <ListingCard/>
              <ListingCard/>
              <ListingCard/>
          </div>
        </div>
      </div>
    </div>
  );
}
