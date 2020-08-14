import React, { Component } from "react";
import { CardWrapper, ContentWrapper, GraphWrapper } from "./style";
import SectionHeader from "../../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";

export default class SummaryCard extends Component {
    render() {
        return (
            <CardWrapper>
                <SectionHeader small title={this.props.title} />
                <ContentWrapper>
                    <GraphWrapper>
                        <span>{this.props.count}</span>
                    </GraphWrapper>
                </ContentWrapper>
            </CardWrapper>
        );
    }
}
