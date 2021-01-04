import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPhrases } from "../redux/actions/phrasesActions";
const initPhrase = {
  phrase: "",
  subtext: "",
  category_id: "",
  heat_index: "",
  isExplicit: false,
};
const CreateForm: React.FC = () => {
  const dispatch = useDispatch();
  const [phrase, setPhrases] = useState(initPhrase);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPhrase = {
      phrase: phrase.phrase,
      subtext: phrase.subtext,
      category_id: Number(phrase.category_id),
      heat_index: Number(phrase.heat_index),
      isExplicit: phrase.isExplicit,
    };
    dispatch(addPhrases(newPhrase));
    setPhrases(initPhrase);
  };
  const inputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setPhrases({
      ...phrase,
      [name]: valueToUse,
    });
  };
  console.log(typeof phrase.category_id);
  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        name="phrase"
        value={phrase.phrase}
        type="text"
        placeholder="Phrase"
        onChange={inputChange}
      />
      <input
        name="subtext"
        value={phrase.subtext}
        type="text"
        placeholder="Subtext"
        onChange={inputChange}
      />
      <input
        name="category_id"
        value={phrase.category_id}
        type="number"
        placeholder="Category ID"
        onChange={inputChange}
      />
      <input
        name="heat_index"
        value={phrase.heat_index}
        type="number"
        placeholder="Heat Index"
        onChange={inputChange}
      />
      <input
        name="isExplicit"
        checked={phrase.isExplicit}
        type="checkbox"
        onChange={inputChange}
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default CreateForm;
