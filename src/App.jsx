import "./App.css";
import Liste from "./Liste";
import InputWithLabel from "./InputWithLabel";
import React from "react";
import axios from "axios";
import Yazi from "./Yazi";
function App() {
  const API_ENDPOINT =
    "https://my-json-server.typicode.com/asimsinan/mockapi/dersler";
  const [aramaMetni, setAramaMetni] = React.useState(
    localStorage.getItem("aranan") || "Web"
  );
  const yazilarReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "REMOVE_POST":
        return {
          ...state,
          data: state.data.filter((post) => action.payload !== post.id),
        };
      default:
        throw new Error();
    }
  };
  const [yazilar, dispatchYazilar] = React.useReducer(yazilarReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  function handleSearch(event) {
    setAramaMetni(event.target.value);
    localStorage.setItem("aranan", event.target.value);
  }
  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni);
  }, [aramaMetni]);
  const handleFetchPost = React.useCallback(() => {
    dispatchYazilar({ type: "FETCH_INIT" });
    axios(API_ENDPOINT)
      .then((result) => {
        dispatchYazilar({
          type: "FETCH_SUCCESS",
          payload: result.data.data,
        });
      })
      .catch(() => dispatchYazilar({ type: "FETCH_FAILURE" }));
  });
  React.useEffect(() => {
    handleFetchPost();
  }, []);
  function handleRemovePost(yaziID) {
    dispatchYazilar({
      type: "REMOVE_POST",
      payload: yaziID,
    });
  }
  const arananYazilar = yazilar.data.filter(function (yazi) {
    return yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase());
  });
  return (
    <div>
      <InputWithLabel
        type="text"
        id="arama"
        value={aramaMetni}
        onInputChange={handleSearch}
        label="Arama"
      />
      <hr />
      {yazilar.isError ? (
        <p>Bir hata oluştu...</p>
      ) : yazilar.isLoading ? (
        <p>Yükleniyoor...</p>
      ) : (
        <Liste
          Yazi={
            <Yazi yazilar={arananYazilar} onRemovePost={handleRemovePost} />
          }
        />
      )}
    </div>
  );
}
export default App;
