import { useState, useEffect } from "react";
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
    const diff = (new Date() - new Date(timestamp)) / 1000; // in seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour(s) ago`;

    const days = Math.floor(diff / 86400);
    return days === 1 ? "Yesterday" : `${days} day(s) ago`;
  };

  // Load comments from localStorage per trip
  useEffect(() => {
    if (selectedTrip) {
      const saved = localStorage.getItem(`comments-${selectedTrip.id}`);
      setComments(saved ? JSON.parse(saved) : []);
    }
  }, [selectedTrip]);

  // Save comments to localStorage when comments change
  useEffect(() => {
    if (selectedTrip) {
      localStorage.setItem(
        `comments-${selectedTrip.id}`,
        JSON.stringify(comments)
      );
    }
  }, [comments, selectedTrip]);

  const handleAddComment = () => {
    if (!input.trim()) return;

    const newComment = {
      text: input.trim(),
      timestamp: new Date().toISOString(), // store time
      likes: 0,
      reaction: null,
      replies: [],
    };

    if (editingIndex !== null) {
      const updated = [...comments];
      updated[editingIndex].text = input.trim();
      updated[editingIndex].timestamp = newComment.timestamp; // update timestamp on edit
      setComments(updated);
      setEditingIndex(null);
    } else {
      setComments([...comments, newComment]);
    }

    setInput("");
  };

  const handleEdit = (index) => {
    setInput(comments[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = comments.filter((_, i) => i !== index);
    setComments(updated);
  };

  const handleBack = () => {
    setSelectedTrip(null);
    setComments([]);
    setInput("");
    setEditingIndex(null);
  };

  const toggleLike = (index) => {
    const updated = [...comments];
    updated[index].likes = (updated[index].likes || 0) + 1;
    setComments(updated);
  };

  const toggleReaction = (index, emoji) => {
    const updated = [...comments];
    updated[index].reaction = updated[index].reaction === emoji ? null : emoji;
    setComments(updated);
  };

  const toggleReply = (index) => {
    const updated = [...comments];
    updated[index].showReply = !updated[index].showReply;
    setComments(updated);
  };

  const updateReplyInput = (index, value) => {
    const updated = [...comments];
    updated[index].replyInput = value;
    setComments(updated);
  };

  const addReply = (index) => {
    const updated = [...comments];
    if (!updated[index].replyInput?.trim()) return;

    updated[index].replies = [
      ...(updated[index].replies || []),
      updated[index].replyInput,
    ];
    updated[index].replyInput = "";
    setComments(updated);
  };

  if (selectedTrip) {
    return (
      <section className="max-w-4xl mx-auto py-10 px-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4"
        >
          🔙 Back to Trips
        </button>

        {/* Trip Details */}
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedTrip.name}
        </h1>
        <p className="text-gray-600 mt-2">{selectedTrip.description}</p>
        <img
          src={selectedTrip.image}
          alt={selectedTrip.name}
          className="w-full h-64 object-cover rounded-lg mt-6"
        />

        {/* Gallery */}
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

        {/* Image Modal */}

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white text-3xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>

            {/* Left Arrow */}
            {currentImageIndex > 0 && (
              <button
                className="absolute left-6 text-white text-4xl"
                onClick={() => {
                  const newIndex = currentImageIndex - 1;
                  setCurrentImageIndex(newIndex);
                  setSelectedImage(selectedTrip.gallery[newIndex]);
                }}
              >
                &#10094;
              </button>
            )}

            {/* Image */}
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

            {/* Right Arrow */}
            {currentImageIndex < selectedTrip.gallery.length - 1 && (
              <button
                className="absolute right-6 text-white text-4xl"
                onClick={() => {
                  const newIndex = currentImageIndex + 1;
                  setCurrentImageIndex(newIndex);
                  setSelectedImage(selectedTrip.gallery[newIndex]);
                }}
              >
                &#10095;
              </button>
            )}
          </div>
        )}

        {/* Comment Section */}
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
              {comments.map((commentObj, i) => (
                <li key={i} className="bg-white p-4 rounded shadow">
                  {/* Main Comment & Controls */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{commentObj.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {getRelativeTime(commentObj.timestamp)}
                      </p>

                      {/* Reactions */}
                      <div className="flex space-x-2 mt-2">
                        {["😍", "👍", "😂", "🤯", "👎"].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => toggleReaction(i, emoji)}
                            className={`text-xl ${
                              commentObj.reaction === emoji ? "scale-110" : ""
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>

                      {/* Likes & Replies */}
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <button onClick={() => toggleLike(i)}>
                          ❤️ {commentObj.likes || 0}
                        </button>
                        <button onClick={() => toggleReply(i)}>💬 Reply</button>
                      </div>

                      {/* Reply Input */}
                      {commentObj.showReply && (
                        <div className="mt-2">
                          <input
                            value={commentObj.replyInput || ""}
                            onChange={(e) =>
                              updateReplyInput(i, e.target.value)
                            }
                            placeholder="Write a reply..."
                            className="border rounded p-1 text-sm"
                          />
                          <button
                            className="ml-2 text-green-600 text-sm"
                            onClick={() => addReply(i)}
                          >
                            Send
                          </button>
                        </div>
                      )}

                      {/* Replies List */}
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

                    {/* Edit / Delete Buttons */}
                    <div className="flex gap-2 text-sm ml-4">
                      <button
                        onClick={() => handleEdit(i)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
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

  // Trip List View
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
