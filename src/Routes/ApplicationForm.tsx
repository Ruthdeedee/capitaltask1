import React, { useState, useEffect } from 'react';
import '../index.css'; 
import UploadImage from '../components/UploadImage'
import PersonalInformation from '../components/PersonalInformation';
import Profile from '../components/Profile';
import AdditionalQuestions from '../components/AdditionalQuestions';
import { useApiSchema, updateApiSchema } from '../Utils/API';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Spin } from 'antd';

const antIcon = <AiOutlineLoading3Quarters style={{ fontSize: 24 }} className='animate-spin spin' />;

export default function ApplicationForm() {
  const apiSchema = useApiSchema();
  
  const [updatedSchema, setUpdatedSchema] = useState<any | null>(null);
  const [updateApiSchemaTrigger, setUpdateApiSchemaTrigger] = useState<number>(0);
  
  useEffect(() => {
    if (apiSchema && apiSchema.data) {
      setTimeout(() => {
        setUpdatedSchema(apiSchema.data);
      }, 1000); 
    }
    
  }, [apiSchema, updateApiSchemaTrigger]);

  // Function to update the API schema and trigger a re-render
  const handleUpdateApiSchema = (data: any) => {
    console.log(data);
    updateApiSchema(data);
    setUpdateApiSchemaTrigger((prev) => prev + 1);
  };

  if (updatedSchema == null) {
    return (
      // <div className="flex h-screen items-center justify-center">
      //   <Spin indicator={antIcon} />
      // </div>

      <UploadImage/>
      

    )
  }

  return (
    <>
      <UploadImage />
      <PersonalInformation
        updatedSchema={updatedSchema}
        setUpdatedSchema={setUpdatedSchema}
        updateApiSchema={handleUpdateApiSchema}
      />
      <Profile
        updatedSchema={updatedSchema}
        setUpdatedSchema={setUpdatedSchema}
        updateApiSchema={handleUpdateApiSchema}
      />
      <AdditionalQuestions
        updatedSchema={updatedSchema}
        setUpdatedSchema={setUpdatedSchema}
        updateApiSchema={handleUpdateApiSchema}
      />
    </>
  );
}
