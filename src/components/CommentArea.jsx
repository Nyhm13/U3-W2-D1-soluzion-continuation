import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
const Token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VlN2NiNzFkNDM2ZTAwMTVkYTI3MGIiLCJpYXQiOjE3NDM2ODI3NDMsImV4cCI6MTc0NDg5MjM0M30.HfcucgurYn1ojdw74CO-z3977cDs5bMha-19KgrzBBo";
class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    isError: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.asin && this.props.asin !== prevProps.asin) {
      this.fetchComments();
    }
  }

  fetchComments = async () => {
    this.setState({ isLoading: true, isError: false });
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      if (response.ok) {
        const comments = await response.json();
        this.setState({ comments, isLoading: false });
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.error("Errore nel fetch dei commenti:", error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {this.props.asin ? (
          <>
            <AddComment asin={this.props.asin} />
            <CommentList commentsToShow={this.state.comments} />
          </>
        ) : (
          <p>Seleziona un libro per vedere i commenti</p>
        )}
      </div>
    );
  }
}

export default CommentArea;
