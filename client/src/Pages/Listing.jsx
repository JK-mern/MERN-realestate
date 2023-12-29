import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import PacmanLoader from 'react-spinners/PacmanLoader'
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

function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [Listing, setListing] = useState(null);
  const [Loading, setLoading] = useState(false);
  const getListing = async (id) => {
    setLoading(true);
    const listingId = id
    try {
      const res = await fetch(`/api/listing/get/${listingId}`, {
        method: "GET",
      });
      const data = await res.json();
      setListing(data);
      setTimeout (()=>{
        setLoading(false);
      },1000)
      
     
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getListing(params.listingId);
  }, [params.listingId]);
  console.log(Listing)
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
      ) }
    </main>
  );
}

export default Listing;
