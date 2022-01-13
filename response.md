# Response
  Current contest as an example. Feel free to edit/remove it.

## Required
### API Document
  https://hackmd.io/@OaIOUmTYTFK03yyCpSSwDw/rkLXjWuhY
### Import Data Commands    
1) 進入 util 資料夾: `cd util`
2) 將 pharmacies.json 的資料匯入DB: `node rd_pharmacy_file.js`
3) 將 user.json 的資料匯入DB: `node rd_user_file.js `

### DB Schema
check the [DB schema](public/images/db_schema.png)

## Bonus
### Test Coverage Report
* run test command: `npm run test-with-coverage`
* check the [test converage report](public/images/test_coverage_report.png)
   
### Dockerized
* build the docker image command: `docker build -t phantom_mask:01 .`
* run the container by the docker image: `docker run -p 80:3000 -d --env-file ./.env [CONTAINER ID]`
* check my [dockerfile](./dockerfile)
  and [.dockerignore](./.dockerignore)

### Demo Site Url
  demo site is ready on [heroku](#demo-site-url)
