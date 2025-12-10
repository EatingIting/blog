import { getFirestore } from "firebase/firestore";
import { app } from "./auth"; // firebase 초기화된 app 불러오기

export const db = getFirestore(app);
