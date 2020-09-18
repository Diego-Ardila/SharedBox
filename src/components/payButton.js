import React from "react"
import { Button } from "react-bootstrap"
import { BagCheck } from "react-bootstrap-icons"

export default function PayButton ({finalPrice, tax, tax_base, spaceTitle, tenantName, tenantPhoneNum}) {
    const handlePayment= () => {
        const paymentHandler = window.ePayco.checkout.configure({
        key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
        test: true
        })
        paymentHandler.open({
            external: 'true',
            amount: finalPrice,
            tax,
            tax_base,
            name: 'SharedBox',
            description: spaceTitle,
            currency: 'cop',
            country: 'CO',
            lang: 'en',
            invoice: '12345',
            extra1: 'extra1',
            extra2: 'extra2',
            extra3: 'extra3',
            response: `${process.env.REACT_APP_SERVER_URL}/response`,
            autoclick: 'false',
            name_billing: tenantName,
            type_doc_billing: 'cc',
            mobilephone_billing: tenantPhoneNum,
        })
    }
    return (
        <Button onClick={handlePayment}>pay<BagCheck></BagCheck></Button>
    )

}





  