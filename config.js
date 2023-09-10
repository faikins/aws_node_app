const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getSecret(secretName) {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

    if (data.SecretString) {
      return JSON.parse(data.SecretString);
    } else {
      // Handle binary secrets (e.g., if you have a binary secret in AWS Secrets Manager)
      let buff = new Buffer(data.SecretBinary, 'base64');
      return buff.toString('ascii');
    }
  } catch (error) {
    console.error(`Error retrieving secret: ${error}`);
    throw error;
  }
}

async function loadConfig() {
  const dbSecrets = await getSecret('my-db-secrets');

  return {
    db: {
      host: dbSecrets.host,
      user: dbSecrets.username,
      password: dbSecrets.password,
      // ... other config values
    },
    // ... other configurations
  };
}

module.exports = loadConfig();
