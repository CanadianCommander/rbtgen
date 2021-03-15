# Report By Template Generator (RBTgen)
Are you tired of making RBT reports by hand in Juno/Oscar? This generator provides a simple 
interface for building reports. 
### Try it out @ [rbtgen.ca](https://rbtgen.ca)
This product is in alpha. You should always backup your reports! I cannot guarantee that future changes will be compatible with existing reports.

### Dev setup 
Requirements 
```
ruby 2.7.1
bundler 
yarn
docker
```

After cloning the repository go to `client` and run `yarn install`. Then back in the root of the 
repository run `./dev.sh build` This should build and start the development docker containers. 
At this point rails will be upset because the database doesn't exist. attach to the database container 
with, `docker exec -u postgres -it rbtgen_dev_db_1 psql` and create a new development database, 
`CREATE DATABASE rbt_gen_development;`. Finally give the containers a restart with `^C` then run, `./dev.sh`.  

🎉 You should now have working dev environment on `localhost:8080` 🎉