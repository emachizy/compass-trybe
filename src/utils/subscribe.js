// utils/subscribe.js
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const subscribeToNewsletter = async (email) => {
  if (!email) {
    throw new Error("Please enter your email");
  }

  try {
    await addDoc(collection(db, "subscribers"), {
      email,
      subscribedAt: Timestamp.now(),
    });
    return "Subscribed successfully!";
  } catch (error) {
    console.error("Error adding subscriber: ", error);
    throw new Error("Something went wrong");
  }
};
