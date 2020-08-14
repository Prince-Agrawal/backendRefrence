import React, { Component } from "react";
import TabbarMain from "../Component/Interactive/SectionTopBar/TabbarMain";
import Sort from "../../../../Assets/Icons/Jobs-Icons/SectionTopBar/sort btn.png";
import Search from "../../../../Assets/Icons/Jobs-Icons/SectionTopBar/search btn.svg";
import Archieved from "../../../../Assets/Icons/Jobs-Icons/SectionTopBar/archieved btn.png";
import Filter from "../../../../Assets/Icons/Jobs-Icons/SectionTopBar/filter btn.png";
import PostJobButton from "../Component/Interactive/PostJobButton/PostJobButton";
import OpenJobs from "./OpenJobs/OpenJobs";
import { MainWrapper, Label } from "./style";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default class Jobs extends Component {
    //  State for the Job Section ToolBar
    state = {
        tabs: [
            {
                id: "openjob",
                route: "/client/alljobs/openjob",
                name: "Open Jobs",
            },
            {
                id: "closedjob",
                route: "/client/alljobs/closedjob",
                name: "Closed Jobs",
            },
            {
                id: "pendingjob",
                route: "/client/alljobs/pendingjob",
                name: "Pending Jobs",
            },
            {
                id: "archivedjob",
                route: "/client/alljobs/archivedjob",
                name: "archived Jobs",
            },
        ],

        actions: [
            {
                id: "search",
                image: Search,
            },
            {
                id: "filter",
                image: Filter,
            },
            {
                id: "sort",
                image: Sort,
            },
            {
                id: "delete",
                image: Archieved,
            },
        ],
    };

    // To set the active state of tab on first render based on the route
    constructor(props) {
        super(props);
        this.props.history.replace(this.props.match.path + "openjob");
    }

    render() {
        return (
            <MainWrapper>
                <Label>Jobs</Label>
                <TabbarMain
                    actions={this.state.actions}
                    // tabClick={this.tabChangeHandler}
                    tabs={this.state.tabs}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S/N</StyledTableCell>
                                <StyledTableCell align="right">
                                    Job Title
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Positions
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Applicants
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Location
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Date Posted
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <Route
                                path="/client/alljobs/openjob"
                                component={OpenJobs}
                            />
                            <Route
                                path="/client/alljobs/closedjob"
                                render={() => <>Closed job</>}
                            />
                            <Route
                                path="/client/alljobs/pendingjob"
                                render={() => <>pending job</>}
                            />
                            <Route
                                path="/client/alljobs/archivedjob"
                                render={() => <>archived job</>}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
                <PostJobButton
                    link={"/client/newjob/jobdetails"}
                    name="Post Job"
                />
            </MainWrapper>
        );
    }
}
