import React, { Component } from "react";
import "./tab-menu.css";

class Tabmenu extends Component {
  state = {
    // tabmenu: {
    //   id: 1,
    //   label: "Account type",
    //   tabs: [
    //     { id: 1, name: "Client", state: "selected" },
    //     { id: 2, name: "Recruiter", state: "unselected" },
    //     { id: 3, name: "Employee", state: "unselected" }
    //   ],
    //   selectedTab: "Client",
    //   state: "normal"
    // }
  };

  getTabboxClasses = tabmenuState => {
    if (tabmenuState === "error") {
      return "tabs-holder-error";
    } else if (tabmenuState === "disable") {
      return "tabs-holder-disable";
    } else {
      return "tabs-holder";
    }
  };

  getHelperTextClasses = tabmenuState => {
    if (tabmenuState === "error") {
      return "helper-text-error";
    } else if (tabmenuState === "disable") {
      return "helper-text-disable";
    } else {
      return "helper-text";
    }
  };

  render() {
    let tabmenu = this.props.tabmenu;

    return (
      <div className="tab-menu-container" key={tabmenu.id}>
        {tabmenu.label === undefined && tabmenu.label === "" ? null : (
          <div className="field-name" htmlFor={tabmenu.label}>
            {tabmenu.label}
          </div>
        )}
        <div className={this.getTabboxClasses(tabmenu.state)}>
          {tabmenu.tabs.map(tab => (
            <div
              key={tab.id}
              className={tab.state === "selected" ? "tab-selected" : "tab"}
              onClick={() => this.props.handleTabClick(tab.name)}>
              {tab.name}
            </div>
          ))}
        </div>
        {tabmenu.hint === undefined && tabmenu.hint === "" ? null : (
          <div className={this.getHelperTextClasses(tabmenu.state)}>
            {tabmenu.hint}
          </div>
        )}
      </div>
    );
  }
}

export default Tabmenu;
