import React from "react";
import { WorkWrapper, KeyValueWrapper, Label } from "./style";

import DomainIcon from "../../../../Assets/JobIcons/domain.svg";
import ClientIcon from "../../../../Assets/JobIcons/crm.svg";
import PlantIcon from "../../../../Assets/JobIcons/plant.svg";
import DepartmentIcon from "../../../../Assets/JobIcons/businessman-searching-job.svg";
import IntrestIcon from "../../../../Assets/JobIcons/interest.svg";
import IconLabel from "../../../../Reusuable/Components/View/IconLabel/IconLabel";

export default function Work({ user }) {
    return (
        <WorkWrapper>
            {user &&
                user.domain.map((domain) => (
                    <div
                        style={{
                            display: "grid",
                            gap: ".5rem",
                            height: "fit-content",
                        }}
                    >
                        <KeyValueWrapper style={{ marginBottom: "1rem" }}>
                            <IconLabel
                                icon={DomainIcon}
                                label={domain.domain_name}
                                dark
                            />
                        </KeyValueWrapper>
                        <KeyValueWrapper
                            style={{ margin: "0 1rem 1rem 2rem", width: "60%" }}
                        >
                            <IconLabel icon={PlantIcon} label={"Experience"} />
                            <Label>{domain.experience}</Label>
                        </KeyValueWrapper>
                        <KeyValueWrapper
                            style={{ margin: "0 1rem 1rem 2rem", width: "60%" }}
                        >
                            <IconLabel
                                icon={ClientIcon}
                                label={"Top Clients"}
                            />
                            <Label>{domain.top_client.join(", ")}</Label>
                        </KeyValueWrapper>
                    </div>
                ))}
            <hr />
            <KeyValueWrapper style={{ marginTop: "1rem" }}>
                <IconLabel
                    icon={DepartmentIcon}
                    label={"Functional Department"}
                />
                <Label>{user.functional_department.join(", ")}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={IntrestIcon} label={"Intrested Domain"} />
                <Label>{user.interested_domain.join(", ")}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <IconLabel icon={PlantIcon} label={"Total Experience"} />
                <Label>{user.total_experience}</Label>
            </KeyValueWrapper>
        </WorkWrapper>
    );
}
