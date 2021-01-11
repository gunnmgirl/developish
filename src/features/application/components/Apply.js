import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import Button from "../../../components/Button";
import Logo from "../../components/Logo";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";

const StyledButton = styled(Button)`
  width: 10rem;
  margin: 1rem 0;
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
  const [callCode, setCallCode] = React.useState("");

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
    const wholePhoneNumber = callCode.concat(formik.values.phoneNumber);
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

  const changeCallCode = (code) => {
    setCallCode(code);
  };

  const getCallCode = () => {
    return callCode;
  };

  React.useEffect(() => {
    formik.setTouched({});
  }, []);

  return (
    <MainContainer>
      <Logo large secondary="true" />
      <StyledForm onSubmit={formik.handleSubmit} enctype="multipart/form-data">
        <MainWrapper>
          {step === 1 && <FormStepOne formik={formik} />}
          {step === 2 && (
            <FormStepTwo
              formik={formik}
              changeCallCode={changeCallCode}
              getCallCode={getCallCode}
            />
          )}
          {step === 3 && <FormStepThree formik={formik} />}
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
