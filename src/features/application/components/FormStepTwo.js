import React from "react";
import styled from "styled-components";
import Select from "react-select";

import FormControl from "../../../components/FormControl";
import Input from "../../../components/Input";

const FlagIcon = styled.div`
  height: 1.8rem;
  width: 3rem;
  background-image: url(${(props) => props.icon});
  background-size: cover;
  background-position: center;
  margin: 0 0.4rem;
  border-radius: 4px;
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

const StyledInput = styled(Input)`
  width: ${(props) => props.width || "23rem"};
`;

const FormStepTwo = (props) => {
  const { formik, changeCallCode, getCallCode } = props;
  const [countries, setCountries] = React.useState([]);
  const [countryInfo, setCountryInfo] = React.useState(null);
  const [flag, setFlag] = React.useState(null);

  const handleOnCountryChange = (props) => {
    formik.setFieldValue("country", props.value);
    const country = countryInfo.find((country) => country.name === props.label);
    changeCallCode(country.callingCodes[0]);
    setFlag(country.flag);
  };

  const handleOnCountryBlur = () => {
    formik.setFieldTouched("country", true);
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
    if (countries.length === 0) {
      getCountries();
    }
    formik.setTouched({});
  }, [countries.length]);

  return (
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
          caption={formik.touched.streetAddress && formik.errors.streetAddress}
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
        caption={formik.touched.phoneNumber && formik.errors.phoneNumber}
      >
        <Wrapper>
          <Container>
            <FlagIcon icon={flag}></FlagIcon>
            <span>{getCallCode()}</span>
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
  );
};

export default FormStepTwo;
