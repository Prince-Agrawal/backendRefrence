import React from 'react'
import {CandidateModalTools,CandidateModalTopbar,Label} from './style';
import SelectBoxHorizontal from "../../../../../../Reusuable/Components/Interactive/SelectBoxHorizontal/SelectBoxHorizontal";
import TertiaryButton from "../../../../../../Reusuable/Components/Interactive/Button/TertiaryButton";
import IconLabel from "../../../../../../Reusuable/Components/View/IconLabel/IconLabel";
import SearchIcon from "../../../../../../Assets/Icons/Jobs-Icons/SectionTopBar/search btn.svg";

// Toolbar for Candidate Modal in Open Jobs
export default function CandidateModalTopBar(props) {
    return (
        <CandidateModalTopbar>
            <Label>Candidates</Label>
            {props.modalTabs.selectBoxes.map((selectBox) => {
                return (
                    <SelectBoxHorizontal
                        key={selectBox.name}
                        selectBox={selectBox}
                        handleOptionClick={props.selectBoxOptionClick}
                    />
                );
            })}
            <CandidateModalTools>
                <span>
                    Want more <br /> Candidates ?
                </span>
                <TertiaryButton clicked={() => {}} name="Request" />
                <IconLabel icon={SearchIcon} />
            </CandidateModalTools>
        </CandidateModalTopbar>
    );
}
