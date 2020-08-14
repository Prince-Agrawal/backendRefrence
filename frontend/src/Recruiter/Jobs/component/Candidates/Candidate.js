import React, { useState } from "react";

import styled, { css } from "styled-components";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";

import PlantIcon from "../../../../Assets/JobIcons/plant.svg";
import ExperienceIcon from "../../../../Assets/JobIcons/experience.svg";
import RupeesIcon from "../../../../Assets/JobIcons/rupee.svg";
import SearchIcon from "../../../../Assets/JobIcons/magnifying-glass.svg";
import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";

import Tag from "../../../../Reusuable/Components/Interactive/Tag/tag";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";

const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
});

export const KeyValueWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const RowWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    & > * {
        margin: 1rem;
        box-sizing: border-box;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
`;

export const TagWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

export const Label = styled.label`
    text-align: left;
    margin: 0;
    padding: 0;
    width: 100%;
    height: fit-content;

    ${(props) =>
        props.heading === true
            ? css`
                  font-size: ${(props) =>
                      props.title ? `1.25rem` : `1.15rem`};
                  color: ${(props) =>
                      props.bold
                          ? `#10299C`
                          : props.black
                          ? `#000`
                          : `#3B5FFF`};
                  font-weight: ${(props) => (props.bold ? `600` : `400`)};
              `
            : css`
                  font-size: ${(props) => (props.title ? `1rem` : `.8rem`)};
                  font-weight: ${(props) => (props.bold ? `600` : `400`)};
                  color: ${(props) => (props.grey ? `#979797` : `#000`)};
                  ${(props) =>
                      props.small &&
                      css`
                          width: 5rem;
                          text-align: left;
                      `}
              `}
`;

export default function Candidate(props) {
    const classes = useRowStyles();
    return (
        <>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    {props.name}
                </TableCell>
                <TableCell align="right">{props.email}</TableCell>
                <TableCell align="right">{props.phone_number}</TableCell>
                <TableCell align="right">{props.status}</TableCell>
            </TableRow>
        </>
    );
}
