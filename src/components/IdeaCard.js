import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaHeart, FaCrown } from "react-icons/fa";

const IdeaCard = ({ ideaTitle, ideaDescription, onClick, likes, onLike, onUnlike, beans, status, name, liked }) => {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLike = (e) => {
    e.stopPropagation(); // Prevents the card click event
    if (isLiked) {
      onUnlike();
    } else {
      onLike();
    }
    setIsLiked(!isLiked);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "text-[#FFAE1F] bg-[#FFAE1F]/20";
      case "Accepted":
        return "text-[#00CD5E] bg-[#00CD5E]/20";
      case "Idea Tried":
        return "text-[#D60000] bg-[#D60000]/20";
      case "Submitted":
        return "text-[#1E90FF] bg-[#1E90FF]/20"; // Example color for Submitted
      default:
        return "text-gray-600 bg-gray-200";
    }
  };

  return (
    <button onClick={onClick} className="bg-white rounded-lg shadow-lg p-6 w-full text-left hover:bg-gray-100 transition duration-200 relative flex flex-col h-full">
      <div className="flex justify-between items-start mb-2 flex-wrap">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800">{ideaTitle}</h3>
          <p className="text-sm font-medium text-gray-600">by {name}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaCrown className="text-yellow-500" /> {/* Golden crown icon */}
          <span className="text-yellow-500 font-semibold">Beans: {beans}</span>
        </div>
      </div>
      <hr className="border-t border-gray-200 my-2" />
      <p className="text-gray-600 mb-2">{ideaDescription}</p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Status:</strong> 
        <span className={`ml-2 px-2 py-1 rounded ${getStatusStyles(status)}`}>{status}</span>
      </p>

      {/* Like Button */}
      <div className="flex items-center justify-between mt-auto">
        <button
          className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-600 transition duration-200`}
          onClick={handleLike}
        >
          <FaHeart /> {likes}
        </button>
      </div>
    </button>
  );
};

IdeaCard.propTypes = {
  ideaTitle: PropTypes.string.isRequired,
  ideaDescription: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  likes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
  beans: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
};

export default IdeaCard;