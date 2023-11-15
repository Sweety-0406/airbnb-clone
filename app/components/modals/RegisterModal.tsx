'use client';

import axios from "axios";
import {useState,useEffect,useCallback} from 'react';
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { FieldValues,  SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from '../Heading';
import Input from "../Inputs/Input";



const RegisterModel=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const registerModal=useRegisterModal();

    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        axios.post('/api/register',data)
        .then(()=>{
            registerModal.onClose();
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }
    const bodyContent=(
        <div>
            <Heading
              title='Welcome to Airbnb'
              subtitle='Create an account'
              
             />
             <Input 
              id={"email"}
              label={"Email"} 
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
             <Input 
              id={"username"}
              label={"Username"} 
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
             <Input 
              id={"password"}
              label={"Password"} 
              type='password'
              disabled={isLoading}
              errors={errors}   
              register={register}   
              required          
             />
        </div>
    )
    return (
        <div>
          <Modal
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                isOpen={registerModal.isOpen}
                actionLabel={"Continue"}
                disabled={isLoading}
                title='Register'   
                body={bodyContent}         
          />
        </div>
    )
}

export default RegisterModel;