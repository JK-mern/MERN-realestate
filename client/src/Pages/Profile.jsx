import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/user.slice";

function Profile() {
  const { currentUser,loading , error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSucess] = useState(false)
  const Dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        Dispatch(updateUserFailure(data.message));
        return;
      }
      Dispatch(updateUserSuccess(data));
      setUpdateSucess(true)
    } catch (error) {
      Dispatch(updateUserFailure(error.message));
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(storageRef).then((dowonloadURL) => {
          setFormData({ ...formData, avatar: dowonloadURL });
        });
      }
    );
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center  font-semibold text-3xl my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          className="rounded-full w-24 h-24 self-center object-cover cursor-pointer mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">Error in Uploading image</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-slate-700-700">{`Uploading${filePer}%`}</span>
          ) : filePer === 100 ? (
            <span className="text-green-700">Image uploaded Successfully</span>
          ) : (
            " "
          )}
        </p>
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className="rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="rounded-lg p-3"
          onChange={handleChange}
        />
        <button  disabled= {loading}className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
         {loading? "Loading......" : "Update"} 
        </button>
        <button className="p-3 bg-green-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
          create Listing
        </button>
      </form>
      <div className="mt-5 flex justify-between">
        <span className="text-red-700 cursor-pointer">Delete Account </span>
        <span className="text-red-700 cursor-pointer">Sign out </span>
      </div>
      <p className= 'text-red-800  mt-3 text-base font-medium'>{error ? error : ''}</p>
      <p className= 'text-green-700 mt-5'>{updateSuccess ? "Updated Successfully" : ''}</p>
    </div>
    
  );
}

export default Profile;
