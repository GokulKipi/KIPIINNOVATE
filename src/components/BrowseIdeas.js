import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IdeaCard from "./IdeaCard";

const BrowseIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/fetch_ideas");
        if (!response.ok) {
          throw new Error("Failed to fetch ideas");
        }
        const data = await response.json();
        setIdeas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  const updateLikesInDB = async (idea_id, likes) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/update_likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea_id, likes }),
      });
      if (!response.ok) {
        throw new Error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const likeIdea = async (idea_id) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.idea_id === idea_id ? { ...idea, likes: idea.likes + 1, liked: true } : idea
      )
    );
    const updatedIdea = ideas.find((idea) => idea.idea_id === idea_id);
    await updateLikesInDB(idea_id, updatedIdea.likes + 1);
  };

  const unlikeIdea = async (idea_id) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.idea_id === idea_id ? { ...idea, likes: idea.likes - 1, liked: false } : idea
      )
    );
    const updatedIdea = ideas.find((idea) => idea.idea_id === idea_id);
    await updateLikesInDB(idea_id, updatedIdea.likes - 1);
  };

  const viewIdea = (idea_id) => {
    navigate(`/browse-ideas/${idea_id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Browse Ideas
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading ideas...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : ideas.length === 0 ? (
          <p className="text-center text-gray-600">No ideas available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div key={idea.idea_id} className="flex flex-col h-full">
                <IdeaCard
                  ideaTitle={idea.ideaTitle}
                  ideaDescription={idea.ideaDescription}
                  onClick={() => viewIdea(idea.idea_id)}
                  likes={idea.likes}
                  onLike={() => likeIdea(idea.idea_id)}
                  onUnlike={() => unlikeIdea(idea.idea_id)}
                  beans={idea.beans}
                  status={idea.status}
                  name={idea.name}
                  liked={idea.liked}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseIdeas;