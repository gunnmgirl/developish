import React from "react";
import styled from "styled-components";

import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";

const StyledInput = styled(Input)`
  width: ${(props) => props.width || "23rem"};
`;

const StyledTextarea = styled(Textarea)`
  width: 100%;
  height: 5rem;
`;

const FormStepThree = (props) => {
  const { formik } = props;

  const handleOnImageUploadChange = async (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("imageFile", file);
  };

  React.useEffect(() => {
    formik.setTouched({});
  }, []);

  return (
    <>
      <FormControl
        label="Previous Positions"
        caption={
          formik.touched.previousPositions && formik.errors.previousPositions
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
  );
};

export default FormStepThree;
