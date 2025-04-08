import { Component } from "react";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
const Token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Y1MTgyMTgxYjBkZDAwMTUwYTdhODMiLCJpYXQiOjE3NDQxMTU3NDYsImV4cCI6MTc0NTMyNTM0Nn0.y_Mb9GaB6tpjPG_gAQ_XPKy-_ZfPw0Y4uFtL5mtlXQk";
const CommentArea = function (props) {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [comments, setComments] = useState({
    comments: [],
    isLoading: false,
    isError: false,
  });

  // componentDidUpdate(prevProps) {
  //   if (this.props.asin && this.props.asin !== prevProps.asin) {
  //     this.fetchComments();
  //   }
  // }
  
  const fetchComments = async () => {
    // this.setState({ isLoading: true, isError: false });
    setComments({ ... comments,
      comments: [],
      isLoading: true, 
      isError: false });
      try {
        const response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/'+ props.asin,
          {
            headers: {
            Authorization: Token,
          },
        }
      );
      if (response.ok) {
        const fetchedData = await response.json();
        // this.setState({ comments, isLoading: false });
        setComments({... comments,
          comments:fetchedData , isLoading: false });
        } else {
          // this.setState({ isLoading: false, isError: true });
          setComments({ ... comments, isLoading: false, isError: true });
        }
      } catch (error) {
        console.error("Errore nel fetch dei commenti:", error);
        // this.setState({ isLoading: false, isError: true });
        setComments({ ... comments, isLoading: false, isError: true });
      }
    };
   
    useEffect(() => {
      if (props.asin)
      fetchComments();
    }, [props.asin]);
  // return (
  //   <div className="text-center">
  //     {this.state.isLoading && <Loading />}
  //     {this.state.isError && <Error />}
  //     {this.props.asin ? (
  //       <>
  //         <AddComment asin={this.props.asin} />
  //         <CommentList commentsToShow={this.state.comments} />
  //       </>
  //     ) : (
  //       <p>Seleziona un libro per vedere i commenti</p>
  //     )}
  //   </div>
  // );
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
