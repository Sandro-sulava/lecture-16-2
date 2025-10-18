import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeedBackList = () => {
  const [feedbacks, setFeedbaks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://68f26ef5b36f9750deeca098.mockapi.io/feedback")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error : ${res.status}`);
        }

        return res.json;
      })
      .then((data) => {
        setFeedbaks[data];
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading feedbacks . . . . . . .
      </div>
    );
  }

  return (
    <div>
      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-600">No feedback yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {feedbacks.map((item) => (
            <Link to={`/feedbacks/${item.id}`}>
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-1">
                  {item.firstName} {item.lastName}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Email:</strong> {item.email}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Phone:</strong> {item.phoneNumber}
                </p>
                <p className="text-gray-700 mt-3 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-gray-400 text-xs mt-3">
                  ID: {item.id} | Created:{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedBackList;
