import React from "react"
import styled from "styled-components"

const Tag = styled.section`
    position: relative;
    width: 120px;
    height: 40px;
    padding: 5px;
    margin: 5px;
`
const TagText = styled.button`
    position: absolute;
    left:0;
    width: 110px;
    height: 30px;
    background: #B0CAC7;
    border-radius: 40px;
    border: none;
    text-align: left;
    font-family: Roboto;
`
const DeleteButton = styled.button`
    position: absolute;
    z-index: 1;
    background: #318FB5;
    border-radius: 40px;
    width: 30px;
    height: 30px;
    border: none;
    left: 80px;
    color: #FFF9F4;
    &:hover {
        width: 32px;
        height: 32px;
    }
`

export default function TagButton ({ tag, removeButtonText, onDelete }){
    return(
        <Tag>
            <DeleteButton type="button" onClick={onDelete}>x</DeleteButton>
            <TagText type='button' title={removeButtonText} >
                {tag.name.length > 10 ? tag.name.slice(0,10).concat("..."): tag.name}
                </TagText>
        </Tag>
    )
}
