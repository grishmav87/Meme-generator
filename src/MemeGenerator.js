import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    //get a random int representing an index in the array
    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    //get meme from that index
    const randomMemeImg = this.state.allMemeImgs[randomNum].url;
    //set 'randomImg' to '.url' of random item called
    this.setState({ randomImg: randomMemeImg });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <strong>Top text: </strong>
          <input
            type="text"
            name="topText"
            autoComplete="off"
            value={this.state.topText}
            placeholder=" One does not simply..."
            onChange={this.handleChange}
          />

          <br />
          <br />

          <strong>Bottom text: </strong>
          <input
            type="text"
            name="bottomText"
            autoComplete="off"
            value={this.state.bottomText}
            placeholder=" walk into Mordor."
            onChange={this.handleChange}
          />

          <br />
          <br />
          <button>Generate meme</button>
        </form>
        <div className="meme">
          <h2 className="top-text">{this.state.topText}</h2>
          <img src={this.state.randomImg} alt="meme" />
          <h2 className="bottom-text">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
export default MemeGenerator;
