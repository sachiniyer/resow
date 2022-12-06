# How to Contribute

## 1. Team Norms
- Be responsible - Do not slack off or free ride
- Treat one another with dignity and respect.
- Always share your work with others
- Be open-minded with all suggestions

## 2. Regular Meeting Time:
- Tue 3:30 - 4:30
- Thu 4:00 - 5:00

More will be added if needed

## 3. The git workflow

Team Re-Sow employs a centralized approach.
Developers work with two copies of a repository: 
- a local copy, where changes are made
- a remote copy, where completed changes are uploaded in order to be archived and shared with others.  

The specific order is shown below:

1. Create an issue for each backlog (Tasks or Spikes)
2. Create a branch with each issue. 
    
        e.g:  34-Implement-SignIn-feature
3. Commit and push the changes.
4. Make a pull request after you are done. Make sure to close the issue by entering the corresponding issue number. (using '#' sign)
5. Wait for the teammates review. If the changes are approved. Squash and merge the changes to the main branch
6. Notify the teammates if there is a possibility of code collisions. 

## 4. Detail rules of how and what to contribute
- Always notice the teammates before you work on an issue.
- Make sure to make a branch instead of directly pushing your commits to the main branch
- Make a PR before merging your branch to the main branch
- Focus on a small unit feature for every issue.

## 5. instructions for setting up the local development environment 

### Frontend
```
cd front-end
npm install
npm start
```
Audit fix is not that important

Add these info below in the env file in the front end:
```
REACT_APP_SERVER_HOSTNAME=http://localhost:5002
PORT=7002 
```

### Backend
```
cd back-end
npm install
npx nodemon server
```
Add these info below in the env file in the back end:
```
DB_USER=leafweaf
DB_PWORD=PDldDoI4ojWFs8X8
DB_STRING=@cluster0.0jjqfl3.mongodb.net/?retryWrites=true&w=majority
FRONT_END_URI=localhost:7002

PORT=5002
FRONT_END_URI=localhost:7002
```

## 6. instructions for building and testing the project
To be updated when the project reaches the stage
### Testing
```
cd back-end
npm install
npm test
```


## 7. Product Owner & Scrum Master
### Sprint 1
- Product Owner: Minwu Kim
- Scrum Master: Jacob Baum

### Sprint 2
- Product Owner: Tasnim Ahmed
- Scrum Master: Bhavicka Mohta

### Sprint 3
- Product Owner: Sachin Iyer
- Scrum Master: Minwu Kim
### Sprint 4
- Product Owner: Tasnim Ahmed



