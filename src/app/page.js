"use client";
import React, { useState, useRef, useEffect } from "react";
import Profile from "@/components/Profile";
import Repos from "@/components/Repos";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = inputRef.current.value;
    if (searchValue !== "") {
      setSearchText(searchValue);
    }
  };

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="flex gap-4 mb-12">
        <input
          ref={inputRef}
          className="p-4 rounded text-black"
          type="text"
          placeholder="Search"
        />
        <button onClick={handleSearch} className="p-4 bg-green-600 rounded">
          Send
        </button>
      </form>
      {searchText !== "" ? (
        <>
          <Profile username={searchText} />
          <Repos username={searchText} />
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
