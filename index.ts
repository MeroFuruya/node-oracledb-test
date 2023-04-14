import { connect } from 'http2';
import OracleDB from 'oracledb';

async function main(): Promise<number> {
    OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;
    OracleDB.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_9' });
    

    const connection = await OracleDB.getConnection({
        user: 'lmps',
        password: 'mac',
        connectString: 'TEST_LALO',
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
