import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import FrequentAskedQuestionsForm  from './faq.Form'
import moxios from "moxios"

describe("U-FAQ form", () => {
    beforeEach(()=>{
        moxios.install()
        cleanup()
    })
    
    afterEach(() => {
        moxios.uninstall()
        cleanup()
    })

    it("should create a new FAQ and send it to the server", (done) => {
        const faqs = [
            {
                question: "test 1",
                answer: "test 1a"
            }
        ]

        const newFaq = {
            question: "test 2",
            answer:"test 2a"
        }

        const handleNewFaq = function(faq) {
            faqs.push(faq)
        }

        const hideEditFAQ = jest.fn()
        const spaceID = "space1"
        const { getByLabelText, getByText, debug } = render(<FrequentAskedQuestionsForm
            handleNewFaq ={handleNewFaq}
            hideEditFAQ = {hideEditFAQ}
            spaceId = {spaceID}
            faqs = {faqs}
            ></FrequentAskedQuestionsForm>)
        
        const questionInput = getByLabelText(/question/i)
        fireEvent.change(questionInput, {
            target: {
              value: newFaq.question,
              name: "question"
            }
        }); 

        const answerInput = getByLabelText(/answer/i)
        fireEvent.change(answerInput, {
            target: {
              value: newFaq.answer,
              name: "response"
            }
        });
        
        const createButton = getByText(/create/i)
        fireEvent.click(createButton)

        const submitButton = getByText(/submit/i)
        fireEvent.click(submitButton)

        moxios.wait(() => {
            const req = moxios.requests.mostRecent();
            expect(req.config.method).toEqual("post")
            const arrReq = JSON.parse(req.config.data)
            expect(arrReq[1]).toMatchObject({...newFaq, spaceID})
            expect(arrReq).toHaveLength(2)
            req.respondWith({
              status: 200,
              response: {...newFaq, spaceID},
            }).then(()=> done())
        })  
    })
})