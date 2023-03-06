import "./css/ReviewModify.css";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ReviewModify({
  toggleEditing,
  onSubmit,
  reviewObj,
  newReview,
  setNewReview,
  newGrade,
  setNewGrade,
}) {
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewReview(value);
  };

  const gradeOnChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewGrade(value);
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
              <input
                type="number"
                min="1"
                max="5"
                defaultValue={newGrade}
                onChange={gradeOnChange}
                className="editGrade"
              />
              &nbsp;점
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
