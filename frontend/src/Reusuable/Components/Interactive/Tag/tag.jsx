import React, { Component } from "react";
import { TagContainer, TagLabel, TagCloseBtn } from "./styles";

class Tag extends Component {
    state = {};
    render() {
        let props = {
            length: this.props.length,
            index: this.props.tag.id,
            view: this.props.view,
            small: this.props.small,
        };

        return (
            <TagContainer {...props}>
                <TagLabel small={this.props.small}>
                    {this.props.tag.label}
                </TagLabel>
                {!this.props.view ? (
                    <TagCloseBtn
                        small={this.props.small}
                        onClick={this.props.handleCloseBtnClick}
                    />
                ) : null}
            </TagContainer>
        );
    }
}

export default Tag;
