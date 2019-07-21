* Dependencies Reinstalled to also reflect new nodejs module; mongoose shoots to 5.6.5 from 5.6.2
* Nodejs upgraded to 12.6.0; Engines version in package.json also updated to reflect the upgrade
* Observation: No need to create procfile.js as enitre app is what is actually loaded online, and not various parts of it.
    * also because we have already specified what should be running automatically in package.json; not just node index.js, but particularly 'npm run dev' ...
# Heroku-Deploy
* nodejs_mongodb heroku app deployment
