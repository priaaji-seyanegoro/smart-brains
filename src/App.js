import React, { useState } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import FaceRecognation from "./components/FaceRecognation/FaceRecognation";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
};

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [entries, setEntries] = useState(0);

  // useEffect(() => {
  //   fetch("http://localhost:3000/")
  //     .then(res => res.json())
  //     .then(console.log);
  // });

  const calculateFaceLocation = data => {
    // console.log(data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  const displayFaceBox = paramBox => {
    setBox(paramBox);
  };

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onImageSubmit = () => {
    setImageUrl(input);
    fetch("https://obscure-cliffs-01531.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://obscure-cliffs-01531.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: id
            })
          })
            .then(res => res.json())
            .then(count => {
              setEntries(count);
            });
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  const onRouteChange = params => {
    if (params === "signin") {
      setIsSignedIn(false);
      setBox({});
      setInput("");
      setImageUrl("");
    } else if (params === "home") {
      setIsSignedIn(true);
    }
    setRoute(params);
  };

  const loadUser = data => {
    setId(data.id);
    setName(data.name);
    setEntries(data.entries);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={name} entries={entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onImageSubmit}
          />
          <FaceRecognation propBox={box} imageUrl={imageUrl} />
        </div>
      ) : route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
