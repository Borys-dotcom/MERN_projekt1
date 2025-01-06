import Form from "./components/Form";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "./config";
import Table from "./components/Table";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    axios
      .get(config.api.url + "/events")
      .then((result) => {
        setEvents(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteEvent = (rowId) => {
    if (window.confirm("Usunąć zapis na szkolenie?")) {
      console.log(rowId);
      axios
        .delete(config.api.url + "/events/delete/" + rowId)
        .then((res) => {
          if (res.data.deleted) {
            getEvents();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <Form getEvents={getEvents} />
      </div>
      <div className="tablecontainer">
        <Table className="Table" events={events} deleteEvent={deleteEvent} />
      </div>
    </div>
  );
}

export default App;
