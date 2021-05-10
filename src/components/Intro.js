import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class IntroCard extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render = () => {
    return (
      <Card style={{ width: "36rem" }} className="text-center" bg="light">
        <Card.Body>
          <Card.Header>{this.props.header}</Card.Header>
          <Card.Text>{this.props.text}</Card.Text>
          <Card.Footer>
            <Container>
              <Row>
                <Col>
                  {this.props.previous ? (
                    <Button onClick={this.props.previous}>Previous</Button>
                  ) : (
                    ""
                  )}
                </Col>
                <Col>
                  {this.props.next ? (
                    <Button onClick={this.props.next}>Next</Button>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Container>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  };
}

export default class Intro extends React.Component {
  render = () => {
    return (
      <IntroCard
        header="header"
        text="
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere mi lacinia ultrices fermentum. Integer eget tincidunt nibh. Aenean euismod, augue eget placerat accumsan, erat mauris commodo tortor, in tempor nisl tellus eget libero. Fusce feugiat purus ante, a condimentum lectus laoreet eu. Mauris neque nisl, lacinia sit amet varius quis, elementum ut ex. Nam a feugiat arcu, sit amet semper elit. Phasellus commodo elementum suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam non fringilla nisi. Vivamus egestas nisi vel condimentum congue. Mauris at nulla eget nunc placerat tincidunt vitae et ipsum."
        next={() => console.log("testing")}
        previous={() => console.log("testing")}
      ></IntroCard>
    );
  };
}
