import React from "react";
import styled from "styled-components";
import Select from "react-select";

import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";

const StyledInput = styled(Input)`
  width: ${(props) => props.width || "23rem"};
`;

const FormStepOne = (props) => {
  const { formik } = props;
  const [jobPositions, setJobPositions] = React.useState([]);

  const handleOnJobPositionChange = (props) => {
    formik.setFieldValue("positionId", props.value);
  };

  const handleOnJobPositionBlur = () => {
    formik.setFieldTouched("positionId", true);
  };

  React.useEffect(() => {
    const getPositions = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_DEVELOPSIO_API}/position`
      );
      const data = await result.json();
      const newJobPositions = data.map((jobPosition) => {
        return { label: jobPosition.name, value: jobPosition.id };
      });
      setJobPositions(newJobPositions);
      if (formik.values.positionId === "") {
        formik.setFieldValue("positionId", newJobPositions[0].value);
      }
    };
    if (jobPositions.length === 0) {
      getPositions();
    }
  }, [jobPositions.length]);

  return (
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
          value={
            jobPositions.find(
              (jobPosition) => jobPosition.value === formik.values.positionId
            ) ||
            jobPositions[0] ||
            null
          }
          placeholder=""
          onChange={handleOnJobPositionChange}
          onBlur={handleOnJobPositionBlur}
        />
      </FormControl>
    </>
  );
};

export default FormStepOne;
