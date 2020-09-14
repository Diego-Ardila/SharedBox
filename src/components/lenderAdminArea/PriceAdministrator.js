import React, {useState} from "react"
import { tax, services } from "../../utils/FinanceVariables"
import { Card, Button } from "react-bootstrap"
import NumberFormat from "react-number-format"
import ModalInventory from "../Inventory/inventoryModal"

const calcFinalPrice = ( basePrice, tax, services ) => {
    return {
        taxes: basePrice * tax,
        services: basePrice * services,
        finalPrice: basePrice * (1 + (tax + services))
    }
}

export default function PriceAdministrator ({space, startDate, endDate, setShowModalInventory}) {
    const daysToPay = endDate.diff(startDate,"days") + 1
    const basePrice = daysToPay * space.pricePerDay
    const finalPrices = calcFinalPrice(basePrice, tax, services)
   
    return(
        <React.Fragment>
            <div className="sticky-top pt-3">
            <Card bg="secondary" text="white" className="text-center">
            <Card.Header as="h5">PRICE</Card.Header>
            <Card.Body>
                <Card.Text>
                    {`reservation for ${daysToPay} days`}
                </Card.Text>
                <Card.Text>
                    {`price per day `}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={space.pricePerDay}/>
                </Card.Text>
                <Card.Text>
                    {`base price.......`}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={basePrice}/>
                </Card.Text>
                <Card.Text>
                    {`+ taxes...............`}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={finalPrices.taxes}/>
                </Card.Text>
                <Card.Text>
                    {`+ services..............`}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={finalPrices.services}/>
                </Card.Text>
                <Card.Title>
                    {`TOTAL: `}<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={finalPrices.finalPrice}/>
                </Card.Title>
                <Button onClick={()=> setShowModalInventory(true)} >Reserve this space!!</Button>
            </Card.Body>
            </Card>
            </div>
        </React.Fragment>
    )
}