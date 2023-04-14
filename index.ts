import OracleDB from 'oracledb';

async function main(): Promise<number> {
    OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;
    OracleDB.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_9' });

    const connection = await OracleDB.getConnection({
        user: process.env.ORACLEDB_USER,
        password: process.env.ORACLEDB_PASSWORD,
        connectString: process.env.ORACLEDB_CONNECTIONSTRING,
    }).catch((err) => {
        console.error(err);
    });
    if (!connection) { return -1; }
    
    
    console.log(
        await connection.execute("select * from tp_bucket")
        );

    connection.close();
    return 0;
}

main().catch((err) => {
    console.error(err);
    process.exit(-1);
}).then((code) => {
    if (!code) { code = -1; }
    process.exit(code);
});
