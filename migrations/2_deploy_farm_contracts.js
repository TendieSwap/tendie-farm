const { BigNumber } = require("@ethersproject/bignumber");
const MasterTendie = artifacts.require("MasterTendie");
const SupportTendie = artifacts.require("SupportTendie");
// const TendieToken = artifacts.require("TendieToken");
const TendieToken = artifacts.require("TendieTokenERC20");
const SpicyTendieBar = artifacts.require("SpicyTendieBar");
const MultiCall = artifacts.require("MultiCall");

const INITIAL_MINT = '25000';
const BLOCKS_PER_HOUR = (3600 / 3) // 3sec Block Time
const TOKENS_PER_BLOCK = '5';
const BLOCKS_PER_DAY = 24 * BLOCKS_PER_HOUR 
const STARTING_BLOCK = '';
const REWARDS_START = String(STARTING_BLOCK + (BLOCKS_PER_HOUR * 6))
const FARM_FEE_ACCOUNT = '0x51704B89620301b66eDc6C0f888d3bAf70935A73'
 
const logTx = (tx) => {
    console.dir(tx, {depth: 3});
}

// let block = await web3.eth.getBlock("latest")
module.exports = async function(deployer, network, accounts) {
    console.log({network});

    let currentAccount = '0xd3C1C1c23d9E689832C586D62Bb64620A3D7574f';
    let devAddress = FARM_FEE_ACCOUNT;
    if (network == 'testnet') {
        console.log(`WARNING: Updating current account for testnet`)
        currentAccount = '0xd3C1C1c23d9E689832C586D62Bb64620A3D7574f';
    }

    if (network == 'development' || network == 'testnet') {
        console.log(`WARNING: Updating feeAcount for testnet/development`)
        feeAccount = '0xd3C1C1c23d9E689832C586D62Bb64620A3D7574f';
    }

    let tendieTokenInstance;
    let spicyTendieBarInstance;
    let masterTendieInstance;

    /**
     * Deploy TendieToken
     */
    deployer.deploy(TendieToken).then((instance) => {
        tendieTokenInstance = instance;
        /**
         * Mint intial tokens for liquidity pool
         */
        return tendieTokenInstance.mint(BigNumber.from(INITIAL_MINT).mul(BigNumber.from(String(10**18))));
    }).then((tx)=> {
        logTx(tx);
        /**
         * Deploy SpicyTendieBar
         */
        return deployer.deploy(SpicyTendieBar, TendieToken.address)
    }).then((instance)=> {
        spicyTendieBarInstance = instance;
        /**
         * Deploy MasterTendie
         */
        if(network == "bsc" || network == "bsc-fork") {
            console.log(`Deploying MasterTendie with BSC MAINNET settings.`)
            return deployer.deploy(MasterTendie, 
                TendieToken.address,                                         // _tendie
                SpicyTendieBar.address,                                      // _spicyTendie
                devAddress,                                                   // _devaddr
                BigNumber.from(TOKENS_PER_BLOCK).mul(BigNumber.from(String(10**18))),  // _tendiePerBlock
                REWARDS_START,                                                // _startBlock
                4                                                            // _multiplier
            )
        }
        console.log(`Deploying MasterTendie with DEV/TEST settings`)
        return deployer.deploy(MasterTendie, 
            TendieToken.address, 
            SpicyTendieBar.address,
            devAddress, 
            BigNumber.from(TOKENS_PER_BLOCK).mul(BigNumber.from(String(10**18))), 
            0, 
            4
        )
        
    }).then((instance)=> {
        masterTendieInstance = instance;
        /**
         * TransferOwnership of TENDIE to MasterTendie
         */
        return tendieTokenInstance.transferOwnership(MasterTendie.address);
    }).then((tx)=> {
        logTx(tx);
        /**
         * TransferOwnership of SpicyTendie to MasterTendie
         */
        return spicyTendieBarInstance.transferOwnership(MasterTendie.address);
    }).then((tx)=> {
        logTx(tx);
        /**
         * Deploy SupportTendie
         */
        if(network == "bsc" || network == "bsc-fork") {
            console.log(`Deploying SupportTendie with BSC MAINNET settings.`)
            return deployer.deploy(SupportTendie, 
                SpicyTendieBar.address,                  //_spicyTendie
                BigNumber.from(TOKENS_PER_BLOCK).mul(BigNumber.from(String(10**18))),                                      // _rewardPerBlock
                REWARDS_START,                            // _startBlock
                STARTING_BLOCK + (BLOCKS_PER_DAY * 365),  // _endBlock
            )
        }
        console.log(`Deploying SupportTendie with DEV/TEST settings`)
        return deployer.deploy(SupportTendie, 
            SpicyTendieBar.address,                  //_spicyTendie
            BigNumber.from(TOKENS_PER_BLOCK).mul(BigNumber.from(String(10**18))),                                      // _rewardPerBlock
            STARTING_BLOCK + (BLOCKS_PER_HOUR * 6),   // _startBlock
            '99999999999999999',                      // _endBlock
        )
    }).then(()=> {
        /**
         * Deploy MultiCall
         */
        return deployer.deploy(MultiCall);
    }).then(()=> {
        console.log('Rewards Start at block: ', REWARDS_START)
        console.table({
            MasterTendie:MasterTendie.address,
            SupportTendie:SupportTendie.address,
            TendieToken:TendieToken.address,
            SpicyTendieBar:SpicyTendieBar.address,
            MultiCall:MultiCall.address,
        })
    });
};
