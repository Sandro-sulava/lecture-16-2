import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FeedBackDetails = () => {
  const { id } = useParams();

  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users${id}`)
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setFeedback(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      name :{feedback.name}
      username :{feedback.username}
    </div>
  );
};

export default FeedBackDetails;
