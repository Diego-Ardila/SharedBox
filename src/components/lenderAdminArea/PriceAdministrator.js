import React from "react"
import { tax, services } from "../../utils/FinanceVariables"


export default function PriceAdministrator ({space, startDate, endDate}) {
    
    const getDaysToPay = (startDate, endDate) =>{
        return endDate.diff(startDate,"days") + 1
    }

    const calcBasePrice = (days, price) => {
        return `${days*price}`
    }

    const calcFinalPrice = ( basePrice, tax, services ) => {
        return {
            taxes: basePrice * tax,
            services: basePrice * services,
            finalPrice: basePrice * (tax + services)
        }
    }
    const testingContent = () => {
        console.log(startDate)
        console.log(endDate)
        return <h1>{getDaysToPay(startDate,endDate)}</h1>
    }

    return(
        <React.Fragment>
           
        </React.Fragment>
    )
}