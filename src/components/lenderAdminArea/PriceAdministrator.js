import React from "react"
import { calcPrices } from "../../utils/FinanceVariables"
import { Card, Button } from "react-bootstrap"
import NumberFormat from "react-number-format"


export default function PriceAdministrator ({space, startDate, endDate, setShowModalInventory}) {
    const finalPrices = calcPrices(startDate, endDate, space.pricePerDay)
    return(
        <React.Fragment>
            <div className="sticky-top pt-3">
            <Card bg="secondary" text="white" className="text-center">
            <Card.Header as="h5">Price</Card.Header>
            <Card.Body>
                <Card.Text>
                    {`Reservation for ${finalPrices.daysToPay} days`}
                </Card.Text>
                <Card.Text>
                    {`Price per day `}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={space.pricePerDay}/>
                </Card.Text>
                <Card.Text>
                    {`Base price          `}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={finalPrices.basePrice}/>
                </Card.Text>
                <Card.Text>
                    {`+ Taxes             `}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={finalPrices.taxes}/>
                </Card.Text>
                <Card.Text>
                    {`+ Services          `}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={finalPrices.serviceExp}/>
                </Card.Text>
                <Card.Title>
                    {`Total: `}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={finalPrices.finalPrice}/>
                </Card.Title>
                <Button onClick={()=> setShowModalInventory(true)} >Reserve this space!!</Button>
            </Card.Body>
            </Card>
            </div>
        </React.Fragment>
    )
}