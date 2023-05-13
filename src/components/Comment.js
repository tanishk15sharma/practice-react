import React, { useState, useRef, useEffect } from "react";
import { Action } from "./Action";

const Comment = ({
  comment,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
}) => {
  const [input, setInput] = useState("");
  console.log(comment);

  const inputRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);

      setEditMode(false);
    } else {
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }
  };

  const handleNewComment = () => {
    setShowInput(true);
  };

  const toggleEditMode = () => {
    setEditMode((previousVal) => !previousVal);
  };
  return (
    <div>
      <div className="comment-box">
        {comment.id === 1 ? (
          <>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter Comment"
            />
            <Action type={"Comment"} handleClick={onAddComment} />
          </>
        ) : (
          <>
            <span contentEditable={editMode} ref={inputRef}>
              {comment.name}
            </span>

            {editMode ? (
              <div>
                <Action type={"Save"} handleClick={onAddComment} />
                <Action type={"Cancel"} handleClick={toggleEditMode} />
              </div>
            ) : (
              <div>
                <Action type={"Reply"} handleClick={handleNewComment} />
                <Action type={"Edit"} handleClick={toggleEditMode} />
                <Action
                  type={"Delete"}
                  handleClick={() => handleDeleteNode(comment.id)}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div style={{ paddingLeft: 25 }}>
        {showInput && (
          <div>
            <input
              type="text"
              placeholder="reply comment"
              onChange={(e) => setInput(e.target.value)}
            />
            <Action type={"Reply"} handleClick={onAddComment} />
            <Action type={"Cancel"} handleClick={() => setShowInput(false)} />
          </div>
        )}
        {comment?.items?.map((cmt) => {
          return (
            <Comment
              key={cmt.id}
              comment={cmt}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
            />
          );
        })}
      </div>
    </div>
  );
};

export { Comment };
