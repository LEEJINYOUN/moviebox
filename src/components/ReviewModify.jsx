import "./css/ReviewModify.css";
import React, { useState } from "react";
import { dbService, dbDoc, dbUpdateDoc } from "../FireBase";
import { AiOutlineClose } from "react-icons/ai";
import { ImStarFull } from "react-icons/im";
import styled from "styled-components";

const StarCheckBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: #f7a000;
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .orange {
    color: #f7a000;
  }
`;

export default function ReviewModify({
  toggleEditing,
  reviewObj,
  newReview,
  setNewReview,
  setEditing,
}) {
  const [starClicked, setStarClicked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const starArray = [0, 1, 2, 3, 4];
  const handleStarClick = (e) => {
    let starClick = [...starClicked];
    for (let i = 0; i < 5; i++) {
      starClick[i] = i <= e ? true : false;
    }
    setStarClicked(starClick);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewReview(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let score = starClicked.filter(Boolean).length;
    if (score === 0) {
      alert("평점을 등록해주세요.");
    } else {
      const reviewUpdate = dbDoc(dbService, "review", `${reviewObj.id}`);
      await dbUpdateDoc(reviewUpdate, {
        text: newReview,
        movieGrade: score,
      });
      setEditing(false);
    }
  };
  return (
    <section className="editContainer">
      <div className="editBox">
        <div className="editModalTop">
          <span className="modalTitle">관람평 수정</span>
          <AiOutlineClose className="modalCloseBtn" onClick={toggleEditing} />
        </div>
        <div className="editModalContents">
          <form onSubmit={onSubmit} className="editForm">
            <span className="editMovieName">{reviewObj.movieName}</span>
            <div className="editGradeBox">
              <StarCheckBox>
                {starArray.map((el) => (
                  <ImStarFull
                    key={el}
                    onClick={() => handleStarClick(el)}
                    className={starClicked[el] && "orange"}
                    size="27"
                  />
                ))}
              </StarCheckBox>
            </div>
            <div className="editTextBox">
              <textarea
                defaultValue={newReview}
                onChange={onChange}
                required
                placeholder="평점 및 영화 관람평을 작성해주세요."
                className="editText"
              />
            </div>
            <input type="submit" value="확인" className="editSubmitBtn" />
          </form>
        </div>
      </div>
    </section>
  );
}
