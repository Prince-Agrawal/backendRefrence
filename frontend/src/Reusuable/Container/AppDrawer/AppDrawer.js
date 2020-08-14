import React, { Component } from "react";
import { withRouter } from "react-router";

import { AppDrawerWrapper, NavigationItemWrapper, Label } from "./style";

import TabSidebar from "../../Components/Interactive/Tab/Sidebar/TabSidebar";

class AppDrawer extends Component {
    /*
    EXAMPLE : 
    
    **************** props : name => navigationItems *****************

        navigationItems = [
            {
                name: "Navigation",
                routes: [
                    {
                        id: 1,              => required
                        label: "Dashboard", => required
                        activeIcon: HomeIcon,  => required
                        inactiveIcon: HomeIcon,  => required
                        route: "/client", => required
                        exact: true,  => optional
                    },
                ],
            },
            {
                name: "Support",
                routes: [
                    {
                        id: 4,
                        active: false,
                        label: "Help Desk",
                        activeIcon: Icon,
                        inactiveIcon: Icon,
                        route: "/support",
                    },
                ],
            },
        ],
    
*/

    render() {
        return (
            <AppDrawerWrapper>
                {this.props.navigationItems.map((navigationItem) => (
                    <NavigationItemWrapper
                        onClick={this.props.toggleNavBar}
                        key={navigationItem.name}
                    >
                        <Label>{navigationItem.name}</Label>
                        {navigationItem.routes.map((route) => (
                            <TabSidebar
                                key={route.id}
                                exact={route.exact}
                                link={route.route}
                                label={route.label}
                                activeIcon={route.activeIcon}
                                inactiveIcon={route.inactiveIcon}
                            />
                        ))}
                    </NavigationItemWrapper>
                ))}
            </AppDrawerWrapper>
        );
    }
}

export default withRouter(AppDrawer);
