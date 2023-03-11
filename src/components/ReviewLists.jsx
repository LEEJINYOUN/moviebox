import "./css/ReviewLists.css";
import React, { useEffect, useState } from "react";
import {
  dbService,
  dbCollection,
  dbQuery,
  dbOnSnapshot,
  dbOrderBy,
} from "../FireBase";
import Review from "../components/Review";

export default function ReviewLists({
  userInfo,
  detailMove,
  starArray,
  starClicked,
}) {
  const [reviewContents, setReviewContents] = useState([]);
  useEffect(() => {
    const chatQuery = dbQuery(
      dbCollection(dbService, "review"),
      dbOrderBy("createdAt", "desc")
    );
    dbOnSnapshot(chatQuery, (snapshot) => {
      const chatArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setReviewContents(chatArr);
    });
  }, []);
  return (
    <div className="reviewLists">
      {reviewContents.map((item) => (
        <Review
          key={item.id}
          reviewObj={item}
          userInfo={userInfo}
          movieTitle={detailMove.title}
          starArray={starArray}
          starClicked={starClicked}
        />
      ))}
    </div>
  );
}
