import React from "react"
import { Button } from "react-bootstrap"
import { BagCheck } from "react-bootstrap-icons"

export default function PayButton ({finalPrice, tax, tax_base, spaceTitle, tenantName, tenantPhoneNum, numDays, inDate, finDate, tenantId, spaceId, notification}) {
    const handlePayment= () => {
        const paymentHandler = window.ePayco.checkout.configure({
        key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
        test: true
        })
        paymentHandler.open({
            class: "epayco-button",
            external: 'false',
            amount: finalPrice,
            tax,
            tax_base,
            name: 'SharedBox',
            description: spaceTitle,
            currency: 'cop',
            country: 'CO',
            lang: 'es',
            invoice: `${tenantId}-${Math.random()*10000}`,
            extra1: `Reservation warehouse for ${numDays}`,
            extra2: `Initial Date: ${inDate}`,
            extra3: `Final Date: ${finDate}`,
            extra4: spaceId,
            extra5: tenantName,
            extra6: notification._id,
            response: `${process.env.REACT_APP_FRONT_URL}/response`,
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





  