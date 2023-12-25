function CreateListing() {
  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">
        Create a Listing
      </h1>
      <form className="flex gap-4 sm:flex-row flex-col gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength={62}
            minLength={10}
            required
            className="border p-3 rounded-lg focus:outline-teal-600 "
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            required
            className="border p-3 rounded-lg focus:outline-teal-600 "
          />
          <input
            type="text"
            id="address"
            placeholder="address"
            required
            className="border p-3 rounded-lg focus:outline-teal-600 "
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg  focus:outline-teal-600 "
                value={1}
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg  focus:outline-teal-600 "
                value={1}
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                min={1000}
                max={100000000}
                required
                className="p-3 border border-gray-300 rounded-lg  focus:outline-teal-600 "
                value={1000}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(Rs/month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="offerPrice"
                min={1000}
                max={100000000}
                required
                className="p-3 border border-gray-300 rounded-lg  focus:outline-teal-600 "
                value={1000}
              />
              <div className="flex flex-col items-center">
                <p>Offer Price</p>
                <span className="text-xs">(Rs/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="font-semibold">
            {" "}
            Images:
            <span className="text-gray-600  font-normal">
              (The first image will be the cover (max 6))
            </span>
          </p>
          <div className="flex  gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="text-green-600 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 p-3 ">
              Upload
            </button>
          </div>
          <button className="text-white bg-slate-600 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
