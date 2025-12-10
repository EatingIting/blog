import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./auth";

const storage = getStorage(app);

// 이미지 업로드 함수
export const uploadImage = async (file) => {
  const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
