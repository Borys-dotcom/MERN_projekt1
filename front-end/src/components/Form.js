import "./Form.css";
import { useState } from "react";
import Select from "./Select";
import config from "../config";
import axios from "axios";

const Form = (props) => {
  const [name, setName] = useState("");
  const [event, setEvent] = useState({ key: "", val: "" });
  const [city, setCity] = useState({ key: "", val: "" });
  const [errors, setErrors] = useState([]);

  const choicesEvents = [
    ["", "---"],
    ["front-end-react", "Front End - React JS"],
    ["back-end-node", "Back End - Node JS"],
    ["full-stack-mern", "Full Stack - MERN"],
    ["tester-manual", "Tester Manualny"],
  ];

  const choicesCities = [
    ["", "---"],
    ["online", "Online"],
    ["warsaw", "Warszawa"],
    ["cracow", "Kraków"],
  ];

  const saveEvent = (eventObject) => {
    axios
      .post(config.api.url + "/events/add", eventObject, { mode: "cors" })
      .then((res) => {
        props.getEvents();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
    setName("");
    setEvent({ key: "", val: "" });
    setCity({ key: "", val: "" });
    setErrors([]);
  };

  const validateForm = (e) => {
    e.preventDefault();

    let errorsValidate = [];

    if (name.trim() === "") {
      errorsValidate.push("Wpisz imię i nazwisko");
    }

    if (event.key.trim() === "") {
      errorsValidate.push("wybierz szkolenie");
    }

    if (city.key.trim() === "") {
      errorsValidate.push("wybierz miasto");
    }

    if (errorsValidate.length > 0) {
      setErrors(
        errorsValidate.map((errorTxt, index) => {
          return <li key={index}>{errorTxt}</li>;
        })
      );

      return false;
    }

    const newEvent = {
      name: name,
      event: event,
      city: city,
    };

    saveEvent(newEvent);

    resetForm();
  };

  const handleChangeEvent = (e) => {
    setEvent({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText,
    });
  };

  const handleChangeCity = (e) => {
    setCity({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText,
    });
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="form-wrapper">
      <form action="#" onSubmit={validateForm}>
        <div className="wrapper">
          <label htmlFor="name">Imię i nazwisko</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="wrapper">
          <label htmlFor="event">Wydarzenie</label>
          <Select
            values={choicesEvents}
            selectedValue={event.key}
            onValueChange={handleChangeEvent}
            id="event"
          />
        </div>
        <div className="wrapper">
          <label htmlFor="city">Miasto</label>
          <Select
            values={choicesCities}
            selectedValue={city.key}
            onValueChange={handleChangeCity}
            id="city"
          />
        </div>
        <div className="wrapper">
          <button type="submit">Zapisz na szkolenie</button>
        </div>
      </form>

      <div className="errors-wraper">
        <ul className="errors">{errors}</ul>
      </div>
    </div>
  );
};

export default Form;
