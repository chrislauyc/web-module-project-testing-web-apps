import React, {useState} from "react";
import DisplayComponent from './DisplayComponent';
import {useForm} from '../hooks/useForm';
const formData = {
  firstName: "",
  lastName: "",
  email: "",
  message: ""
}
const errorHandling = (fieldName, fieldValue) => {
  if (fieldName === "firstName" && fieldValue.length < 5)
    return `${fieldName} must have at least 5 characters.`;

  const emailRegex = /(.*)@(.*)\.(.+)/g;
  if (fieldName === "email" && !fieldValue.match(emailRegex))
    return `${fieldName} must be a valid email address.`;

  if (fieldName !== "message" && fieldValue === "")
    return `${fieldName} is a required field.`;
  
  return "";
}
const ContactForm = () => {
  const [display,setDisplay] = useState(false);
  const [form,errors,handleChange,handleSubmit] = useForm(formData,errorHandling);
  const handleSubmitForm=(e)=>{
    setDisplay(handleSubmit(e));
  };
  return (
    <div className="App" data-testid="form-component">
      <h1 data-testid="form-header">Contact Form</h1>
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            onChange={handleChange}
            name="firstName"
            value={form.firstName}
            id="firstName"
            placeholder="Edd"
            data-testid="first-name-input"
          />
          {(errors.firstName) && <p data-testid="error">Error: {errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            onChange={handleChange}
            id="lastName"
            name="lastName"
            value={form.lastName}
            placeholder="Burke"
            data-testid="last-name-input"
          />
          {(errors.lastName) && <p data-testid="error">Error: {errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email">Email*</label>
          <input 
            onChange={handleChange}
            id="email"
            name="email" 
            value={form.email}
            placeholder="bluebill1049@hotmail.com"
            data-testid="email-input"
          />
          {(errors.email) && <p data-testid="error">Error: {errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            onChange={handleChange}
            name="message"
            id="message"
            value={form.message}
            data-testid="message-input"
          />
          {(errors.message) && <p data-testid="error">Error: {errors.message}</p>}
        </div>

        {display && <DisplayComponent form={form}/>}

        <input data-testid="submit" type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;