import React, { useState } from "react";

import styled, { css } from "styled-components";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";

import PlantIcon from "../../../../../Assets/JobIcons/plant.svg";
import ExperienceIcon from "../../../../../Assets/JobIcons/experience.svg";
import RupeesIcon from "../../../../../Assets/JobIcons/rupee.svg";
import SearchIcon from "../../../../../Assets/JobIcons/magnifying-glass.svg";
import IconLabel from "../../../../../Reusuable/Components/View/IconLabel/IconLabel";

import Tag from "../../../../../Reusuable/Components/Interactive/Tag/tag";
import Button from "../../../../../Reusuable/Components/Interactive/Button/Button";

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
    const [open, setOpen] = useState(false);
    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.name}
                </TableCell>
                <TableCell align="right">{props.email}</TableCell>
                <TableCell align="right">{props.phone_number}</TableCell>
                <TableCell align="right">{props.stage}</TableCell>
                <TableCell align="right">
                    {["Unaction", "", props.stage, undefined].includes(
                        props.is_interview_accept
                    )
                        ? "--"
                        : props.is_interview_accept
                        ? "Accepted"
                        : "--"}
                </TableCell>
                <TableCell style={{ display: "flex" }} align="right">
                    <Button
                        buttonClick={props.toggleModal}
                        type="light"
                        label="Edit"
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ContentWrapper
                            style={{
                                borderTop: "1px solid #c2c2c2",
                            }}
                        >
                            <RowWrapper
                                style={{
                                    gap: ".5rem",
                                    borderRight: "1px solid #c2c2c2",
                                    flex: 1,
                                }}
                            >
                                <KeyValueWrapper>
                                    <RowWrapper
                                        style={{
                                            gap: ".5rem",
                                        }}
                                    >
                                        <Label>Domain Experience</Label>
                                        <IconLabel
                                            small
                                            icon={PlantIcon}
                                            label={`${props.domain_experience} Years`}
                                        />
                                    </RowWrapper>
                                    <RowWrapper
                                        style={{
                                            gap: ".5rem",
                                        }}
                                    >
                                        <Label>Total Experience</Label>
                                        <IconLabel
                                            small
                                            icon={ExperienceIcon}
                                            label={`${props.total_experience} Years`}
                                        />
                                    </RowWrapper>
                                </KeyValueWrapper>
                                <KeyValueWrapper>
                                    <RowWrapper
                                        style={{
                                            gap: ".5rem",
                                        }}
                                    >
                                        <Label>Current Salary</Label>
                                        <IconLabel
                                            small
                                            icon={RupeesIcon}
                                            label={`${props.current_salary}L PA`}
                                        />
                                    </RowWrapper>
                                    <RowWrapper
                                        style={{
                                            gap: ".5rem",
                                        }}
                                    >
                                        <Label>Salary Expected</Label>
                                        <IconLabel
                                            small
                                            icon={RupeesIcon}
                                            label={`${props.expected_salary}L PA`}
                                        />
                                    </RowWrapper>
                                </KeyValueWrapper>
                            </RowWrapper>
                            <RowWrapper
                                style={{
                                    paddingLeft: "2rem",
                                    gap: ".5rem",
                                    flex: 2,
                                }}
                            >
                                <Label heading>Skills</Label>
                                <TagWrapper fit>
                                    {props.skills.map((tag, i, a) => (
                                        <Tag
                                            key={i}
                                            length={a.length}
                                            tag={{
                                                id: i,
                                                label: tag,
                                            }}
                                            view
                                            small
                                        />
                                    ))}
                                </TagWrapper>
                            </RowWrapper>
                        </ContentWrapper>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
