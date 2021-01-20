import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../../components/Button";
import Logo from "../../components/Logo";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import Spinner from "../../components/Spinner";

const StyledButton = styled(Button)`
  width: 10rem;
  margin: 1rem 0;
`;

const StyledForm = styled.form`
  width: 30rem;
  min-height: 64%;
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
  height: 100vh;
  background-color: ${(props) => props.theme.primary};
  @media (min-width: 768px) {
    background-color: ${(props) => props.theme.ternary};
  }
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
  const [flag, setFlag] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();

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

  const notify = (message, type) => {
    switch (type) {
      case "error":
        toast.error(message);
        break;
      case "success":
        toast.success(message);
        break;
      default:
        toast(message);
    }
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
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_DEVELOPSIO_API}/auth/signup`,
      {
        method: "POST",
        body: formData,
      }
    );
    setLoading(false);
    if (response.ok) {
      notify("Your job application form was submitted successfully", "success");
      history.push("/");
    } else {
      const errorText = await response.text();
      notify(errorText || "Something went wrong, please try again", "error");
    }
  };

  const changeCallCode = (code) => {
    setCallCode(code);
  };

  const getFlag = () => {
    return flag;
  };

  const changeFlag = (flag) => {
    setFlag(flag);
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
              changeFlag={changeFlag}
              getFlag={getFlag}
            />
          )}
          {step === 3 && <FormStepThree formik={formik} />}
          {loading ? (
            <Spinner />
          ) : (
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
          )}
        </MainWrapper>
      </StyledForm>
    </MainContainer>
  );
};

export default Apply;
