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

const StyledInput = styled(Input)`
  width: ${(props) => props.width || "23rem"};
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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 23rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 4px;
`;

const FlagIcon = styled.div`
  height: 1.8rem;
  width: 3rem;
  background-image: url(${(props) => props.icon});
  background-size: cover;
  background-position: center;
  margin: 0 0.4rem;
  border-radius: 4px;
`;

const stepOneValidation = Yup.object().shape({
  firstName: Yup.string().required("First name is required!"),
  lastName: Yup.string().required("Last name is required!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Must be a valid email!"),
});

const stepTwoValidation = Yup.object().shape({
  city: Yup.string().required("City is required!"),
  streetAddress: Yup.string().required("Street address is required!"),
  phoneNumber: Yup.number()
    .typeError("Must be a number")
    .required("Phone number is required!"),
});

function getValidationSchema(step) {
  switch (step) {
    case 1:
      return stepOneValidation;
    case 2:
      return stepTwoValidation;
    default:
      return null;
  }
}

const Apply = () => {
  const [step, setStep] = React.useState(1);
  const [validationSchema, setValidationSchemas] = React.useState(
    stepOneValidation
  );
  const [flag, setFlag] = React.useState(null);
  const [countries, setCountries] = React.useState([]);
  const [countryInfo, setCountryInfo] = React.useState(null);
  const [callingCode, setCallingCode] = React.useState("");

  const jobPositions = [
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
      country: "",
      city: "",
      streetAddress: "",
      phoneNumber: "",
      skype: "",
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

  const handleOnCountryChange = (props) => {
    formik.setFieldValue("country", props.value);
    const country = countryInfo.find((country) => country.name === props.label);
    setCallingCode(country.callingCodes[0]);
    setFlag(country.flag);
  };

  React.useEffect(() => {
    const getCountries = async () => {
      const result = await fetch(process.env.REACT_APP_COUNTRIES);
      const data = await result.json();
      const newCountries = data.map((country) => {
        return { value: country.alpha3Code, label: country.name };
      });
      setCountryInfo(data);
      setCountries(newCountries);
    };
    if (step === 2) {
      getCountries();
    }
  }, [step]);

  return (
    <MainContainer>
      <Logo large secondary="true" />
      <StyledForm onSubmit={formik.handleSubmit}>
        {step === 1 && (
          <>
            <FormControl label="First Name" caption={formik.errors.firstName}>
              <StyledInput
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </FormControl>
            <FormControl label="Last Name" caption={formik.errors.lastName}>
              <StyledInput
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </FormControl>
            <FormControl label="Email" caption={formik.errors.email}>
              <StyledInput
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl label="Job Position">
              <Select
                name="jobPosition"
                defaultValue={
                  jobPositions && jobPositions.length ? jobPositions[0] : {}
                }
                options={jobPositions}
                onChange={handleOnJobPositionChange}
              />
            </FormControl>
          </>
        )}
        {step === 2 && (
          <>
            <FormControl label="Country" caption={formik.errors.country}>
              <Select
                name="country"
                options={countries}
                onChange={handleOnCountryChange}
              />
            </FormControl>
            <Wrapper>
              <FormControl label="City" caption={formik.errors.city}>
                <StyledInput
                  width="11rem"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
              </FormControl>
              <FormControl
                label="Street Address"
                caption={formik.errors.streetAddress}
              >
                <StyledInput
                  width="11rem"
                  name="streetAddress"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.streetAddress}
                />
              </FormControl>
            </Wrapper>
            <FormControl
              label="Phone Number"
              caption={formik.errors.phoneNumber}
            >
              <Wrapper>
                <Container>
                  <span>{callingCode}</span>
                  <FlagIcon icon={flag}></FlagIcon>
                </Container>
                <StyledInput
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  width="16rem"
                />
              </Wrapper>
            </FormControl>
            <FormControl label="Skype">
              <StyledInput
                name="skype"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.skype}
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
};

export default Apply;
