import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import PacmanLoader from "react-spinners/PacmanLoader";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../Components/Contact";

function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [Listing, setListing] = useState(null);
  const [copied, setCopied] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [contact, setContact] = useState(false);
  const getListing = async (id) => {
    setLoading(true);
    const listingId = id;
    try {
      const res = await fetch(`/api/listing/get/${listingId}`, {
        method: "GET",
      });
      const data = await res.json();
      setListing(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getListing(params.listingId);
  }, [params.listingId]);
  return (
    <main>
      {Loading ? (
        <div className="flex items-center justify-center h-screen  ">
          <div>
            <PacmanLoader
              className="flex items-center"
              color="#36d7b7"
              loading={Loading}
              margin={4}
              size={50}
              speedMultiplier={2}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      {Listing && !Loading && (
        <div>
          <Swiper navigation>
            {Listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="w-screen  h-[300px] md:h-[500px]  "
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
        <FaShare
          className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        />
      </div>
      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
          Link copied!
        </p>
      )}
      {Listing && (
        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
          <p className="text-2xl font-semibold">
            {Listing.name} -{" "}
            {Listing.offer ? Listing.discountPrice : Listing.regularPrice} Rs
            {Listing.type === "rent" && " / month"}
          </p>
          <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
            <FaMapMarkerAlt className="text-green-700" />
            {Listing.address}
          </p>
          <div className="flex gap-4">
            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              {Listing.type === "rent" ? "For Rent" : "For Sale"}
            </p>
            {Listing.offer && (
              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                Rs.{+Listing.regularPrice - +Listing.discountPrice} OFF
              </p>
            )}
          </div>
          <p className="text-slate-800">
            <span className="font-semibold text-black">Description - </span>
            {Listing.description}
          </p>
          <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaBed className="text-lg" />
              {Listing.bedrooms > 1
                ? `${Listing.bedrooms} beds `
                : `${Listing.bedrooms} bed `}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaBath className="text-lg" />
              {Listing.bathrooms > 1
                ? `${Listing.bathrooms} baths `
                : `${Listing.bathrooms} bath `}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaParking className="text-lg" />
              {Listing.parking ? "Parking spot" : "No Parking"}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
              <FaChair className="text-lg" />
              {Listing.furnished ? "Furnished" : "Unfurnished"}
            </li>
          </ul>
          {currentUser && Listing.userRef !== currentUser._id && !contact ? (
            <button onClick={ () => setContact(true)} className="p-3 w-full rounded-lg border bg-slate-700 text-white uppercase my-5  hover:opacity-90 ">
              Contact Landloard
            </button>
          ) : (
            contact ? (
              <Contact Listing = {Listing} />
            ): ''
          )}
        </div>
      )}
    </main>
  );
}

export default Listing;
