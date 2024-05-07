import { useState } from "react";
import user1 from "../assets/user_1.png";
import { readFile } from "../helpers/cropImage";
import ImageCropModalContent from "./ImageCropModalContent";
import { useImageCropContext } from "../providers/ImageCropProvider";
import toast, { Toaster } from "react-hot-toast";
import classNames from "classnames"; // Import classNames for conditional class application

const ImageCrop = () => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(user1);

  const { getProcessedImage, setImage, resetStates } = useImageCropContext();

  const handleDone = async () => {
    const avatarUrl = await getProcessedImage();
    if (avatarUrl) {
      setPreview(avatarUrl);
      resetStates();
      setOpenModal(false);
    } else {
      toast.error("Failed to process the image");
    }
  };

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];

    if (file && file.size > 4096 * 1024) {
      toast.error("Please select an image of size less than 4 MegaByte");
      return;
    }

    const imageDataUrl = await readFile(file);
    const image = new Image();
    image.onload = () => {
      if (image.width < 100 || image.height < 100) {
        toast.error("The image dimensions must be at least 100px × 100px");
        return;
      }

      setImage(imageDataUrl);
      setOpenModal(true);
    };
    image.onerror = () => {
      toast.error("Failed to load the image");
    };
    image.src = imageDataUrl;
  };

  return (
    <>
      <Toaster />
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <input
          type="file"
          onChange={handleFileChange}
          id="avatarInput"
          accept="image/*"
        />
        <label htmlFor="avatarInput" className="cursor-pointer">
          <img
            src={preview}
            height={192}
            width={192}
            className="object-cover rounded-full h-48 w-48"
            alt=""
          />
        </label>

        {/* Integrated Modal */}
        <div
          className={classNames(
            "fixed z-10 overflow-y-auto top-0 w-full left-0",
            {
              hidden: !openModal,
            }
          )}
          id="modal"
        >
          <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                ​
              </span>
              <div
                className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <ImageCropModalContent
                    handleDone={handleDone}
                    handleClose={() => setOpenModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCrop;
