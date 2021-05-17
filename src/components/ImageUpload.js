import { Button } from "@material-ui/core";
import { useState } from "react";
import "./ImageUpload.css";
import { storage, db } from "../firebase";
import firebase from "firebase";

const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 - 1
        );
        setProgress(progress);
      },
      (error) => {
        //error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL() //get the image download url
          .then((url) => {
            //post image inside the db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input
      className="firstInput"
        type="text"
        placeholder="Enter a caption ..."
        onChange={(e) => setCaption(e.target.value)}
      />
      <input className="fileInput" type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
