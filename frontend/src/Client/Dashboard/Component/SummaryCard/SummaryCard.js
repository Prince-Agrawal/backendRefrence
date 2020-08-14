import React from 'react'
import { SummaryCardWrapper, DataWrapper, Count, Label } from './style'

export default function SummaryCard(props) {
    return (
        <SummaryCardWrapper>
            <DataWrapper>
                <Count>
                    {props.count}
                </Count>
                <Label>
                    {props.label}
                </Label>
            </DataWrapper>
        </SummaryCardWrapper>
    )
}
