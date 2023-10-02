import React, { useState, useEffect } from "react";
import * as GrIcons from "react-icons/gr";


export function useQuestionType(Schema:any) {

  const [questionValue, setQuestionValue] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [maxChoices, setMaxChoices] = useState(0);
  const [disqualify, setDisqualify] = useState(false);
  const [other, setOther] = useState(false);

  const [newChoice, setNewChoice] = useState("");

  const addChoice = (e: any) => {
    e.preventDefault();
    
    if (newChoice.trim() !== "") {
      setChoices([...choices, newChoice.trim()]); // Add the new choice to the list
      setNewChoice(""); // Clear the new choice input
    }
  };

  useEffect(() => {
    if (Schema) {
      setQuestionValue(Schema.question || "");
      setChoices(Schema.choices || []);
      setMaxChoices(Schema.maxChoice || 0);
      setDisqualify(Schema.disqualify || false);
      setOther(Schema.other || false);
    }
  }, [Schema]);

  const removeChoice = (indexToRemove:any) => {
    const updatedChoices = choices.filter((_, index) => index !== indexToRemove);
    setChoices(updatedChoices);
  };

  const questionTypeComponents: Record<string, JSX.Element> = {
    "Paragraph": (
      <textarea
        className="p-4 mt-2 border-black border-2 rounded-lg w-full"
        placeholder="Enter your paragraph question here..."
        onChange={(e) => setQuestionValue(e.target.value)}
        value = {questionValue}
        required
      />
    ),
    "Short answer": (
      <input
        type="text"
        className="p-4 mt-2 border-black border-2 rounded-lg w-full"
        placeholder="Enter your short answer here..."
        onChange={(e) => setQuestionValue(e.target.value)}
        value = {questionValue}
        required
      />
    ),
    "Yes or No": (
      <>
        <input
          type="text"
          className="p-4 mt-2 border-black border-2 rounded-lg w-full"
          placeholder="Enter your Yes/No question here..."
          onChange={(e) => setQuestionValue(e.target.value)}
          value = {questionValue}
          required
        />
        <div className="mt-3 flex">
          <input
            type='checkbox'
            className=""
            onChange={() => setDisqualify(!disqualify)}
            checked = {disqualify}
            required
          />
            <label htmlFor="checkbox" className='ml-1 text-sm'> Disqualify candidate if the answer is no </label>
        </div>
      </>
    ),
    "Multiple choice": (
      <>
        <input
          type="text"
          className="p-4 mt-2 border-black border-2 rounded-lg w-full"
          placeholder="Type here"
          onChange={(e) => setQuestionValue(e.target.value)}
          value = {questionValue}
          required
        />

        <div className="mt-2">
          <label htmlFor="choices" className="text-black font-semibold text-left mt-4">
            Choices
          </label>
          <div className="flex items-center mt-2">
            <input
              type="text"
              name="newChoice"
              value = {newChoice}
              className="p-2 border-black border-2 rounded-lg"
              placeholder="Enter a choice"
              onChange={(e) => setNewChoice(e.target.value)}
            />
            <button onClick={(e) => addChoice(e)} className="ml-2 p-2 text-white rounded-lg ">
              <GrIcons.GrFormAdd className="w-6 h-6"> </GrIcons.GrFormAdd>
            </button>
          </div>
          <div className="mt-2">
            <ul>
              {choices.map((choice, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{choice}</span>
                  <button onClick={() => removeChoice(index)} className="text-red-500">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-1 flex">
          <input
            type='checkbox'
            className=""
            onChange={() => setOther(!other)}
            checked = {other}
          />
            <label htmlFor="checkbox" className='ml-1 text-sm'> Enable "Other option" </label>
        </div>


        <div className="mt-5">
          <label htmlFor="maxChoice" className="text-black font-semibold text-left mt-4">
            Maximum choice allowed
          </label>
          <input
            type="number"
            name="maxChoice"
            value = {maxChoices}
            className="p-4 mt-2 border-black border-2 rounded-lg w-full"
            placeholder="Enter number of choice allowed here"
            onChange={(e) => setMaxChoices(parseInt(e.target.value))}
            required
          />
        </div>
      </>
    ),
    "Dropdown": (
      <>
        <input
          type="text"
          className="p-4 mt-2 border-black border-2 rounded-lg w-full"
          placeholder="Type here"
          onChange={(e) => setQuestionValue(e.target.value)}
          value = {questionValue}
          required
        />

        <div className="mt-2">
          <label htmlFor="choices" className="text-black font-semibold text-left mt-4">
            Choices
          </label>
          <div className="flex items-center mt-2">
            <input
              type="text"
              name="newChoice"
              value = {newChoice}
              className="p-2 border-black border-2 rounded-lg"
              placeholder="Enter a choice"
              onChange={(e) => setNewChoice(e.target.value)}
            />
            <button onClick={(e) => addChoice(e)} className="ml-2 p-2 text-white rounded-lg ">
              <GrIcons.GrFormAdd className="w-6 h-6"> </GrIcons.GrFormAdd>
            </button>
          </div>
          <div className="mt-2">
            <ul>
              {choices.map((choice, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{choice}</span>
                  <button onClick={() => removeChoice(index)} className="text-red-500">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-1 flex">
          <input
            type='checkbox'
            className=""
            checked={other}
            onChange={() => setOther(!other)}
          />
            <label htmlFor="checkbox" className='ml-1 text-sm'> Enable "Other option" </label>
        </div>
      </>
    ),
    "Number": (
      <>
        <input
          type="number"
          className="p-4 mt-2 border-black border-2 rounded-lg w-full"
          placeholder="Enter your number question here..."
          onChange={(e) => setQuestionValue(e.target.value)}
          value = {questionValue}
          required
        />
      </>
    ),
    "File upload": (
      <>
        <input
          type="text"
          className="p-4 mt-2 border-black border-2 rounded-lg w-full"
          placeholder="Type here..."
          onChange={(e) => setQuestionValue(e.target.value)}
          value = {questionValue}
          required
        />
      </>
    ),
    "Date": (
      <>
        <input
          type="date"
          className="p-4 mt-2 border-black border-2 rounded-lg w-full"
          placeholder="Enter your number question here..."
          onChange={(e) => setQuestionValue(e.target.value)}
          value = {questionValue}
          required
        />
      </>
    ),
  };
  return {questionTypeComponents, questionValue, choices, maxChoices, disqualify, other};
}
