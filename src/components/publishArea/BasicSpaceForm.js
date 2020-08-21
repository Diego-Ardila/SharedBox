import React from "react"
import { useFormik } from "formik"
import styled from "styled-components"


const base = {
    widthId: "width",
    lengthId: "length",
    heightId: "height",
    pricePerDayId: "pricePerDay",
    spaceTagsId: "spaceTags",
    locationCityId: "locationCity",
    locationAddressId: "locationAddress",
    additionalInfoId: "additionalInfo",
    formClass : "space_form",
    submitId : "space_submit"
}

const FormWrapper = styled.section`
    background: linear-gradient(180deg, #FFF9F4 1.12%, #B0CAC7 100%);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -4px -8px 2px rgba(248, 239, 239, 0.25);
    width: 528px;
    height: 701px;
    left: 74px;
    top: 133px;
    display: flex ;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-weight: bold;
`
const InputField = styled.input`
    width: 310px;
    height: 43px;
    left: 455px;
    top: 682px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -4px -8px 2px rgba(248, 239, 239, 0.25);
    background: #318FB5;
    opacity: 0.4;
    border-radius: 40px;
    text-align: center;
    margin: 10px;
`
const NextButton = styled.button`
    background: #001244;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -2px -4px 2px rgba(243, 240, 240, 0.4);
    width: 155px;
    height: 43px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    color: #FFF9F4;
    margin: 24px;
`

const initialValues = {}
Object.values(base).forEach( key => initialValues[key] = "")

export default function BasicSpaceInfo (props){

    const onSubmit = (values) => {
        //axios call pending
        console.log(values)
    }

    const formik = useFormik({initialValues, onSubmit})
    
    return(
        
        <FormWrapper>
        <form className = {base.formClass} onSubmit = {formik.handleSubmit}>  
            <label htmlFor ={base.widthId}>width: area´s width of your space in Mts</label>
            <br></br>
            <InputField 
                id = {base.widthId}
                name = {base.widthId}
                type = "number"
                onChange = {formik.handleChange}
                value = {formik.values[base.widthId]}
                min = {0}
            ></InputField>
            <br></br>

            <label htmlFor ={base.lengthId}>length: area´s length area of your space in Mts</label>
            <br></br>
            <InputField 
                id = {base.lengthId}
                name = {base.lengthId}
                type = "number"
                onChange = {formik.handleChange}
                value = {formik.values[base.lengthId]}
            ></InputField>
            <br></br>

            <label htmlFor ={base.heightId}>height: area´s height of your space in Mts</label>
            <br></br>
            <InputField 
                id = {base.heightId}
                name = {base.heightId}
                type = "number"
                onChange = {formik.handleChange}
                value = {formik.values[base.heightId]}
            ></InputField>
            <br></br>

            <label htmlFor ={base.pricePerMeterPerDayId}>how much do you espect to earn per day</label>
            <br></br>
            <InputField 
                id = {base.pricePerMeterPerDayId}
                name = {base.pricePerMeterPerDayId}
                type = "number"
                onChange = {formik.handleChange}
                value = {formik.values[base.pricePerMeterPerDayId]}
            ></InputField>
            <br></br>

            <label htmlFor ={base.locationCityId}>location: city of the space</label>
            <br></br>
            <InputField 
                id = {base.locationCityId}
                name = {base.locationCityId}
                type = "text"
                onChange = {formik.handleChange}
                value = {formik.values[base.locationCityId]}
            ></InputField>
            <br></br>

            <label htmlFor ={base.locationAddressId}>location: address of the space</label>
            <br></br>
            <InputField 
                id = {base.locationAddressId}
                name = {base.locationAddressId}
                type = "text"
                onChange = {formik.handleChange}
                value = {formik.values[base.locationAddressId]}
            ></InputField>
            <br></br>

            <NextButton type="submit" id={base.submitId} value="submit">next</NextButton>

        </form>
        </FormWrapper>
    )
}
