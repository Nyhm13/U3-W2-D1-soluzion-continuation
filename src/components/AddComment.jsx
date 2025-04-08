// import { Component } from 'react'
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Y1MTgyMTgxYjBkZDAwMTUwYTdhODMiLCJpYXQiOjE3NDQxMTU3NDYsImV4cCI6MTc0NTMyNTM0Nn0.y_Mb9GaB6tpjPG_gAQ_XPKy-_ZfPw0Y4uFtL5mtlXQk";
const AddComment = function (props) {
  // state = {
  //   comment: {
  //     comment: '',
  //     rate: 1,
  //     elementId: this.props.asin,
  //   },
  // }
  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: props.asin,
  });

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Content-type": "application/json",
            Authorization: Token,
          },
        }
      );
      if (response.ok) {
        alert("Recensione inviata!");
       setComment({
          comment: {
            comment: "",
            rate: 1,
            elementId: props.asin,
          },
        });
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            // value={this.state.comment.comment}
            value={comment.comment}
            // onChange={(e) =>
            //   this.setState({
            //     comment: {
            //       ...this.state.comment,
            //       comment: e.target.value,
            //     },
            //   })
            // }
            onChange={(e) =>
              setComment({
                
                  ...comment,
                  comment: e.target.value,
                
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            // value={this.state.comment.rate}
            value={comment.rate}
            // onChange={(e) =>
            //   this.setState({
            //     comment: {
            //       ...this.state.comment,
            //       rate: e.target.value,
            //     },
            //   })
            // }
            onChange={(e) =>
              setComment({
                
                  ...comment,
                  rate: e.target.value,
                
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
