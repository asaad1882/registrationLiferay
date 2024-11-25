import React, { useRef, useState } from "react";
import './App.css'
import { Controller, useForm } from "react-hook-form";
import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "./axios-client.js";



function App() {
  const SITE_KEY=`${import.meta.env.VITE_REACT_APP_SITE_KEY}`;
  const recaptcha = useRef();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMessage, setError] = useState("")
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    // use mode to specify the event that triggers each input field 
    mode: "onBlur"
  });
  const registerOptions = {
    name: {
      required: "Name is required",
      minLength: {
        value: 3,
        message: "Name should be at-least 3 characters.",
      }, maxLength: {
        value: 50,
        message: "Name should be at-max 50 characters.",
      }
      ,
      pattern: {
        value:/^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/,
        message: "Name should be letters only."
      }

    }, surname: {
      required: "Surname is required",
      minLength: {
        value: 3,
        message: "Surname should be at-least 3 characters."
      }, maxLength: {
        value: 50,
        message: "Name should be at-max 50 characters.",
      }, pattern: {
        value: /[A-Za-z]{3}/,
        message: "Surname should be letters only."
      }

    },
    email: {
      required: "Email is required", pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "Email is not valid."
      }, maxLength: {
        value: 255,
        message: "Email should be at-max 255 characters.",
      }
    },
    dob: {
      required: "Date of birth is required",
      pattern: {
        value: /^\\d{4}-\\d{2}-\\d{2}$/,
        message: "Date of birth is format is YYYY-",
      }
    }
  };
  const onSubmit = async (data) => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {

      setLoading(true);
      axiosClient.post('/captach', captchaValue)
        .then(({ captchaResp }) => {
          var dob = data.dob;
          const formattedDate =
            `${dob.getFullYear()}-${dob.getMonth()}-${dob.getDate()}`;
          const payload = { name: data.name, surname: data.surname, email: data.email, dob: formattedDate };
          axiosClient.post('/users', payload)
            .then(({ data }) => {
              setLoading(false);
              setSuccessMsg("User registration is successful.");
              reset();
            })
            .catch(err => {
              const response = err.response;
              if (response && (response.status === 429 || response.status === 400 || response.status === 500)) {
                setError(response.data.errorMessage);
                setLoading(false);
              }
            })
        })
        .catch(err => {
          debugger;
          const response = err.response;
          if (response && (response.status === 429 || response.status === 400 || response.status === 500)) {
            setError(response.data.errorMessage);
            setLoading(false);
          }
        })

    }
  }
  if (loading) {
    return <div className="form-container">Loading...</div>;
  }



  return (
    <div className="form-container">
      <h2 className="form-title">Assignment Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage &&
          <div class="error-msg">
            <i class="fa fa-times-circle"></i>{errorMessage}</div>
        }
        {successMsg && <div class="success-msg">
          <i class="fa fa-check"></i>{successMsg}</div>}
        <div className="form-control">
          <label className="form-label">Email<font className="required">*</font></label>
          <input type="text" className="form-input" name="email" {...register("email", registerOptions.email)} size="255"/>
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label className="form-label">Name<font className="required">*</font></label>
          <input type="text" className="form-input" name="name" {...register("name", registerOptions.name)} size="50"/>
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        <div className="form-control">
          <label className="form-label">Surname<font className="required">*</font></label>
          <input type="text" className="form-input" name="surname" {...register("surname", registerOptions.surname)} size="50"/>
          {errors.surname && <p className="error-message">{errors.surname.message}</p>}
        </div>
        <div className="form-control">
          <label className="form-label">Date of Birth<font className="required">*</font></label>
          <Controller
            control={control}
            name='dob'
            rules={registerOptions.dob}
            render={({ field }) => (
              <DatePicker name="dob" control={control} showIcon toggleCalendarOnIconClick onKeyDown={(e) => {
                e.preventDefault();
              }}
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                dateFormat="YYYY-MM-dd"
                showYearDropdown
                showMonthDropdown className="form-input"
                yearDropdownItemNumber={100}
                minDate={moment().subtract(100, "years")._d}
                maxDate={moment().subtract(18, "years")._d}
                scrollableYearDropdown scrollableMonthDropdown />)}
          />

          {errors.dob && <p className="error-message">{errors.dob.message}</p>}
        </div>
        <div className="form-control">
          <label></label>
          <ReCAPTCHA ref={recaptcha} sitekey={SITE_KEY} />
        </div>
        <div className="form-control">
          <label></label>
          <button className="submit-button" type="submit">Submit</button>
        </div>
     
      </form>
    </div>
  );
}
export default App