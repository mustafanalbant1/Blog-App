import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "react-toastify";

const authenticator = async () => {
  try {
    console.log(
      "Sending request to:",
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Response from server:", data); // Yanıtı konsola yazdır
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    console.error("Error in authenticator:", error); // Hata durumunda konsola yazdır
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, type, setProgress, setData }) => {
  const ref = useRef(null);

  const onError = (err) => {
    console.log(err);
    toast.error("Image Upload faild");
  };
  const onSuccess = (res) => {
    console.log(res);
    setData(res);
  };
  const onUploadProgress = (progress) => {
    console.log(progress);
    setProgress(Math.round(progress.loaded / progress.total) * 100);
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="cursor-pointer" onClick={() => ref.current.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
