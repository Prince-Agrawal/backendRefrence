import React from "react";
import {
    ScreenerWrapper,
    Label,
    InputWrapper,
    MainWrapper,
    TagWrapper,
} from "./style";
import Textfield from "../../Components/Interactive/inputs/text-field/text-field";
import Tag from "../../Components/Interactive/Tag/tag";

export default function IntelligentScreener(props) {
    return (
        <MainWrapper>
            <ScreenerWrapper>
                <Label heading bold>
                    INTELLIGENT SCREENING
                </Label>
                <InputWrapper>
                    {props.screens.map((screen, index) => (
                        <Textfield
                            textfield={screen}
                            handleFieldBtnClick={() =>
                                props.addTag(index, "screens")
                            }
                            handleInputValueChange={(event) =>
                                props.textfieldChange(event, "screens", index)
                            }
                            handleKeyPress={(event) =>
                                props.textfieldKeyPress(event, "screens", index)
                            }
                        />
                    ))}
                </InputWrapper>
            </ScreenerWrapper>
            <TagWrapper>
                {props.tags.map((tag, i, a) => (
                    <Tag
                        key={i}
                        length={a.length}
                        tag={{
                            id: i,
                            label: tag,
                        }}
                        handleCloseBtnClick={() =>
                            props.removeTag(null, "screens", i)
                        }
                        small
                    />
                ))}
            </TagWrapper>
        </MainWrapper>
    );
}
