import { readFile } from "../helpers/cropImage";
import { useImageCropContext } from "../providers/ImageCropProvider";
import Cropper from "../components/cropper/Cropper";
import { RotationSlider, ZoomSlider } from "../components/cropper/Sliders";

const ImageCropModalContent = ({ handleDone, handleClose }) => {
  const { setImage } = useImageCropContext();

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];
    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
  };

  return (
    <div className="text-center relative">
      <h5 className="text-gray-800 mb-4">Edit profile picture</h5>
      <div className="border border-dashed border-gray-200 p-6 rounded-lg">
        <div className="flex justify-center">
          <div className="crop-container mb-4">
            <Cropper />
          </div>
        </div>
        <ZoomSlider className="mb-4" />
        <RotationSlider className="mb-4" />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="avatarInput"
          accept="image/*"
        />

        <button
          type="button"
          className="shadow w-full mb-4 hover:shadow-lg bg-white text-gray-900 hover:bg-white hover:text-blue-500 px-4 py-2 text-sm rounded-3xl"
        >
          <label htmlFor="avatarInput">Upload Another Picture</label>
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-red-500 text-white hover:bg-red-700 hover:text-white px-4 py-2 text-sm rounded-3xl"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full bg-blue-500 text-white hover:bg-blue-700 hover:text-white px-4 py-2 text-sm rounded-3xl"
            onClick={handleDone}
          >
            Done & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModalContent;
