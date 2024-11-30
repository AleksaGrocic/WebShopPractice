import "./App.css";
import Header from "./components/Header";
import Item from "./components/Item";

function App() {
  return (
    <>
      <Header />
      <div className="item_list">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  );
}

export default App;
