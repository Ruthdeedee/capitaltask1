import * as RiIcons from 'react-icons/ri';
import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import {FiEdit2} from 'react-icons/fi';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useQuestionType } from "../components/QuestionTypes"; 
import {AiOutlineClose} from 'react-icons/ai';


const AddQuestions = () => {
    return (
        <button className='flex px-5 pb-4 hover:text-gray-700'>
            <RiIcons.RiAddLine className='w-6 h-6 mr-2'> </RiIcons.RiAddLine>
            <p className='font-semibold' > Add a question</p>
        </button>
    )
}
function mapAPItoValue(st:any): string {
    switch (st) {
        case "Paragraph":
            return "Paragraph";
        case "ShortAnswer":
            return "Short answer";
        case "YesNo":
            return "Yes or No";
        case "Dropdown":
            return "Dropdown";
        case "MultipleChoice":
            return "Multiple choice";
        case "Date":
            return "Date";
        case "Number":
            return "Number";
        case "FileUpload":
            return "File upload";
        default:
            return "";
    }
}

const titleMap: { [key: string]: string } = {
    education: "Education",
    experience: "Experience",
    resume: "Resume",
};

export default function Profile({updatedSchema, updateApiSchema}: any) {

    let editableArr = new Array(updatedSchema.attributes.profile.profileQuestions.length).fill(false);

    const [editable, setEditable] = useState(editableArr);
    const [editableIndex, setEditableIndex] = useState(0);

    const {
        questionTypeComponents,
        questionValue,
        choices,
        maxChoices,
        disqualify,
        other,
    } = useQuestionType(updatedSchema.attributes.profile.profileQuestions[editableIndex]);

    const updateAPI = () => {
        if (updatedSchema) {
            const formattedData = {
                data: {
                    ...updatedSchema
                }
            };
            updateApiSchema(formattedData);
        }
    }

    const updateQuestion = (idx: any) => {
        editable[idx] = !editable[idx]
        updatedSchema.attributes.profile.profileQuestions[idx].question = questionValue;
        updatedSchema.attributes.profile.profileQuestions[idx].choices = choices;
        updatedSchema.attributes.profile.profileQuestions[idx].maxChoice = maxChoices;
        updatedSchema.attributes.profile.profileQuestions[idx].disqualify = disqualify;
        updatedSchema.attributes.profile.profileQuestions[idx].other = other;
        updateAPI();
    }
    const deleteQuestion = (idx: any) => {
        updatedSchema.attributes.profile.profileQuestions.splice(idx, 1);
        updateAPI();
    }


    return (
        <div className='p-4 sm:ml-64 sm:mt-10'>
            <div className='profile_container w-96 shadow-md rounded-xl'>
                {/* Header */}
                <div className=' bg-cyan-200 rounded-t-xl'>
                    <h2 className='text-black font-semibold text-left p-3'>
                        Profile
                    </h2>
                </div>

                {/* Personal Information Area */}
                <div id='main_info_window' className='mb-4'>
                    <div className="relative z-0 px-5 group py-3">
                            <div className="flex flex-col"> {/* Use flex-col to stack items vertically */}
                            {Object.entries(updatedSchema.attributes.profile).map(([key, value], index) => {
                                const profile = value as { mandatory: boolean, show: boolean };
                                return key !== "profileQuestions" &&  (
                                    <div className='text-left mb-4' key={index}>
                                        <div className="flex justify-between">
                                            <label className="text-left text-sm font-semibold text-black duration-300 transform">
                                                {titleMap[key] || key}
                                            </label>

                                            <div className='flex'>
                                                {key !== "profileQuestions" && (
                                                    <>
                                                        <div className='mr-5'>
                                                            <input
                                                                type='checkbox'
                                                                checked={profile.mandatory}
                                                                onChange={(e) => {updatedSchema.attributes.profile[key].mandatory = !profile.mandatory;  updateAPI() }}
                                                            />
                                                            <label htmlFor="checkbox" className='ml-1 text-sm'> Mandatory </label>
                                                        </div>
                                                        <>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    value=""
                                                                    className="sr-only peer"
                                                                    checked={profile.show}
                                                                    onChange={(e) =>{updatedSchema.attributes.profile[key].show = !profile.show;  updateAPI() }}
                                                                />
                                                                <div
                                                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600"
                                                                ></div>
                                                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{profile.show ? 'Show' : 'Hide'}</span>
                                                            </label>
                                                        </>
                                                    </>
                                                    )}
                                                </div>
                                            </div>
                                            <hr className=' bg-gray-500 mt-3'></hr>
                                    </div>
                                )
                            })}
                       {
                                updatedSchema.attributes.profile.profileQuestions.length >= 2  ? (
                                    updatedSchema.attributes.profile.profileQuestions.map((question: any, index: any) => {
                                        if (index === 0) return null;

                                        return (
                                            <div className='text-left mb-4' key={index}>
                                                {/* Display question type */}
                                                <label className="text-left text-sm font-semibold text-gray-400 duration-300 transform">
                                                    {question.type}
                                                </label>
                                        
                                                <br />
                                        
                                                <div className='flex justify-between'>
                                                    <span className='font-bold' style={{ whiteSpace: 'pre-wrap', maxWidth: '300px' }}>
                                                        {question.question}
                                                    </span>
                                                    <FiEdit2
                                                        onClick={() => {
                                                            const newEditable = [...editable];
                                                            newEditable[index] = !newEditable[index];
                                                            setEditable(newEditable);
                                                            setEditableIndex(index);
                                                        }}
                                                        className='items-end hover:text-gray-500 cursor-pointer'
                                                    />
                                                </div>
                                        
                                                {editable[index] && (
                                                    <>
                                                        <div className="flex flex-col p-4" >
                                                            {/* Display editing input when in edit mode */}
                                                            <label className="text-black font-semibold text-left">Question</label>
                                                            {questionTypeComponents[mapAPItoValue(question.type)] || (
                                                                <input
                                                                    type="text"
                                                                    className="p-4 mt-2 border-black border-2 rounded-lg"
                                                                    placeholder="Enter your question here..."
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="flex justify-between items-center pb-5">
                                                            {/* Display "Save" button when in edit mode */}
                                                            <div className='flex items-center'>
                                                                <AiOutlineClose className='text-red-600 w-5 h-5'></AiOutlineClose>
                                                                <button onClick={() => deleteQuestion(index)} className=" text-red-600 rounded-lg p-2 font-bold text-sm">Delete question</button>
                                                            </div>
                                                            
                                                            <button onClick={() => updateQuestion(index)} className="bg-green-700 rounded-lg p-2 text-white font-bold text-sm">Save</button>
                                                            
                                                        </div>
                                                    </>
                                                )}

                                                <hr className='bg-gray-500 mt-3' />
                                            </div>
                                        )
                                    })
                                ) : null
                                }
                        </div>
                    </div>
                    <Popup contentStyle={{ width: "80%", maxWidth: "24rem", padding:0, borderRadius:"12px" }} trigger={AddQuestions} position="center center" closeOnDocumentClick closeOnEscape repositionOnResize modal>
                        <Questions dataType = {"profileInfo"} updatedSchema = {updatedSchema}  updateApiSchema = {updateApiSchema} />
                    </Popup>
                </div> 
                
            </div>
        </div>
    )

}