import { Area } from 'react-easy-crop';

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  scaling: number,
  pixelCrop: Area,
  rotation = 0
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const bBoxHeight = 400;
  const bBoxWidth = 400;

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;
  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  const scaleSizes = 1 / (image.height / 400) / scaling;
  ctx.scale(scaleSizes, scaleSizes);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.translate(-pixelCrop.x * scaleSizes * 0.01, -pixelCrop.y * scaleSizes * 0.01);
  ctx.drawImage(image, 0, 0);
  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      if (file) resolve(URL.createObjectURL(file));
    }, 'image/jpeg');
  });
}
