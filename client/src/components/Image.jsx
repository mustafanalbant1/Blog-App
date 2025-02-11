import { IKImage } from "imagekitio-react";

const Image = ({ src, alt, className, width, height }) => {
  if (!src) {
    return null;
  }
  return (
    <div>
      <IKImage
        // path="logo2.png"
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
        publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
        path={src || null}
        lqip={{ active: true, quality: 20 }}
        className={className}
        alt={alt}
        width={width}
        height={height}
        transformation={[
          {
            width: width,
            height: height,
          },
        ]}
      />
    </div>
  );
};

export default Image;
