# Dapi Postman Collection
This is the Postman collection for dapi API, it allows for quick testing of all available API calls without the need to write code. 

## Installation
1. Sign up with dapi using the [dashboard](https://docs.dapi.co/getting-started/dashboard) to get a set of credentials needed for communicating with dapi API. You can find more information about these credentials [here](https://docs.dapi.co/getting-started/dashboard)
2. Download and install the [Postman app](https://www.getpostman.com/downloads/)
3. Install the Postman collection and environment variables. You can click the following "Run in Postman" button to automatically install the collection with the environment variables.  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8942d7eb7783a3c8dec8#?env%5Bprod%5D=W3sia2V5IjoiYXBwX2tleSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJhcHBfc2VjcmV0IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImFjY2Vzc19jb2RlIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InVzZXJfc2VjcmV0IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6ImNvbm5lY3Rpb25faWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYWNjZXNzX3Rva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfV0=)

## Usage
The dapi Postman collection uses a set of credentials that are acquired from [dapi connect](https://docs.dapi.co/getting-started/connect) in addition to the credentials acquired from the dashboard, these credentials can be added to the [environment variables](https://learning.getpostman.com/docs/postman/variables-and-environments/variables/#environments-in-postman/) for easy usage with different API calls.

Dapi API calls are split into four groups:
1. Authentication: this is used to acquire an `access_token` which then can be added to the environment variables to be used for all other API calls
2. Data: this is a group of API calls used to retreieve data regarding identity, accounts, balance, and transactions
3. Payment: this group is used to retrieve a list of beneficiaries, add new beneficiaries, and start payment 
4. Status: this can be used to inquire about the status of a certain job within the dapi system 

More details about the dapi API can be found in the [documentation](https://docs.dapi.co/).