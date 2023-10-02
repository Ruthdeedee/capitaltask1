import React, { useState, useEffect } from "react";
import { useApiSchema, updateApiSchema } from '../Utils/API';
import { useQuestionType } from "../components/QuestionTypes";

enum QuestionType {
    Paragraph = "Paragraph",
    ShortAnswer = "Short answer",
    YesNo = "Yes or No",
    Dropdown = "Dropdown",
    MultipleChoice = "Multiple choice",
    Date = "Date",
    Number = "Number",
    FileUpload = "File upload",
}

// Function to map enum values to API values
function mapToAPIValue(value: QuestionType): string {
    switch (value) {
        case QuestionType.Paragraph:
            return "Paragraph";
        case QuestionType.ShortAnswer:
            return "ShortAnswer";
        case QuestionType.YesNo:
            return "YesNo";
        case QuestionType.Dropdown:
            return "Dropdown";
        case QuestionType.MultipleChoice:
            return "MultipleChoice";
        case QuestionType.Date:
            return "Date";
        case QuestionType.Number:
            return "Number";
        case QuestionType.FileUpload:
            return "FileUpload";
        default:
            return "";
    }
}

export default function Questions({dataType, updatedSchema, updateApiSchema}: any) {
    
    const [selectedType, setSelectedType] = useState(QuestionType.Paragraph);
    const {
        questionTypeComponents,
        questionValue,
        choices,
        maxChoices,
        disqualify,
        other,
    } = useQuestionType("");
    


    const handleTypeChange = (e: any) => {
        setSelectedType(e.target.value);
    };

    const updateAPI = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedQuestionType = mapToAPIValue(selectedType);

        // Update the API schema with the new data
        if (updatedSchema) {
            // Create a new question object
            const newQuestion = {
                id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
                question: questionValue,
                type: selectedQuestionType,
                choices: choices,
                maxChoice: maxChoices,
                disqualify: disqualify,
                other: other,
            };

            if (dataType === "personalInfo") {
                // Update personal questions
                updatedSchema.attributes.personalInformation.personalQuestions.push(newQuestion);
            } else if (dataType === "profileInfo") {
                // Update profile questions
                updatedSchema.attributes.profile.profileQuestions.push(newQuestion);
            } else {
                // Update additional questions
                updatedSchema.attributes.customisedQuestions.push(newQuestion);
            }
            
            // Update the API schema with the updatedData
            const formattedData = {
                data: {
                    ...updatedSchema
                }
            };
            updateApiSchema(formattedData);

        }
    };
    

return (
    <div className="">
        <div className="questions_container shadow-md rounded-xl">
            {/* Header */}
            <div className=" bg-cyan-200 rounded-t-xl">
                <h2 className="text-black font-semibold text-left p-3">Questions</h2>
            </div>

            {/* Questions Area */}
            <div className="flex flex-col p-4">
                <label className="text-black font-semibold text-left mt-4">Type</label>
                <select
                    className="p-4 mt-2 border-black border-2 rounded-lg"
                    onChange={handleTypeChange}
                    value={selectedType}
                >
                    {Object.values(QuestionType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                        ))}
                </select>
            </div>
            <form onSubmit={updateAPI}>
                <div className="flex flex-col p-4">
                    <label className="text-black font-semibold text-left">Question</label>
                    {questionTypeComponents[selectedType] || (
                        <input
                            type="text"
                            className="p-4 mt-2 border-black border-2 rounded-lg"
                            placeholder="Enter your question here..."
                        />
                    )}
                </div>

                <div className="flex justify-center items-center pb-5">
                    <button className=" bg-green-700 rounded-lg p-2 text-white font-semibold text-xs"> Save </button>
                </div>
            </form>
            
        </div>
    </div>
    );
}


