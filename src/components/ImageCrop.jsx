import { useState } from "react";
import user1 from "@/assets/user_1.png";
import Modal from "@/components/base/Modal";
import { readFile } from "@/helpers/cropImage";
import ImageCropModalContent from "./ImageCropModalContent";
import { useImageCropContext } from "@/providers/ImageCropProvider";
import toast, { Toaster } from "react-hot-toast";

const ImageCrop = () => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(user1);

  const { getProcessedImage, setImage, resetStates } = useImageCropContext();

  const handleDone = async () => {
    const avatar = await getProcessedImage();
    setPreview(window.URL.createObjectURL(avatar));
    resetStates();
    setOpenModal(false);
  };

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];

    if (file && file.size > 1024 * 1024) {
      // alert("Please select an image of size less than 1MB");

      toast.error("Please select an image of size less than 1MB");
      return;
    }

    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
    setOpenModal(true);
  };

  return (
    <>
      <Toaster />
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
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

        <Modal open={openModal} handleClose={() => setOpenModal(false)}>
          <ImageCropModalContent
            handleDone={handleDone}
            handleClose={() => setOpenModal(false)}
          />
        </Modal>
      </div>
    </>
  );
};

export default ImageCrop;
