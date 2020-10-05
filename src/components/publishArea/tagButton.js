import React from "react"
import styled from "styled-components"

const Tag = styled.section`
    position: relative;
    width: 120px;
    height: 40px;
    padding: 5px;
    margin-bottom: 2px;
`
const TagText = styled.button`
    position: absolute;
    color: white;
    left:0;
    width: 110px;
    height: 30px;
    background: #B0CAC7;
    border-radius: 30px;
    border: none;
    text-align: left;
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: .9rem;
`
const DeleteButton = styled.button`
    position: absolute;
    z-index: 1;
    background: #318FB5;
    border-radius: 30px;
    width: 30px;
    height: 30px;
    border: none;
    left: 80px;
    color: #FFF9F4;
    text-align: center;
    transition: all .3s ease-in;
    &:hover {
        transform: translateY(-5px);
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
