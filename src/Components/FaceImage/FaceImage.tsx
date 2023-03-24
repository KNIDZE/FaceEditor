import React, { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

interface ImageProps {
  imageSource: string;
  scale: number;
  rotationAngle: number;
  setArea: React.Dispatch<React.SetStateAction<Area>>;
}

export default function FaceImage(props: ImageProps): React.ReactElement {
  const { imageSource, scale, rotationAngle, setArea } = props;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setArea(croppedAreaPixels);
  }, []);
  if (imageSource == null) return <div />;
  return (
    <div className="photo">
      <Cropper
        image={imageSource}
        crop={crop}
        zoom={scale}
        rotation={rotationAngle}
        cropSize={{ width: 400, height: 400 }}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
      />
      <img
        src="https://github.com/KNIDZE/FaceEditor/blob/main/src/Components/FaceImage/7188242.png?raw=true"
        alt="faceMask.png"
        className="face_mask"
      />
    </div>
  );
}
