const config = require('./config');

async function main() {
  const appConfig = await config();
  console.log("Database Host:", appConfig.db.host);
  console.log("Database User:", appConfig.db.user);
  // ... use the configuration in your app logic
}

main().catch(error => {
  console.error("Error in app:", error);
});
