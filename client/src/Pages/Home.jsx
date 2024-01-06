import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Listingitem from "../Components/Listingitem";

function Home() {
  SwiperCore.use([Navigation]);
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
      } catch (error) {}
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {}
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
      } catch (error) {}
    };

    fetchOfferListing();
    fetchSaleListing();
    fetchRentListing();
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto py-28 p-3 flex flex-col gap-6">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next
          <span className="text-slate-500"> perfect</span>
          <br />
          place with ease
        </h1>
        <div>
          <p className="text-gray-400  text-xs lg:text-sm">
            JK Properties will help you find your home fast, easy and
            comfortable.
            <br />
            Our expert support are always available.
          </p>
        </div>
        <Link
          to={"/search"}
          className="text-blue-800 font-bold hover:underline"
        >
          Let's Start now...{" "}
        </Link>
      </div>
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((offer) => (
            <SwiperSlide key={offer._id}>
              <div
                style={{
                  background: `url(${offer.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className=" w-screen h-[295px] md:h-[500px] "
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {offerListing.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListing && rentListing.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
              Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {rentListing.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
