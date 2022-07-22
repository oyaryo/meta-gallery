import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default async function ({ redirect }) {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user.email);

  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "tickets"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data().email);
    if (doc.data().email === user.email) {
      console.log("Checked out.");
      return;
    } else {
      // redirect("ShopPage");
    }
  });
}
