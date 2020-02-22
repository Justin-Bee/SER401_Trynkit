
RDSHOST="database-1.c6jvbofhlbly.us-west-2.rds.amazonaws.com"
TOKEN="$(aws rds generate-db-auth-token --hostname $RDSHOST --port 3306 --region us-west-2 --username admin )"

mysql --host=$RDSHOST --port=3306 --enable-cleartext-plugin --user=admin --password=$TOKEN
