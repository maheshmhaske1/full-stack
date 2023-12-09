// cloudName: "dpq8jfqt7",
// uploadPreset: "grbqgcwt"

import React, { useEffect, useState } from "react";
import { Image, CloudinaryContext } from "cloudinary-react";

const CloudinaryWidget = () => {
  const [uploadedImages, setUploadedImages] = useState([]);


  const handleUpload = (result) => {
    console.log("Uploaded Images:", result);

    if (
      result &&
      result.event === "success" &&
      result.info &&
      result.info.files
    ) {
      const uploadedImage = result.info.files[0];
      setUploadedImages((prevImages) => [...prevImages, uploadedImage]);
    }
  };

  return (
    <div>
  <CloudinaryContext cloudName="dpq8jfqt7">
  <button
    id="upload_widget"
    onClick={() =>
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dpq8jfqt7",
          uploadPreset: "grbqgcwt",
          multiple: true,
          cropping: "server",
          folder: "product_assets",
          resourceType: "auto",
          clientAllowedFormats: ["png", "jpeg", "jpg"],
          maxFiles: 5,
          showAdvancedOptions: false,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            handleUpload(result);
          }
        }
      )
    }
  >
    Open Cloudinary Widget
  </button>
</CloudinaryContext>


      {uploadedImages.map((image, index) => (
        <div key={index}>
          <Image publicId={image.public_id} width="150" crop="scale" />
          <p>Public ID: {image.public_id}</p>
        </div>
      ))}
    </div>
  );
};

export default CloudinaryWidget;

