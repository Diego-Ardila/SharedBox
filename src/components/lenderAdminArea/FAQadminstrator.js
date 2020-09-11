import React, { useState } from "react"
import { Card, Accordion } from "react-bootstrap"

export default function FAQadministrator({ space }) {
    const [FAQarr] = useState( space.faqs )

    return (
        <React.Fragment>
            {(FAQarr.length === 0) ? null : (
                <Card>
                    <Card.Header>FAQs</Card.Header>
                    <Card.Body>
                    <Accordion>
                        {FAQarr.map((faq, index) => (                            
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={toString(index)}>
                                        {faq.question}
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={toString(index)}>
                                     <Card.Body>{faq.answer}</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                        ))}
                    </Accordion>
                    </Card.Body>
                </Card>
            )
            }
        </React.Fragment>
    )
}