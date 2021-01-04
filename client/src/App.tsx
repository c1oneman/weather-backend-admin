import "./App.css";
//import Table from "./components/TableComponent";
import Form from "./components/CreateForm";
import OrderTable from "./components/TableComponentOrderable";
function App() {
  return (
    <div className="App">
      Weather Against Humans
      <OrderTable />
      <Form />
    </div>
  );
}

export default App;
