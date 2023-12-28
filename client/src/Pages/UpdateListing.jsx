import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { useEffect, useState } from "react";
  import { app } from "../firebase";
  import { useSelector } from "react-redux";
  import { useNavigate,useParams } from "react-router-dom";
  
  function CreateListing() {
    const navigate = useNavigate()
    const params = useParams()
    const { currentUser } = useSelector((state) => state.user);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
      imageUrls: [],
      name: "",
      description: "",
      address: "",
      regularPrice: 0,
      type: "rent",
      bedrooms: 1,
      bathrooms: 1,
      discountPrice: 0,
      offer: false,
      parking: false,
      furnished: false,
    });
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleImageSubmit = (e) => {
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false);
        const promises = [];
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false);
            setUploading(false);
          })
          .catch((err) => {
            setImageUploadError("Image upload Failed  (2 mb max per image)");
            setUploading(false);
          });
      } else {
        setImageUploadError("You can only upload 6 images per listing");
        setUploading(false);
      }
    };
  
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName); // storageRef now points to fileName
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(storageRef).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
  
    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    };
  
    const handleChange = (e) => {
      if (e.target.id === "sale" || e.target.id === "rent") {
        setFormData({
          ...formData,
          type: e.target.id,
        });
      } else if (
        e.target.id === "parking" ||
        e.target.id === "furnished" ||
        e.target.id === "offer"
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked,
        });
      } else {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
   
        if (formData.imageUrls.length < 1) {
          return setError("There should be atleast one image");
        }
        if (+formData.regularPrice < formData.discountPrice) {
          return setError("Offer price should be less than regular Price");
        }
        setError(false);
        setLoading(true);
        const listingId = params.listingId
        const res = await fetch(`/api/listing/update/${listingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, userRef: currentUser._id }),
        });
        const data = await res.json()
        if(data.success === false)
        {
          setError(data.message)
        }
        setLoading(false)
        navigate(`/listing/${data._id}`)
        console.log(data)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    };

    const getListing = async() =>{
        const listingId = params.listingId
        const res = await fetch(`/api/listing/get/${listingId}`,{
            method : "GET"
        })
        const data = await res.json()
        setFormData(data)
    }
    useEffect( ()=>{
        getListing()
    }, [])
  
    return (
      <main className="max-w-4xl p-3 mx-auto">
        <h1 className=" text-3xl text-center font-semibold my-7">
          Update Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 sm:flex-row flex-col "
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              id="name"
              placeholder="Name"
              maxLength={62}
              minLength={10}
              required
              className="border p-3 rounded-lg focus:outline-teal-600 "
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              id="description"
              placeholder="Description"
              required
              className="border p-3 rounded-lg focus:outline-teal-600 "
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              id="address"
              placeholder="address"
              required
              className="border p-3 rounded-lg focus:outline-teal-600 "
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  onChange={handleChange}
                  className="w-5"
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
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
                  onChange={handleChange}
                  value={formData.bedrooms}
                  className="p-3 border border-gray-300 rounded-lg  focus:outline-teal-600 "
                />
                <span>Beds</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="bathrooms"
                  min={1}
                  max={10}
                  required
                  onChange={handleChange}
                  value={formData.bathrooms}
                  className="p-3 border border-gray-300 rounded-lg  focus:outline-teal-600 "
                />
                <span>Bathrooms</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="regularPrice"
                  min={10}
                  max={100000000}
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                  className="p-3 border border-gray-300 rounded-lg  focus:outline-teal-600 "
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  {formData.type === "rent" ? (
                    <span className="text-xs">(Rs/month)</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {formData.offer ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    id="discountPrice"
                    min={0}
                    max={100000000}
                    required
                    onChange={handleChange}
                    value={formData.discountPrice}
                    className="p-3 border border-gray-300 rounded-lg  focus:outline-teal-600 "
                  />
                  <div className="flex flex-col items-center">
                    <p>Offer Price</p>
                    {formData.type === "rent" ? (
                      <span className="text-xs">(Rs/month)</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
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
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type="button"
                onClick={handleImageSubmit}
                className="text-green-600 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 p-3 "
                disabled={uploading}
              >
                {uploading ? "Uploading...." : "Upload"}
              </button>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0
              ? formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between p-3 border items-center"
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                    >
                      {" "}
                      delete
                    </button>
                  </div>
                ))
              : ""}
            <button  disabled={loading || uploading}className="text-white bg-slate-600 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              {loading ? "Updating...." : "Update Listing"}
            </button>
            <p className="text-red-700 text-sm">
              {error && error}
            </p>
          </div>
        </form>
      </main>
    );
  }
  
  export default CreateListing;
  