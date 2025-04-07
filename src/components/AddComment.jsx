import { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

const Token= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VlN2NiNzFkNDM2ZTAwMTVkYTI3MGIiLCJpYXQiOjE3NDM2ODI3NDMsImV4cCI6MTc0NDg5MjM0M30.HfcucgurYn1ojdw74CO-z3977cDs5bMha-19KgrzBBo"
class AddComment extends Component {
  state = {
    comment: {
      comment: '',
      rate: 1,
      elementId: this.props.asin,
    },
  }

  sendComment = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(this.state.comment),
          headers: {
            'Content-type': 'application/json',
            Authorization: Token,
          },
        }
      )
      if (response.ok) {
        alert('Recensione inviata!')
        this.setState({
          comment: {
            comment: '',
            rate: 1,
            elementId: this.props.asin,
          },
        })
      } else {
        throw new Error('Qualcosa è andato storto')
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <div className="my-3">
        <Form onSubmit={this.sendComment}>
          <Form.Group className="mb-2">
            <Form.Label>Recensione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci qui il testo"
              value={this.state.comment.comment}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    comment: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control
              as="select"
              value={this.state.comment.rate}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    rate: e.target.value,
                  },
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
    )
  }
}

export default AddComment
