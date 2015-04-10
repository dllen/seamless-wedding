# Seamless Wedding Website
#### Easy to set up, configure, and deploy.
![Alt text](/public/images/screenshot.png?raw=true "Screenshot")
## http://182.92.192.122:52110/#/home

### How to run
1. Download code and cd into the project.
2. Open command line tool (git bash or linux commandline) and run 'npm install' from project root.
2. In command line tool run 'grunt' command from the project root.  This will automatically build everything and run grunt watch, which updates bundle.js and other code from the modules. (It may be necessary to install grunt-cli globally with 'sudo npm install -g grunt-cli')
3. Make sure you have mongodb installed. http://docs.mongodb.org/manual/installation/
4. Run 'mongod --dbpath db/' to start the Rsvp database, which will build database files in db/.
5. Start server by running 'node main.js', and it should say that it connected to the database.
6. Go to https://localhost:5000 or https://127.0.0.1:5000

### 补充
---
可以使用python脚本，批量生成相册图片


