import React, {useState} from 'react';
import Form from '../components/FAQ/faq.Form';
import Rendericer from '../components/FAQ/faq.rendericer'


export default function FrequentAskedQuestions () {

    let [faqs , setFaqs] = useState([])

    const handleNewFaq = (faq) => {
        let newFaq = {
            id: faqs.length + 1,
            ...faq
        }
        setFaqs(faqs = faqs.concat(newFaq),console.log(newFaq))
        console.log(faqs)
    }

    const deleteFaq = (id) =>{
       return () => {
           let newFaqs = faqs.filter(faq=>{
                return faq.id !== id
            })
           setFaqs(newFaqs)
              } 
       
    } 

    return (
        <div>
            <Form handleNewFaq={handleNewFaq} />
            <Rendericer faqs={faqs} deleteFaq= {deleteFaq} />
        </div>
    )
}

