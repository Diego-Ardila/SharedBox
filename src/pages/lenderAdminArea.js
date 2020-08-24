import React from "react"
import styled from "styled-components"

const base = {
    mainClass : "lenderAdminArea",
    titleGridArea: "SpaceTitle",
    mainViewGridArea: "MainSpace",
    whiteGridArea: "WhiteSpace",
    spaceCardGridArea: "SpaceCard"
}

export default function LenderAdminArea () {
    <div className={base.mainClass}>
        <div style= {{grid: base.titleGridArea}}></div>
        <div style= {{grid:base.mainViewGridArea}}></div>
        <div style= {{grid: base.whiteGridArea}}></div>
        <div style= {{grid: base.spaceCardGridArea}}></div>
    </div>
}