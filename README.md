# Radit Auth Service

### Dependencies

Check [`package.json`](package.json) file

### Tests

Tests are written using Mocha and Chai, [here](./tests/)

## Setup and run the project

Execute the below command in terminal to build the docker image

```bash
bash make
```

***Dev***

To run on development

Rename the `.env.example` as `.env` and fill up your details there and execute the below command
 
```bash
bash yarn install && yarn dev
```