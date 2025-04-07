import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedBookAsin: null, // Stato per tracciare il libro selezionato
  };

  handleBookSelection = (asin) => {
    this.setState({ selectedBookAsin: asin });
  };

  render() {
    return (
      <>
        <Row>
          <Col xs={8}>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={4} className="text-center">
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Cerca un libro"
                    value={this.state.searchQuery}
                    onChange={(e) =>
                      this.setState({ searchQuery: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              {this.props.books
                .filter((b) =>
                  b.title.toLowerCase().includes(this.state.searchQuery)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      isSelected={this.state.selectedBookAsin === b.asin}
                      onBookSelect={() => this.handleBookSelection(b.asin)}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col xs={4}>
            <CommentArea asin={this.state.selectedBookAsin} />
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
