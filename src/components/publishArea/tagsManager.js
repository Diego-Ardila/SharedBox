import React, {useEffect} from 'react';
import ReactTags from 'react-tag-autocomplete'
import TagButton from './tagButton';
import "./tagsManager.css"
import {useSelector, useDispatch} from "react-redux"
import {changeTags, changeSuggestions} from "../../actions/publishArea.actions"
import {getSuggestions} from "../../utils/HTTPrequests"

export default function TagManager () {
    
    const dispatch = useDispatch()

    const tags = useSelector(state => state.publishAreaReducer.tags)
    const suggestions = useSelector(state => state.publishAreaReducer.suggestions)


    useEffect( ()=>{
        async function getSuggestionsFromDb () {
            const baseSuggestions = await getSuggestions()
            dispatch(changeSuggestions(baseSuggestions))
        }
        getSuggestionsFromDb()
    }, [])
    
    
    const reactTags = React.createRef()

    const onDelete = (i) => {
        const newTags = tags.slice(0)
        newTags.splice(i, 1)
        console.log(newTags)
        dispatch(changeTags(newTags))
    }

    const onAddition = (tag) => {
        const newTags = [].concat(tags, {id: tags.length + 1, ...tag })
        dispatch(changeTags(newTags))
    }
 
    return (
        <ReactTags
        ref={reactTags}
        tags={tags}
        suggestions={suggestions}
        onDelete={onDelete}
        onAddition={onAddition}
        tagComponent ={TagButton}
        autoresize= {false}
        allowNew ={true} />
    )
}
