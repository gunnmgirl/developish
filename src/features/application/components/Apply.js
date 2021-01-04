import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Logo from "../../components/Logo";

const StyledButton = styled(Button)`
  width: 20rem;
  margin: 1rem 0;
`;

const StyledForm = styled.form`
  width: 30rem;
  background-color: ${(props) => props.theme.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  border-radius: 8px;
  padding: 1rem 0;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.ternary};
`;

const stepOneValidation = Yup.object().shape({
  firstName: Yup.string().required("First name is required!"),
  lastName: Yup.string().required("Last name is required!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Must be a valid email!"),
});

function getValidationSchema(step) {
  switch (step) {
    case 1:
      return stepOneValidation;
    default:
      return null;
  }
}

function Apply() {
  const [step, setStep] = React.useState(1);
  const [validationSchema, setValidationSchemas] = React.useState(
    stepOneValidation
  );
  const options = [
    { value: "fullStackDeveloper", label: "Full Stack Developer" },
    { value: "uiDesigner", label: "UI Designer" },
    { value: "uxDesigner", label: "UX Designer" },
    { value: "backEndDeveloper", label: "Back-end Developer" },
    { value: "projectMenager", label: "Project Menager" },
    { value: "mobileDeveloper", label: "Mobile Developer" },
    { value: "dataScientist", label: "Data Scientist" },
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      jobPosition: "",
    },
    onSubmit: ({ resetForm }) => {
      if (step === 3) {
        //api call
        resetForm();
      } else {
        const newStep = step + 1;
        const newValidationSchema = getValidationSchema(newStep);
        setStep(newStep);
        setValidationSchemas(newValidationSchema);
      }
    },
    validationSchema,
  });

  const handleOnJobPositionChange = (props) => {
    formik.setFieldValue("jobPosition", props.value);
  };

  return (
    <MainContainer>
      <Logo large secondary="true" />
      <StyledForm onSubmit={formik.handleSubmit}>
        {step === 1 && (
          <>
            <FormControl label="First Name" caption={formik.errors.firstName}>
              <Input
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </FormControl>
            <FormControl label="Last Name" caption={formik.errors.lastName}>
              <Input
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </FormControl>
            <FormControl label="Email" caption={formik.errors.email}>
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl label="Job Position">
              <Select
                name="jobPosition"
                defaultValue={options[0]}
                options={options}
                onChange={handleOnJobPositionChange}
              />
            </FormControl>
          </>
        )}
        <StyledButton type="submit" onClick={formik.handleSubmit}>
          {step === 3 ? "Apply!" : "Continue"}
        </StyledButton>
      </StyledForm>
    </MainContainer>
  );
}

export default Apply;
