# KPI Network Frontend

Application for visualization and analysis of financial metrics

## Installation and Setup Instructions

Clone down this repository. You will need [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed globally on your machine.

### Installation

#### Install Amplify CLI

```shell
npm install -g @aws-amplify/cli
```

#### Install dependencies

```shell
npm install
```

### To Run Test Suite

```shell
npm run test
```

### To Start Server

```shell
npm run dev
```

## Repo structure

````shell
/
├─ cloudfrontFunctions/
├─ infraestructure/
│  ├─ buckets/ 
│  ├─ cdn/ 
│  ├─ certificates/ 
│  ├─ dns/ 
│  ├─ buckets/ 
│  ├─ policy/
│  ├─ .terraform.lock.hcl
│  ├─ main.tf
│  ├─ modules.tf
│  ├─ outputs.tf
│  ├─ provider.tf
│  ├─ resources.tf
│  └─ variables.tf
├─ scripts/
├─ src/ 
│  ├─ assets/ 
│  ├─ components/ 
|  │  ├─ Card/  
|  │  ├─ Filter/
|  │  └─Icons/
│  ├─ context/   
│  ├─ hooks/     
│  ├─ service/    
│  ├─ utils/ 
|  │  ├─ constants/  
|  │  └─ validateFile/
│  └─ views/
|  |  ├─ AdminPanel/  
|  |  ├─ CompanyDetailsPanelView/  
|  |  ├─ CompanyPanelView/  
|  |  ├─ CompanyView/  
|  |  ├─ EditModify/  
|  |  ├─ PermissionsView/  
|  |  ├─ RangesView/  
|  |  ├─ Reports/  
|  |  ├─ TagsView/  
|  |  ├─ UniverseView/
|  |  ├─ UploadFileView
|  |  └─ UserPanelView/
|  ├─ keyEventCodes.js
|  └─ manual_tests.md
├─ tests/ 
│  ├─ assets/ 
│  ├─ components/ 
|  │  ├─ Card/  
|  │  ├─ Filter/
|  │  └─Icons/
│  ├─ context/   
│  ├─ hooks/     
│  ├─ service/    
│  ├─ utils/ 
|  │  ├─ constants/  
|  │  └─ validateFile/
│  └─ views/
|     ├─ AdminPanel/  
|     ├─ CompanyDetailsPanelView/  
|     ├─ CompanyPanelView/  
|     ├─ CompanyView/  
|     ├─ EditModify/  
|     ├─ PermissionsView/  
|     ├─ RangesView/  
|     ├─ Reports/  
|     ├─ TagsView/  
|     ├─ UniverseView/
|     ├─ UploadFileView
|     └─ UserPanelView/
│  
├─ .env.template     
├─ .eslintrc.json       
├─ babel.config.js 
├─ index.html     
├─ jest.config.js         
├─ package-lock.json     
├─ package.json    
├─ README.md     
├─ setup-jest.js    
└─ vite.config.js
````

## Branch names format

Branch naming must follow a format so that a commit can be created.
For example if your task in Jira is KPI-48 implement semantic versioning your branch name is:

```shell
KPI-48-implement-semantic-versioning
```

## AWS Amplify

> [AWS Amplify](https://aws.amazon.com/amplify/) is a solution that lets developers easily build, ship, and host full-stack applications on AWS.

In this project the authentication is handled by Amplify, which uses Amazon Cognito as the authentication provider.

In order tu pull the amplify configuration from AWS, a script was created with all the commands to handle de amplify configuration.

Before running the script, the following env variables have to be exported according to the environment:

```shell
BUILD_COMMAND=XXXXXXXX
AWS_ACCESS_KEY_ID=XXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXXX
AMPLIFY_PROJECT=XXXXXXXX
AMPLIFY_APP=XXXXXXXX
AMPLIFY_ENV=XXXXXXXX
USER_POOL_ID=XXXXXXXX
USER_POOL_APP_ID=XXXXXXXX
```

Then run the script with the following command.

```shell
sh scripts/amplify-pull.sh
```

A amplify directory should be created locally with all the Amplify configuration.

## CI/CD

Github Actions are used for CI/CD processes to automate the build, test, and deployment pipeline.

### CI Pipeline

The CI pipeline starts running when a pull request is opened from any branch to demo, in this pipeline the following actions are performed

- Install amplify
- Install dependencies
- Run the tests
- Run amplify script
- Init terraform
- Run terraform plan

### CD Pipeline

The demo deployment is performed when a branch is opened a pull request from demo to the main branch.

Deployment to production is done when a PR from demo branch is merged to the main branch.

In these pipelines the following actions are performed:

- Install amplify
- Install dependencies
- Run the tests
- Run amplify script
- Build the project
- Init terraform
- Run terraform plan
- Run terraform apply
- Upload built project to S3
- Invalidate cloudfront distribution

## Pre-commit and Pre-push

Commit conventions are run when a commit is created and tests are run when a push is performed

## Built with

- [React 17.0.2](https://reactjs.org/) to build UI
- [AWS Amplify 4.3.24](https://aws.amazon.com/amplify/) to handle the authentication service
- [Terraform](https://www.terraform.io) to define the infrastructure as code
- [Husky](https://www.npmjs.com/package/husky) to execute GitHub hooks before a commit.
- [Commitlint](https://commitlint.js.org/#/) to adhere to a commit convention.

## License

Copyright 2021 ioet Inc. All Rights Reserved
