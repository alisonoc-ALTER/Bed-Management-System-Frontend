# [Bed Management System Frontend](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend)

[![build](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/actions/workflows/build.yml/badge.svg)](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/actions/workflows/build.yml)
[![test](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/actions/workflows/test.yml/badge.svg)](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/actions/workflows/test.yml)
[![analysis](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/actions/workflows/analysis.yml/badge.svg)](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/actions/workflows/analysis.yml)
[![GitHub issues](https://img.shields.io/github/issues/alisonoc-ALTER/Bed-Management-System-Frontend?logo=github)](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/issues)
![GitHub Created At](https://img.shields.io/github/created-at/alisonoc-ALTER/Bed-Management-System-Frontend?logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/alisonoc-ALTER/Bed-Management-System-Frontend?logo=github)
[![GitHub contributors](https://img.shields.io/github/contributors/alisonoc-ALTER/Bed-Management-System-Frontend.svg?logo=github)](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/alisonoc-ALTER/Bed-Management-System-Frontend?color=blue&logo=github)](https://github.com/alisonoc-ALTER/Bed-Management-System-Frontend/blob/master/LICENSE)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alisonoc-ALTER_Bed-Management-System-Frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=alisonoc-ALTER_Bed-Management-System-Frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=alisonoc-ALTER_Bed-Management-System-Frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=alisonoc-ALTER_Bed-Management-System-Frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=alisonoc-ALTER_Bed-Management-System-Frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=alisonoc-ALTER_Bed-Management-System-Frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=alisonoc-ALTER_Bed-Management-System-Frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=alisonoc-ALTER_Bed-Management-System-Frontend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=alisonoc-ALTER_Bed-Management-System-Frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=alisonoc-ALTER_Bed-Management-System-Frontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=alisonoc-ALTER_Bed-Management-System-Frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=alisonoc-ALTER_Bed-Management-System-Frontend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=alisonoc-ALTER_Bed-Management-System-Frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=alisonoc-ALTER_Bed-Management-System-Frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alisonoc-ALTER_Bed-Management-System-Frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=alisonoc-ALTER_Bed-Management-System-Frontend)

## Table of Contents

- [Description](#description)
  - [Technology Stack](#technology-stack)
  - [Features](#features)
- [User Guide](#user-guide)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Run Docker Compose](#run-docker-compose)
- [Testing](#testing)
- [Compatibility](#compatibility)
- [Contributors](#contributors)
- [License](#license)

## Description

This software, aims to address the critical challenge of optimising hospital resource management, focusing on the effective allocation and utilisation on hospital beds.

There are many roles involved with efficient bed management including

- Doctors
- Nurses
- Bed Manages
- IT Administrators
- Cleaners

this results in bed management systems having may feature requirements including

- Bed Assignment
- Patient Transfers
- Bed Status Tracking
- Real-time Dashboard
- Updatable Wards & Beds
- Cross-platform Compatibility
- User-friendly Design

The motivation for this project comes from the hospital bed shortage faced in Ireland. The increasing wait times have resulted in more patients on trolleys; making them susceptible to infection and potential poor outcome. Efficient bed management can potentially help reduce waiting times by speeding up the bed allocation process.

Through careful research of existing literature and practices, some key design choices and features were made. For example, to eliminate the potential of typos, QR codes can be used to access all information and actions for a specific bed.

The System aims to meet the complex requirements of hospital bed management using a web application. Automating the bed management process can have huge impacts resulting in

- Saving staff time
- Improved patient care
- Cost savings through optimisation

### Technology Stack

[![Vue.js](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Charts.js](https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/)
[![SonarCloud](https://img.shields.io/badge/Sonar%20cloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://www.sonarsource.com/products/sonarcloud/)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)

### Features

- [Real-time dashboard](#real-time-dashboard)
- [Bed assignment](#bed-assignment)
- [Bed status tracking](#bed-status-tracking)
- [Patient transfers](#patient-transfers)
- [User management](#user-management)
- [Ward & bed management](#ward--bed-management)
- [QR code navigation](#qr-code-navigation)
- [Bed cleaning management](#bed-cleaning-management)
- [Unique user roles](#unique-user-roles)
- [Firebase authentication](#firebase-authentication)

#### Real-time dashboard

![Dashboard](/docs/images/Dashboard.png)

The dashboard provides a real-time overview of the hospital's bed occupancy and navigation to the different features of the system.

#### Bed assignment

![Bed Assignment](/docs/images/Bed%20Assignment.png)

The bed assignment feature allows doctors and nurses to assign a patient to a bed by inputting their details which shows all available beds that meet the patients requirements (Gender & Age).

#### Bed Status Tracking

![Bed Status](/docs/images/Bed%20Status.png)

The bed status page seen in the above figure shows the status of a given bed and the patient information if occupied. The bed status is updated in real-time.

#### Patient Transfers

![Patient Transfer](/docs/images/Patient%20Transfer.png)

The patient transfer screen allows users to request a transfer for a patient to another bed in the same or different hospital. The request can then only be approved by the bed manager where the patient is being transferred to.

#### Manage Transfer Requests

![Transfer Requests](/docs/images/Manage%20Requests.png)

The transfer requests page allows bed managers to view all transfer requests and approve or reject them. The page also shows the previously approved transfer requests.

#### User Management

![Manage Users](/docs/images/Manage%20Users.png)

The user management page allows administrators to create and delete user accounts. The page also allows administrators to assign roles to users. After entering the details of a new users, a pop-up will appear to enter a password for the new user.

#### Ward & Bed Management

![Manage Wards & Beds](/docs/images/Manage%20Beds.png)

The ward and bed management page allows administrators to create and delete wards and beds.

#### QR code navigation

![QR Code](/docs/images/QR%20code.png)

QR codes similar to the one above are generated for every bed in the hospital. These QR codes can be scanned to navigate to the bed status page for that bed.

#### Bed Cleaning Management

![Cleaning Required Tag](/docs/images/Cleaning%20Required%20Tag.png)

![Mark as Cleaned button](/docs/images/Mark%20as%20cleaned%20button.png)

When a patient is discharged from a bed, the bed is marked as requiring cleaning. Once cleaned the bed can then be marked as available for a new patient.

#### Unique User Roles

| Features                         | Doctors & Nurses | Bed Managers | Administrators |
| -------------------------------- | ---------------- | ------------ | -------------- |
| Assign/Unassign Patients to Beds | ✔️               | ✔️           | ✔️             |
| Search for Patients              | ✔️               | ✔️           | ✔️             |
| Make Transfer Requests           | ✔️               | ✔️           | ✔️             |
| Approve Transfer Requests        | ❌               | ✔️           | ❌             |
| Create/Update User Accounts      | ❌               | ❌           | ✔️             |
| Create/Update Wards & Beds       | ❌               | ❌           | ✔️             |

#### Firebase Authentication

![Login Form](/docs/images/Login%20Component.png)

Firebase Authentication is used to authenticate users. The system has three user roles: Doctors & Nurses, Bed Managers, and Administrators. Each user role has different permissions.

## User Guide

### How to manage users

#### Adding a user

**ADMIN Permissions Required to manage users**

1. Navigate to "Admin" in the sidebar
2. Click on "Manage Users"
3. At the bottom of the table there are text input boxes for

   - First Name
   - Last Name
   - Email
   - Phone number

   and checkboxes to grant the user permissions

   - Can Approve Requests
   - Can Administrate

   Fill in all this information for the new user

4. Click the "Create" button on the furthest right column to create the user
5. A pop-up will appear to enter a password for the new user
6. (Optional) Follow [Resetting a user's password](#resetting-a-users-password) to reset the password for the new user

#### Deleting a user

**ADMIN Permissions Required to manage users**

1. Navigate to "Admin" in the sidebar
2. Click on "Manage Users"
3. Using the table find the user you want to delete
4. Click the "Delete" button on the furthest right column to delete the user

#### Resetting a user's password

**ADMIN Permissions Required to manage users**

1. Navigate to "Admin" in the sidebar
2. Click on "Manage Users"
3. Using the table find the user you want to reset the password for
4. Click the "Change Password" button on the furthest right column to reset the password for the user
5. Instruct the user to check their email for further instructions on how to change their password

#### Viewing a users browsing history

**ADMIN Permissions Required to manage users**

1. Navigate to "Admin" in the sidebar
2. Click on "Manage Users"
3. Using the table find the user you want to view the browsing history for
4. Click the ![Browsing History Button](/docs/images/Browsing%20History%20Button.png) button on the furthest right column
5. Navigate to the bottom of the page
6. Input a "Start Date" and "End Date" to view the browsing history for that user during that time period

### How to manage wards & beds

#### How to create wards

**ADMIN Permissions Required to manage users**

1. Navigate to "Admin" in the sidebar
2. Click on "Manage Wards/Beds"
3. At the bottom of the table there are text input boxes for

   - Ward Name
   - Min Patient Age
   - Max Patient Age
   - Location (Must be a number)

   and dropdown boxes to select

   - Treatment Level
   - Gender

   Fill in all this information for the new ward

4. Click the "Create Ward" button on the furthest right column to create the ward

#### How to delete wards

**ADMIN Permissions Required to manage wards**

1. Navigate to "Admin" in the sidebar
2. Click on "Manage Wards/Beds"
3. Using the table find the ward you want to delete
4. Click the "Delete" button on the furthest right column to delete the ward

#### How to create beds & rooms

**ADMIN Permissions Required to manage beds & rooms**

1. Navigate to "Admin" in the sidebar
2. Click on "Manage Wards/Beds"
3. Using the table find the ward you want to add a bed to
4. Click the "View Beds" button on the furthest right column
5. Scroll down the page until you see a different table with beds
6. At the bottom of the table there are text input boxes for name
7. **Optional** If the bed is in a room within the ward
   1. Select the room from the dropdown if it already exists **or** select "Create New Room" to create a new room.
   2. If creating a new room enter the room description and the gender of the room in the popup
   3. Click "Create" to create the room
   4. Select the newly created room from the dropdown
8. Click the "Create Bed" button on the furthest right column to create the bed

#### How to delete beds

**ADMIN Permissions Required to manage beds**

1. Navigate to "Admin" in the sidebar
2. Click on "Manage Wards/Beds"
3. Using the table find the ward that the bed you want to delete is in
4. Click the "View Beds" button on the furthest right column
5. Using the table find the bed you want to delete
6. Click the "Delete" button on the furthest right column to delete the bed

### How to assign/unassign patients to beds

#### How to assign a patient to a bed

1. On the Dashboard click the "Create" button
2. Fill in the patient details
   - First Name
   - Last Name
   - Date of Birth
   - Gender
3. Click "Search" to find a bed that meets the patient's requirements
4. Using the table on the right find the bed you want to assign the patient to
5. **Optional** View ![How to bypass bed selection filters](#how-to-bypass-bed-selection-filters) to remove the age and/or gender filters
6. Click the "Assign" button on the furthest right column to assign the patient to the bed

#### How to bypass bed selection filters

1. While transferring a patient or assigning a patient to a bed
2. At the top of the table on the right there are tags for

   - Age
   - Gender

   Click the "X" on the tag to remove the filter and display the beds that are currently hidden.

### Transfer Requests

#### How to transfer patients

1. On the Dashboard click the "Transfer" button
2. Search for the patient you want to transfer
3. Click the "Transfer" button on the furthest right column to transfer the patient
4. Select the hospital you want to transfer the patient to from the dropdown on the right
5. Find the bed you want to transfer the patient to in the table
6. Click the "Transfer" button on the furthest right column to request the transfer

#### How to approve transfer requests

**BED MANAGER Permissions Required to approve transfer requests**

1. On the sidebar click "Transfer" then "Manage Transfer Requests"
2. In the "Pending Transfer Requests" table find the request you want to approve
3. Click the "Approve" button on the furthest right column to approve the request

#### How to delete transfer requests

**BED MANAGER Permissions Required to reject transfer requests**

1. On the sidebar click "Transfer" then "Manage Transfer Requests"
2. In the "Pending Transfer Requests" table find the request you want to reject
3. Click the "Delete" button on the furthest right column to reject the request

#### How to view approved transfer requests

**BED MANAGER Permissions Required to view approved transfer requests**

1. On the sidebar click "Transfer" then "Manage Transfer Requests"
2. In the "Approved Transfer Requests" table find the request you want to view

#### How to view transfer requests you initiated

1. On the sidebar click "Transfer" then "Your Transfer Requests"

#### How to delete transfer requests you initiated

1. On the sidebar click "Transfer" then "Your Transfer Requests"
2. In the "Pending Transfer Requests" table find the request you want to delete
3. Click the "Delete" button on the furthest right column to delete the request

### How to update bed status

1. When viewing a Bed Info page (accessible by scanning a bed's QR code or by [Searching](#how-to-search-for-patients-and-beds) for a bed)
2. On the left side of the page there is a section called "Actions"
3. Depending on the current status of the bed there will be different statuses available to update to by clicking the respective button

Alternative step 3 for **Bed Managers ONLY**

1. When viewing a Bed Info page (accessible by scanning a bed's QR code or by [Searching](#how-to-search-for-patients-and-beds) for a bed)
2. On the left side of the page there is a section called "Manage"
3. Using the dropdown select the status you want to update the bed to

### How to view other hospitals

1. At the top of the page where the hospital name is displayed there is a dropdown
2. Click the dropdown to select the hospital you want to view

### How to search for patients and beds

1. On the dashboard click the "Search" button
2. At the top of the page there is a search bar
3. Enter a search query. You can search for

   - Patient First Name
   - Patient Last Name
   - Patient Date of Birth
   - Bed Name
   - Ward Name
   - Room Name
   - Gender

### How to download bed QR codes

1. When viewing a Bed Info page (accessible by scanning a bed's QR code or by [Searching](#how-to-search-for-patients-and-beds) for a bed)
2. On the left side of the page there is a section called "QR code"
3. Click the "Download" button to download the QR code for the bed

## Installation

### Install Project Dependencies

```bash
nvm use
npm install
```

### Backend

The backend for this project can be found [here](https://github.com/alisonoc-ALTER/Bed-Management-System-Backend)

This is **required** to run the application for both development and deployment purposes

## Development

### Run development build

```bash
## Backend server and Database are required for full functionality on frontend
npm run dev
```

### Information for contributors

#### Code Formatter

For code formatting we use [Prettier](https://prettier.io/). Please use this to format your code so that the codebase remains consistent.

#### Style Guide

For the style guide we use [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md). Please follow this guide when writing code.

#### Code Analysis

For code analysis we use [SonarCloud](https://sonarcloud.io/). Please ensure that your code does not have any bugs, vulnerabilities, code smells, or security issues. This analysis will automatically run on every pull request. A failed analysis will prevent the pull request from being merged with the main branch.

#### Commit Messages & Branch Naming

Commit messages should be in the following format:

```
<type>: <description>
```

Branch names should be in the following format:

```
<type>/<description>
```

Where `<type>` is one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Deployment

### Build

```bash
npm run build
```

### Run Build

```bash
cd build
## Backend server and Database are required for full functionality on frontend
npm start
```

## Run Docker Compose

1. Build the Application:
   To build the application using Docker Compose, run the following command:

   ```bash
   docker-compose build
   ```

2. Create Network (if not already created):
   If you have not already created the bms-network network, run:

   ```bash
   docker network create bms-network
   ```

3. Start the Backend & Database Docker Compose:

   Start the Docker Compose for the Backend and Database as documented [here](https://github.com/alisonoc-ALTER/Bed-Management-System-Backend#run-docker-compose)

4. Start the Application:
   To start the application, run:

   ```bash
   docker-compose up
   ```

## Testing

### Run unit tests

```bash
npm run test:unit
```

## Compatibility

View [compatibility.md](compatibility.md) for compatibility information.

## Contributors

![Contributors](https://contrib.rocks/image?repo=alisonoc-ALTER/Bed-Management-System-Frontend)

## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
