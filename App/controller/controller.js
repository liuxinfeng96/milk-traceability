const {
    FileSystemWallet,
    Gateway
} = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);
let controller = {
    getHistoryInfo: async function (key) {
        try {
            const userExists = await wallet.exists('user1');
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }
            const gateway = new Gateway();
            await gateway.connect(ccp, {
                wallet,
                identity: 'user1',
                discovery: {
                    enabled: false
                }
            });
            const network = await gateway.getNetwork('mychannel');
            const contract = network.getContract('milkchaincode');
            if (key == null) {
                return '请输入正确的产品ID'
            } else {
                const result = await contract.evaluateTransaction('getHistoryInfo', key);
                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                return result.toString();
            }
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            process.exit(1);
        }
    },
    queryMilk: async function (key) {
        try {
            const userExists = await wallet.exists('user1');
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }
            const gateway = new Gateway();
            await gateway.connect(ccp, {
                wallet,
                identity: 'user1',
                discovery: {
                    enabled: false
                }
            });
            const network = await gateway.getNetwork('mychannel');
            const contract = network.getContract('milkchaincode');
            if (key == null) {
                return '请输入正确的产品ID'
            } else {
                const result = await contract.evaluateTransaction('queryMilk', key);
                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                return result.toString();
            }
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            process.exit(1);
        }
    },
    queryAllMilks: async function () {
        try {
            const userExists = await wallet.exists('user1');
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }
            const gateway = new Gateway();
            await gateway.connect(ccp, {
                wallet,
                identity: 'user1',
                discovery: {
                    enabled: false
                }
            });
            const network = await gateway.getNetwork('mychannel');
            const contract = network.getContract('milkchaincode');
            const result = await contract.evaluateTransaction('queryAllMilks');
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            return result.toString();
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            process.exit(1);
        }
    },
    addSourceInfo: async function (key, grassState, cowState, milkState) {
        try {

            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            const userExists = await wallet.exists('user1');
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }

            const gateway = new Gateway();
            await gateway.connect(ccp, {
                wallet,
                identity: 'user1',
                discovery: {
                    enabled: false
                }
            });

            const network = await gateway.getNetwork('mychannel');
            const contract = network.getContract('milkchaincode');

            await contract.submitTransaction('addSourceInfo', key, grassState, cowState, milkState);

            await gateway.disconnect();

            return '{ "status" : "1", "message": "添加成功"}';

        } catch (error) {
            return '{ "status" : "0", "message": '+ error + '}';
        }
    },
    addProcessInfo: async function (key, proteinContent, sterilizeTime, storageTime) {
        try {

            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            const userExists = await wallet.exists('user1');
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }

            const gateway = new Gateway();
            await gateway.connect(ccp, {
                wallet,
                identity: 'user1',
                discovery: {
                    enabled: false
                }
            });

            const network = await gateway.getNetwork('mychannel');
            const contract = network.getContract('milkchaincode');

            await contract.submitTransaction('addProcessInfo', key, proteinContent, sterilizeTime, storageTime);

            await gateway.disconnect();

            return '{ "status" : "1", "message": "添加成功"}';

        } catch (error) {
            return '{ "status" : "0", "message": '+ error + '}';
        }
    },
    addLogInfo: async function (key, logCopName, logDepartureTm, logArrivalTm, logDeparturePl, logDest, logMOT, tempAvg) {
        try {

            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            const userExists = await wallet.exists('user1');
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }

            const gateway = new Gateway();
            await gateway.connect(ccp, {
                wallet,
                identity: 'user1',
                discovery: {
                    enabled: false
                }
            });

            const network = await gateway.getNetwork('mychannel');
            const contract = network.getContract('milkchaincode');

            await contract.submitTransaction('addLogInfo', key,logCopName, logDepartureTm, logArrivalTm, logDeparturePl, logDest, logMOT, tempAvg );

            await gateway.disconnect();

            return '{ "status" : "1", "message": "添加成功"}';

        } catch (error) {
            return '{ "status" : "0", "message": '+ error + '}';
        }
    }
}


module.exports = controller