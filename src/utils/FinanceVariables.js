
export const tax = 0.19
export const services = 0.25

export const calcPrices = ( startDate, endDate, pricePerDay ) => {
    const daysToPay = endDate.diff(startDate,"days") + 1
    const basePrice = daysToPay * pricePerDay
    const serviceExp = basePrice * services
    const tax_base = basePrice + serviceExp
    const taxes = tax_base * tax
    const finalPrice = tax_base + taxes
    return {
        daysToPay,
        basePrice,
        serviceExp,
        tax_base,
        taxes,
        finalPrice,
    }
}