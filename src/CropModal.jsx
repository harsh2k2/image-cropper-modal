import ImageCrop from "./components/ImageCrop";
import ImageCropProvider from "./providers/ImageCropProvider";

const CropModal = () => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <ImageCropProvider>
        <ImageCrop />
      </ImageCropProvider>
    </div>
  );
};

export default CropModal;
