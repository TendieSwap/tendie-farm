const BEP20RewardTendieV2 = artifacts.require("BEP20RewardTendieV2");


const deployConfigs = [
    // {
    //   name: " Reward Pool",
    //   stakeToken: '', // token
    //   rewardToken: '', // num token
    //   rewardPerBlock: '', // x_token / Block (x decimals) x Blocks total
    //   startBlock: '', // x_date x_time UTC
    //   bonusEndBlock: '' // x Months
    // },
  ]
  
// let block = await web3.eth.getBlock("latest")
module.exports = async function(deployer, network, accounts) {
    // mainnet
    const adminAddress = '0xd3C1C1c23d9E689832C586D62Bb64620A3D7574f';

    const BLOCKS_PER_DAY = 28800;
    const BLOCK_DURATION = BLOCKS_PER_DAY * 7

    let deployLogs = [];

    for (const deployConfig of deployConfigs) {
        const { name, stakeToken, rewardToken, rewardPerBlock, startBlock, bonusEndBlock } = deployConfig;
    
        console.log("Deploying BEP20RewardTendie with config:");
        console.dir(deployConfig);
    
        await deployer.deploy(BEP20RewardTendieV2, stakeToken, rewardToken, rewardPerBlock, startBlock, bonusEndBlock);
        const bep20RewardTendie = await BEP20RewardTendieV2.deployed();
        await bep20RewardTendie.transferOwnership(adminAddress);

        deployLogs.push({
            name,
            address: BEP20RewardTEndieV2.address,
            stakeToken,
            rewardToken,
            rewardPerBlock,
            startBlock,
            bonusEndBlock
        });
      }

    console.log(JSON.stringify(deployLogs));
};