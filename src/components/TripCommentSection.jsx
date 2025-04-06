import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase"; // Make sure the path is correct

const TripCommentSection = ({ tripId }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!tripId) return;

    const q = query(
      collection(db, "comments", tripId, "comments"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [tripId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    await addDoc(collection(db, "comments", tripId, "comments"), {
      name,
      text,
      timestamp: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-10 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-[#9d9577]">Comments</h2>

      <ul className="space-y-4 mb-6 max-h-60 overflow-y-auto">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b pb-2">
            <p className="font-medium text-[#444]">{comment.name}</p>
            <p className="text-sm text-gray-600">{comment.text}</p>
          </li>
        ))}
        {comments.length === 0 && (
          <li className="text-gray-400 italic">
            No comments yet. Be the first!
          </li>
        )}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full border border-gray-300 rounded-xl p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="bg-[#9d9577] text-white px-4 py-2 rounded-xl hover:bg-[#8b846a] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TripCommentSection;
