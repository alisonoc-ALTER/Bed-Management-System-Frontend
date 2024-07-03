<template>
    <cv-side-nav class="sideBar" id="side-nav" fixed expanded>
        <cv-side-nav-items>
            <cv-side-nav-menu-item class="header">
                <p>Bed<br />Management<br />System</p>
                <hospital-bed-icon />
            </cv-side-nav-menu-item>
            <cv-side-nav-link to="/dashboard">
                <template v-slot:nav-icon><home-icon /></template>
                Dashboard
            </cv-side-nav-link>
            <cv-side-nav-link
                to="/requests"
                v-if="bedManager && userHospitalId === currentHospitalId"
            >
                <template v-slot:nav-icon><manage-requests-icon /></template>
                Manage Requests
            </cv-side-nav-link>
            <cv-side-nav-link
                to="/admin"
                v-if="admin && userHospitalId === currentHospitalId"
            >
                <template v-slot:nav-icon><network-admin-control /></template>
                Admin
            </cv-side-nav-link>

            
            <cv-side-nav-link to="overview">
                <template v-slot:nav-icon><activity /></template>
                Overview
            </cv-side-nav-link>

            <cv-side-nav-menu-item class="footer" href="/logout">
                <p>Logout</p>
            </cv-side-nav-menu-item>
        </cv-side-nav-items>
    </cv-side-nav>
</template>

<script>
import LogoutIcon from "@carbon/icons-vue/es/logout/32";
import HospitalBedIcon from "@carbon/icons-vue/es/hospital-bed/32";
import HomeIcon from "@carbon/icons-vue/es/home/32";
import ManageRequestsIcon from "@carbon/icons-vue/lib/airline--manage-gates/32";
import NetworkAdminControl from "@carbon/icons-vue/es/network--admin-control/32";
import activity from "@carbon/icons-vue/es/activity/32.js";

export default {
    name: "SideBar",
    components: {
        LogoutIcon,
        HospitalBedIcon,
        HomeIcon,
        ManageRequestsIcon,
        NetworkAdminControl,
        activity
    },
    computed: {
        admin() {
            return this.$store.getters.getUserDetails.can_administrate;
        },
        bedManager() {
            return this.$store.getters.getUserDetails.can_approve_requests;
        },
        userHospitalId() {
            return this.$store.getters.getUserDetails.hospital_id;
        },
        currentHospitalId() {
            return this.$store.getters.getSelectedHospital.id;
        }
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

.cv-side-nav-items.bx--side-nav__items {
    padding-top: 0px;
}
.sideBar.cv-side-nav.bx--side-nav.bx--side-nav__navigation.bx--side-nav--expanded {
    top: 0rem;
    height: 100%;
    background: #323e58;
    .bx--side-nav__link-text {
        color: #fff;
    }
    .header,
    .footer {
        display: inline-block;
        background: #2e3648;
        width: 16rem;
        svg,
        p {
            display: inline-block;
        }
    }
    .header {
        padding-top: 2rem;
        padding-bottom: 2rem;
        text-overflow: initial;
        .bx--side-nav__link-text p {
            color: #fff;
            text-align: center;
            font-family: Roboto, sans-serif;
            font-size: 1.2rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.07813rem;
        }
    }
    .footer {
        &:hover {
            background: #30384d;
        }
        .bx--side-nav__link-text p {
            color: #fff;
            text-align: center;
            font-family: Roboto, sans-serif;
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.07813rem;
        }
        padding-top: 1rem;
        padding-bottom: 1rem;
        bottom: 0px;
        position: absolute;
        width: 16rem;
    }
    .bx--side-nav__item {
        a.bx--side-nav__link[aria-current="page"]::before,
        a.bx--side-nav__link--current::before {
            background-color: #0099ff;
        }
        a.bx--side-nav__link[aria-current="page"],
        a.bx--side-nav__link--current {
            background: #323e58;
            background: inherit;
            transition: none;
        }
        .bx--side-nav__icon.bx--side-nav__icon--small svg {
            fill: #fff;
        }
        &:hover {
            background: #30384d;
        }
        .bx--side-nav__link-text {
            color: #fff;
            text-align: center;
            font-family: Roboto, sans-serif;
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.07813rem;
        }
        a {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }
    }
    .cv-side-nav-item-link.bx--side-nav__link:hover {
        background-color: inherit;
    }
}
</style>
