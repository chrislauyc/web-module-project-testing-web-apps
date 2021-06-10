import React from 'react';
import {render, screen, waitFor, fireEvent, findAllByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

//better to be WET in testing

test('renders without errors', ()=>{
    render(<ContactForm/>);
    const form = screen.getByTestId('form-component');
    expect(form).toBeInTheDocument();
    // screen.debug();
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    expect(screen.getByTestId('form-header')).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    userEvent.type(screen.getByTestId('first-name-input'),'1234');
    expect(await screen.findByTestId('error')).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    // userEvent.type(screen.getByTestId('first-name-input'),'1');
    // userEvent.type(screen.getByTestId('last-name-input'),'1');
    // userEvent.type(screen.getByTestId('email-input'),'1');
    // userEvent.type(screen.getByTestId('first-name-input'),'');
    // userEvent.type(screen.getByTestId('last-name-input'),'');
    // userEvent.type(screen.getByTestId('email-input'),'');
    userEvent.click(screen.getByTestId('submit'));
    expect(await screen.findAllByTestId('error')).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    userEvent.type(screen.getByTestId('first-name-input'),'Chris');
    userEvent.type(screen.getByTestId('last-name-input'),'Lau');
    userEvent.click(screen.getByTestId('submit'));
    expect(await screen.findAllByTestId('error')).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    userEvent.type(screen.getByTestId('email-input'),'1234');
    expect(await screen.findByText(/email must be a valid email address/i)).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    userEvent.click(screen.getByTestId('submit'));
    expect(await screen.findByText(/lastName is a required field/i)).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    userEvent.type(screen.getByTestId('first-name-input'),'Chris');
    userEvent.type(screen.getByTestId('last-name-input'),'Lau');
    userEvent.type(screen.getByTestId('email-input'),'chris@gmail.com');
    userEvent.click(screen.getByTestId('submit'));
    expect(await screen.getByTestId('firstnameDisplay')).toBeInTheDocument();
    expect(await screen.getByTestId('lastnameDisplay')).toBeInTheDocument();
    expect(await screen.getByTestId('emailDisplay')).toBeInTheDocument();
    expect(screen.queryByTestId('messageDisplay')).toBeNull();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    userEvent.type(screen.getByTestId('first-name-input'),'Chris');
    userEvent.type(screen.getByTestId('last-name-input'),'Lau');
    userEvent.type(screen.getByTestId('email-input'),'chris@gmail.com');
    userEvent.type(screen.getByTestId('message-input'),'hello');
    userEvent.click(screen.getByTestId('submit'));
    expect(await screen.getByTestId('firstnameDisplay')).toBeInTheDocument();
    expect(await screen.getByTestId('lastnameDisplay')).toBeInTheDocument();
    expect(await screen.getByTestId('emailDisplay')).toBeInTheDocument();
    expect(await screen.getByTestId('messageDisplay')).toBeInTheDocument();
});