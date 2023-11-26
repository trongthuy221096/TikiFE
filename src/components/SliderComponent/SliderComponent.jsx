import React from "react";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { BiSkipNextCircle } from "react-icons/bi";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const App = () => {
  return (
    <Carousel
      arrows
      prevArrow={<BiSkipNextCircle color="red" />}
      nextArrow={<BiSkipNextCircle color="red" />}
      dots={null}
      autoplay
    >
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};
export default App;
