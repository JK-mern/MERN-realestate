import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Contact({ Listing }) {
  const [landLoard, setLandLoard] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await fetch(`/api/user/${Listing.userRef}`, {
          method: "GET",
        });
        const data = await res.json();
        setLandLoard(data);
      } catch (error) {
        console.log(error);
      }
    };

    getListing();
  }, []);
  return (
    <>
      {landLoard && (
        <div className="flex flex-col gap-2">
          <p>
            Conatact <span className="font-semibold">{landLoard.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{Listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            placeholder="Type your message here"
            value={message}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-teal-400"
          ></textarea>
          <Link
            to={`mailto:${landLoard.email}?subject=Regarding ${
              Listing.name
            }&body= ${message}`}
            className="w-full text-center rounded-lg text-white uppercase bg-slate-600 p-3 hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
