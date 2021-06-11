import {useState} from 'react';

export const useForm=(initialData,errorHandling)=>{
    const initForm=()=>{
        return initialData
        ?
            initialData
        :
            {}
    }
    const initErrors=()=>{
        return initialData
        ?
            Object.keys(initialData).reduce((acc,key)=>{
                acc[key]=initialData[key];
                return acc;
            },{})
        :
            {}
    }
    const [values, setValues] = useState(initForm);
    const [errors,setErrors] = useState(initErrors);
    const handleChange=(e)=>{
        setField(e.target.name,e.target.value);
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const submitErrors = Object.keys(values).reduce((acc,key)=>{
            acc[key] = setField(key,values[key]);
            return acc;
        },{});
        setErrors(submitErrors);
        const isValid = Object.keys(submitErrors).reduce((acc,key)=>submitErrors[key]===''&&acc,true);
        if(isValid){
            // clear();
            return true;
        }
        return false;
    }
    const setField=(key,value)=>{
        const errorMessage = errorHandling(key,value);
        setErrors({
            ...errors,
            [key]: errorMessage
        });
        setValues({
            ...values,
            [key]:value
        })
        return errorMessage;
    };
    const clear=()=>{
        setValues(initForm());
        setErrors(initErrors());
    }
    return [values,errors,handleChange,handleSubmit];
};