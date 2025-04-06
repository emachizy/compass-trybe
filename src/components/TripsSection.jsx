import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import itineraryImg1 from "../assets/images/itinerary-images/itineraryImg1.jpg";
import itineraryImg2 from "../assets/images/itinerary-images/itineraryImg2.jpg";
import itineraryImg3 from "../assets/images/itinerary-images/itineraryImg3.jpg";
import itineraryImg4 from "../assets/images/itinerary-images/itineraryImg4.jpg";

const trips = [
  {
    id: 1,
    name: "Snake Island, Lagos",
    image: itineraryImg1,
    gallery: [
      itineraryImg2,
      itineraryImg3,
      itineraryImg4,
      itineraryImg2,
      itineraryImg3,
      itineraryImg4,
    ],
    description:
      "Snake Island is a beautiful island in Lagos, known for its beaches, temples, and vibrant culture.",
  },
  {
    id: 2,
    name: "Taqua Bay, Lagos",
    image: itineraryImg1,
    gallery: [
      itineraryImg2,
      itineraryImg3,
      itineraryImg4,
      itineraryImg2,
      itineraryImg3,
      itineraryImg4,
    ],
    description:
      "Taqua Bay is famous for its stunning white-washed buildings, blue domes, and breathtaking sunsets.",
  },
  {
    id: 3,
    name: "Badagary, Lagos",
    image: itineraryImg1,
    gallery: [
      itineraryImg2,
      itineraryImg3,
      itineraryImg4,
      itineraryImg2,
      itineraryImg3,
      itineraryImg4,
    ],
    description:
      "Badagary is one of the most beautiful Lagos peninsulas, with lush landscapes and world-famous beaches.",
  },
  {
    id: 4,
    name: "Abeokuta, Ogun",
    image: itineraryImg2,
    gallery: [
      itineraryImg2,
      itineraryImg3,
      itineraryImg4,
      itineraryImg2,
      itineraryImg3,
      itineraryImg4,
    ],
    description:
      "Abeokuta is a historic city in Ogun, famous for its ancient temples, cherry blossoms, and masquerade culture.",
  },
];

const TripsSection = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getRelativeTime = (timestamp) => {
    const diff = (new Date() - new Date(timestamp)) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour(s) ago`;
    const days = Math.floor(diff / 86400);
    return days === 1 ? "Yesterday" : `${days} day(s) ago`;
  };

  useEffect(() => {
    if (selectedTrip && db) {
      const tripId = selectedTrip.id.toString();
      const commentsRef = collection(db, "trips", tripId, "comments");
      const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
        const fetchedComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          showReply: false,
          replyInput: "",
        }));
        setComments(fetchedComments);
      });
      return () => unsubscribe();
    }
  }, [selectedTrip, db]);

  const handleAddComment = async () => {
    if (!input.trim()) return;
    const tripId = selectedTrip.id.toString();
    const commentsRef = collection(db, "trips", tripId, "comments");

    if (editingIndex !== null) {
      const commentToEdit = comments[editingIndex];
      const commentRef = doc(db, "trips", tripId, "comments", commentToEdit.id);
      await updateDoc(commentRef, {
        text: input.trim(),
        timestamp: new Date().toISOString(),
      });
      setEditingIndex(null);
    } else {
      const newComment = {
        text: input.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        reaction: null,
        replies: [],
      };
      await addDoc(commentsRef, newComment);
    }
    setInput("");
  };

  const handleEdit = (index) => {
    setInput(comments[index].text);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    const commentToDelete = comments[index];
    const tripId = selectedTrip.id.toString();
    const commentRef = doc(db, "trips", tripId, "comments", commentToDelete.id);
    await deleteDoc(commentRef);
  };

  const handleBack = () => {
    setSelectedTrip(null);
    setComments([]);
    setInput("");
    setEditingIndex(null);
  };

  const toggleLike = async (index) => {
    const comment = comments[index];
    const tripId = selectedTrip.id.toString();
    const commentRef = doc(db, "trips", tripId, "comments", comment.id);
    await updateDoc(commentRef, {
      likes: increment(1),
    });
  };

  const toggleReaction = async (index, emoji) => {
    const comment = comments[index];
    const tripId = selectedTrip.id.toString();
    const commentRef = doc(db, "trips", tripId, "comments", comment.id);
    const newReaction = comment.reaction === emoji ? null : emoji;
    await updateDoc(commentRef, {
      reaction: newReaction,
    });
  };

  const toggleReply = (index) => {
    setComments((prevComments) =>
      prevComments.map((comment, i) =>
        i === index ? { ...comment, showReply: !comment.showReply } : comment
      )
    );
  };

  const updateReplyInput = (index, value) => {
    setComments((prevComments) =>
      prevComments.map((comment, i) =>
        i === index ? { ...comment, replyInput: value } : comment
      )
    );
  };

  const addReply = async (index) => {
    const comment = comments[index];
    if (!comment.replyInput?.trim()) return;
    const tripId = selectedTrip.id.toString();
    const commentRef = doc(db, "trips", tripId, "comments", comment.id);
    await updateDoc(commentRef, {
      replies: arrayUnion(comment.replyInput.trim()),
    });
    setComments((prevComments) =>
      prevComments.map((c, i) => (i === index ? { ...c, replyInput: "" } : c))
    );
  };

  if (selectedTrip) {
    return (
      <section className="max-w-4xl mx-auto py-10 px-4">
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4"
        >
          <span className="bg-[#fff] rounded-xl p-1">🔙</span> Back to Trips
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedTrip.name}
        </h1>
        <p className="text-gray-600 mt-2">{selectedTrip.description}</p>
        <img
          src={selectedTrip.image}
          alt={selectedTrip.name}
          className="w-full h-64 object-cover rounded-lg mt-6"
        />
        <div className="mt-6 grid grid-cols-3 gap-4">
          {selectedTrip.gallery.map((img, i) => (
            <div
              key={i}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => {
                setSelectedImage(img);
                setCurrentImageIndex(i);
              }}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <button
              className="absolute top-6 right-6 text-white text-3xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            {currentImageIndex > 0 && (
              <button
                className="absolute left-6 text-white text-4xl"
                onClick={() => {
                  const newIndex = currentImageIndex - 1;
                  setCurrentImageIndex(newIndex);
                  setSelectedImage(selectedTrip.gallery[newIndex]);
                }}
              >
                ❮
              </button>
            )}
            <div className="text-center">
              <img
                src={selectedImage}
                alt="Full View"
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
              />
              <p className="text-white mt-4 text-lg">
                Image {currentImageIndex + 1} of {selectedTrip.gallery.length}
              </p>
            </div>
            {currentImageIndex < selectedTrip.gallery.length - 1 && (
              <button
                className="absolute right-6 text-white text-4xl"
                onClick={() => {
                  const newIndex = currentImageIndex + 1;
                  setCurrentImageIndex(newIndex);
                  setSelectedImage(selectedTrip.gallery[newIndex]);
                }}
              >
                ❯
              </button>
            )}
          </div>
        )}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Comments
          </h3>
          <div className="flex gap-3 mb-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAddComment}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingIndex !== null ? "Update" : "Post"}
            </button>
          </div>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((commentObj) => (
                <li key={commentObj.id} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{commentObj.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {getRelativeTime(commentObj.timestamp)}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        {["😍", "👍", "😂", "🤯", "👎"].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() =>
                              toggleReaction(
                                comments.indexOf(commentObj),
                                emoji
                              )
                            }
                            className={`text-xl ${
                              commentObj.reaction === emoji ? "scale-110" : ""
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <button
                          onClick={() =>
                            toggleLike(comments.indexOf(commentObj))
                          }
                        >
                          ❤️ {commentObj.likes || 0}
                        </button>
                        <button
                          onClick={() =>
                            toggleReply(comments.indexOf(commentObj))
                          }
                        >
                          💬 Reply
                        </button>
                      </div>
                      {commentObj.showReply && (
                        <div className="mt-2">
                          <input
                            value={commentObj.replyInput || ""}
                            onChange={(e) =>
                              updateReplyInput(
                                comments.indexOf(commentObj),
                                e.target.value
                              )
                            }
                            placeholder="Write a reply..."
                            className="border rounded p-1 text-sm"
                          />
                          <button
                            className="ml-2 text-green-600 text-sm"
                            onClick={() =>
                              addReply(comments.indexOf(commentObj))
                            }
                          >
                            Send
                          </button>
                        </div>
                      )}
                      {commentObj.replies?.length > 0 && (
                        <ul className="mt-3 space-y-2 text-sm pl-4 border-l border-gray-300">
                          {commentObj.replies.map((reply, rIdx) => (
                            <li key={rIdx} className="text-gray-700">
                              {reply}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex gap-2 text-sm ml-4">
                      <button
                        onClick={() => handleEdit(comments.indexOf(commentObj))}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(comments.indexOf(commentObj))
                        }
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <p className="text-[#9d9577] text-sm capitalize text-center">Join Us</p>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Featured Trips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="relative block rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            >
              <div
                className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${trip.image})` }}
              ></div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500"></div>
              <div className="absolute top-4 right-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow-md transition-all duration-500 group-hover:bg-[#9d9577] group-hover:text-white">
                {trip.tours} Tours
              </div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-bold transition-transform duration-500 group-hover:translate-y-2">
                  {trip.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripsSection;
