import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Logo from "../../components/Logo";
import Textarea from "../../../components/Textarea";

const StyledButton = styled(Button)`
  width: 10rem;
  margin: 1rem 0;
`;

const StyledInput = styled(Input)`
  width: ${(props) => props.width || "23rem"};
`;

const StyledTextarea = styled(Textarea)`
  width: 100%;
  height: 5rem;
`;

const StyledForm = styled.form`
  width: 30rem;
  background-color: ${(props) => props.theme.primary};
  display: flex;
  justify-content: center;
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

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 23rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  positionId: Yup.string().required("Job position is required!"),
});

const stepTwoValidation = Yup.object().shape({
  country: Yup.string().required("Country is required!"),
  city: Yup.string().required("City is required!"),
  streetAddress: Yup.string().required("Street address is required!"),
  phoneNumber: Yup.number()
    .typeError("Must be a number")
    .required("Phone number is required!"),
});

const stepThreeValidation = Yup.object().shape({
  previousPositions: Yup.string().required("This field is required!"),
});

function getValidationSchema(step) {
  switch (step) {
    case 1:
      return stepOneValidation;
    case 2:
      return stepTwoValidation;
    case 3:
      return stepThreeValidation;
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
  const [jobPositions, setJobPositions] = React.useState([]);
  const [countryInfo, setCountryInfo] = React.useState(null);
  const [callingCode, setCallingCode] = React.useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      positionId: "",
      country: "",
      city: "",
      streetAddress: "",
      phoneNumber: "",
      skype: "",
      previousPositions: "",
      imageFile: null,
    },
    onSubmit: () => {},
    validationSchema,
  });

  const handleOnJobPositionChange = (props) => {
    formik.setFieldValue("positionId", props.value);
  };

  const handleOnJobPositionBlur = () => {
    formik.setFieldTouched("positionId", true);
  };

  const handleOnCountryChange = (props) => {
    formik.setFieldValue("country", props.value);
    const country = countryInfo.find((country) => country.name === props.label);
    setCallingCode(country.callingCodes[0]);
    setFlag(country.flag);
  };

  const handleOnCountryBlur = () => {
    formik.setFieldTouched("country", true);
  };

  const handleOnImageUploadChange = async (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("imageFile", file);
  };

  const handleBackButton = () => {
    const newStep = step - 1;
    const newValidationSchema = getValidationSchema(newStep);
    setStep(newStep);
    setValidationSchemas(newValidationSchema);
  };

  const handleContinueButton = () => {
    const newStep = step + 1;
    const newValidationSchema = getValidationSchema(newStep);
    setStep(newStep);
    setValidationSchemas(newValidationSchema);
  };

  const handleApplyButton = async () => {
    const wholePhoneNumber = callingCode.concat(formik.values.phoneNumber);
    const formData = new FormData();
    formData.append("file", formik.values.imageFile);
    formData.append("firstName", formik.values.firstName);
    formData.append("lastName", formik.values.lastName);
    formData.append("email", formik.values.email);
    formData.append("positionId", formik.values.positionId);
    formData.append("country", formik.values.country);
    formData.append("city", formik.values.city);
    formData.append("streetAddress", formik.values.streetAddress);
    formData.append("phoneNumber", wholePhoneNumber);
    formData.append("skype", formik.values.skype);
    formData.append("previousPositions", formik.values.previousPositions);

    const response = await fetch(
      `${process.env.REACT_APP_DEVELOPSIO_API}/auth/signup`,
      {
        method: "POST",
        body: formData,
      }
    );
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
    const getPositions = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_DEVELOPSIO_API}/position`
      );
      const data = await result.json();
      const newJobPositions = data.map((jobPosition) => {
        return { label: jobPosition.name, value: jobPosition.id };
      });
      setJobPositions(newJobPositions);
    };
    if (step === 2 && countries.length === 0) {
      getCountries();
    }
    if (step === 1 && jobPositions.length === 0) {
      getPositions();
    }
    formik.setTouched({});
  }, [step]);

  return (
    <MainContainer>
      <Logo large secondary="true" />
      <StyledForm onSubmit={formik.handleSubmit} enctype="multipart/form-data">
        <MainWrapper>
          {step === 1 && (
            <>
              <FormControl
                label="First Name"
                caption={formik.touched.firstName && formik.errors.firstName}
              >
                <StyledInput
                  type="text"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
              </FormControl>
              <FormControl
                label="Last Name"
                caption={formik.touched.lastName && formik.errors.lastName}
              >
                <StyledInput
                  type="text"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
              </FormControl>
              <FormControl
                label="Email"
                caption={formik.touched.email && formik.errors.email}
              >
                <StyledInput
                  type="text"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl
                label="Job Position"
                caption={formik.touched.positionId && formik.errors.positionId}
              >
                <Select
                  type="text"
                  name="positionId"
                  options={jobPositions}
                  value={jobPositions.find(
                    (jobPosition) =>
                      jobPosition.value === formik.values.positionId
                  )}
                  onChange={handleOnJobPositionChange}
                  onBlur={handleOnJobPositionBlur}
                />
              </FormControl>
            </>
          )}
          {step === 2 && (
            <>
              <FormControl
                label="Country"
                caption={formik.touched.country && formik.errors.country}
              >
                <Select
                  type="text"
                  name="country"
                  options={countries}
                  onChange={handleOnCountryChange}
                  onBlur={handleOnCountryBlur}
                  value={countries.find(
                    (country) => country.value === formik.values.country
                  )}
                />
              </FormControl>
              <Wrapper>
                <FormControl
                  label="City"
                  caption={formik.touched.city && formik.errors.city}
                >
                  <StyledInput
                    type="text"
                    width="11rem"
                    name="city"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                </FormControl>
                <FormControl
                  label="Street Address"
                  caption={
                    formik.touched.streetAddress && formik.errors.streetAddress
                  }
                >
                  <StyledInput
                    type="text"
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
                caption={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              >
                <Wrapper>
                  <Container>
                    <FlagIcon icon={flag}></FlagIcon>
                    <span>{callingCode}</span>
                  </Container>
                  <StyledInput
                    type="text"
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
                  type="text"
                  name="skype"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.skype}
                />
              </FormControl>
            </>
          )}
          {step === 3 && (
            <>
              <FormControl
                label="Previous Positions"
                caption={
                  formik.touched.previousPositions &&
                  formik.errors.previousPositions
                }
              >
                <StyledTextarea
                  resize="true"
                  type="text"
                  name="previousPositions"
                  onBlur={() => {
                    formik.setFieldTouched("previousPositions", true);
                  }}
                  value={formik.values.previousPositions}
                  onChange={formik.handleChange}
                ></StyledTextarea>
              </FormControl>
              <FormControl label="Upload Image">
                <StyledInput
                  name="imageFile"
                  type="file"
                  onChange={handleOnImageUploadChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
            </>
          )}
          <ButtonWrapper>
            {step > 1 && (
              <StyledButton type="button" onClick={handleBackButton}>
                Back
              </StyledButton>
            )}
            {step === 3 ? (
              <StyledButton
                type="button"
                onClick={() => {
                  formik.handleSubmit();
                  if (formik.isValid) {
                    handleApplyButton();
                  }
                }}
              >
                Apply!
              </StyledButton>
            ) : (
              <StyledButton
                type="button"
                onClick={() => {
                  formik.handleSubmit();
                  if (formik.isValid) {
                    handleContinueButton();
                  }
                }}
              >
                Continue
              </StyledButton>
            )}
          </ButtonWrapper>
        </MainWrapper>
      </StyledForm>
    </MainContainer>
  );
};

export default Apply;
