import { Component } from "react";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
const Token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Y1MTgyMTgxYjBkZDAwMTUwYTdhODMiLCJpYXQiOjE3NDQxMTU3NDYsImV4cCI6MTc0NTMyNTM0Nn0.y_Mb9GaB6tpjPG_gAQ_XPKy-_ZfPw0Y4uFtL5mtlXQk";
const CommentArea = function (props) {
  const [comments, setComments] = useState({
    comments: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    if (props.asin) {
      fetchComments();
    }
  }, [props.asin]);

  const fetchComments = async () => {
    setComments((prevState) => ({ ...prevState, isLoading: true, isError: false }));
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${props.asin}`,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      if (response.ok) {
        const fetchedComments = await response.json();
        setComments((prevState) => ({ ...prevState, comments: fetchedComments, isLoading: false }));
      } else {
        setComments((prevState) => ({ ...prevState, isLoading: false, isError: true }));
      }
    } catch (error) {
      console.error("Errore nel fetch dei commenti:", error);
      setComments((prevState) => ({ ...prevState, isLoading: false, isError: true }));
    }
  };

  return (
    <div className="text-center">
      {comments.isLoading && <Loading />}
      {comments.isError && <Error />}
      {props.asin ? (
        <>
          <AddComment asin={props.asin} />
          <CommentList commentsToShow={comments.comments} />
        </>
      ) : (
        <p>Seleziona un libro per vedere i commenti</p>
      )}
    </div>
  );
};

export default CommentArea;
