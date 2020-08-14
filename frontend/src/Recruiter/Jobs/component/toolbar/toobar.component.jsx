import React from "react";
import { ToolBarContainer, UpToolBar, DownToolBar } from "./toolbar.style";
import FilterBtn from '../../../../Assets/Icons/Jobs-Icons/SectionTopBar/filter btn.png'
import SearchBtn from '../../../../Assets/Icons/Jobs-Icons/SectionTopBar/search btn.svg'
import SortBtn from '../../../../Assets/Icons/Jobs-Icons/SectionTopBar/sort btn.png'
import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";
import ChevronLeft from '../../../../Assets/Images/chevron-left-icon.png';

const ToolBar = () => {
  return (
    <ToolBarContainer>
      <UpToolBar>
        <IconLabel icon={SearchBtn}/>
        <IconLabel icon={FilterBtn}/>
        <IconLabel icon={SortBtn}/>
      </UpToolBar>
      <DownToolBar>
        <IconLabel icon={ChevronLeft}/>
      </DownToolBar>
    </ToolBarContainer>
  );
};

export default ToolBar;
