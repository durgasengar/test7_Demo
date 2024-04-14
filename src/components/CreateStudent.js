import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateStudent() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  const inputsHandler = (e) => {
    const { name, value } = e.target;

    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    if (!userForm.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }


    if (!userForm.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }


    if (!userForm.rollno) {
      newErrors.rollno = "Email is required";
      isValid = false;
    }

    

       setErrors(newErrors);
    return isValid;
  };


  const onSubmit = (e) => {

    
      if (validateForm()) {
        // Form is valid, you can submit or process the data here
        console.log("Form data:", userForm);
        setSubmitted(true); // Set a submitted flag
      } else {
        // Form is not valid, display error messages
      }
      
    e.preventDefault();
    axios
      .post("http://localhost:4000/students/create-student", userForm)
      .then((res) => {
        console.log(res.data);
        setUserForm({
          name: "",
          email: "",
          rollno: "",
        });
      });

  };

  useEffect(() => {}, []);

  const isFormValid = Object.keys(errors).length === 0;
  return (
    <div>
      <div className="form-wrapper">
      <h2>Login</h2>
      {submitted ? (
        <div className="success-message">Login successful!</div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={userForm.name}
              onChange={inputsHandler}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={userForm.email}
              onChange={inputsHandler}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Roll no.</label>
            <input
              type="text"
              className="form-control"
              name="rollno"
              id="rollno"
              value={userForm.rollno}
              onChange={inputsHandler}
            />
            {errors.rollno && <div className="error">{errors.rollno}</div>}
          </div>
          <div className="mb-3">
            <button type="submit" disabled={!isFormValid} className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}
      </div>
    </div>
  );
}

export default CreateStudent;
