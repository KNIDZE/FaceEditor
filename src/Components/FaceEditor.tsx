import React, { useState } from 'react';
import './faceeditor.scss';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';
import { Area } from 'react-easy-crop';
import FaceImage from './FaceImage/FaceImage';
import getCroppedImg from './FaceImage/cropFunctions';

export default function FaceEditor(props: { imgUrl: string }): React.ReactElement {
  const { imgUrl } = props;
  const [scale, changeScale] = useState(1);
  const [angle, changeAngle] = useState(0);
  const [imageArea, setImageArea] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
  async function getImage(): Promise<void> {
    const image = await getCroppedImg(imgUrl, 1 / scale, imageArea, angle);
    if (image) {
      const im = document.createElement('img');
      im.src = image;
      im.style.position = 'absolute';
      im.style.top = '600px';
      im.style.left = '100px';
      document.body.append(im);
    }
  }
  return (
    <div className="face_editor">
      <FaceImage imageSource={imgUrl} scale={scale} rotationAngle={angle} setArea={setImageArea} />
      <div className="edit_options">
        <h1>Create a new character</h1>
        <p>Use the handles to adjust the face size and rotation. Make sure the ears are outside of the silhouette.</p>
        <div className="range_label">
          <FiMinus size={30} />
          <h2>Scale</h2>
          <FiPlus size={30} />
        </div>
        <input
          type="range"
          className="range_input"
          onChange={(e): void => changeScale(+e.currentTarget.value)}
          min={1}
          max={3}
          step={0.2}
          defaultValue={1}
        />
        <div className="range_label">
          <BsArrowClockwise size={30} />
          <h2>Rotate</h2>
          <BsArrowCounterclockwise size={30} />
        </div>
        <input
          type="range"
          className="range_input"
          onChange={(e): void => changeAngle(+e.currentTarget.value)}
          min={-180}
          max={180}
          defaultValue={0}
        />
        <button className="confirm_button" onClick={getImage}>
          Push it
        </button>
      </div>
    </div>
  );
}
