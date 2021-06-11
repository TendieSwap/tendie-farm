[![GuardRails badge](https://api.guardrails.io/v2/badges/ApeSwapFinance/apeswap-banana-farm.svg?token=925e54e713b3ce19c5b66a91abef5ba2de561a804e3339502501d8224e56646b&provider=github)](https://dashboard.guardrails.io/gh/ApeSwapFinance/66547)

# Banana Farming 🍌

This repo is home to the Farming contracts for ApeSwap. Liquidity pools are initialized and added as a staking token to the MasterApe contract. This MasterApe contract is also in control of the number of minted $BANANA per block. As users stake LP and other tokens, the MasterApe distributes them according to the weight of rewards of a specific pool along with an accounts stake in that pool.

https://apeswap.finance. 

## Solidity Standard Input
With the help of solt we can easily verify our contracts on Etherscan: https://github.com/hjubb/solt

## Updates to MasterApe
As MasterApe is fork of Pancake's MasterChef, we want to be transparent about the updates that have been made: https://www.diffchecker.com/XSrDXXBe

- Migrator Function removed: This function has been used in rug pulls before and as we want to build trust in the community we have decided to remove this. We don't claim to be the first, but we agree with the decision. 
- Farm safety checks. When setting allocations for farms, if a pool is added twice it can cause inconsistencies.
- Helper view functions. View functions can only read data from the contract, but not alter anything which means these can not be used for attacks. 
- Only one admin. A recent project was exploited that used multiple forms of admins to control the project. An admin function that was not timelocked was used to make the exploit. We want the timelock to have full control over the contract so there are no surprises

## Updates BNBRewardApe 
BNBRewardApe contract is a spin off of Pankcake's SmartChef contract, but will provide a means to distribute BNB for staking tokens in place of a BEP20 token. The updates may be found here: https://www.diffchecker.com/BWzELIHw

## BEP20RewardApe
BEP20RewardApe contract is similar to the BNBRewardApe contract, but it gives out a BEP20 token as the reward in place of BNB. Find the updates from the BNBRewardApe here: https://www.diffchecker.com/IYZFKbNf

## BEP20RewardApeV2
BEP20RewardApeV2 adds two admin functions which allow the pool rewards to be updated allowing the pool to be extended for a longer period of time. https://www.diffchecker.com/h96HRT2L

## Architecture
For a general overview of the architecture check out this diagram: 
![banana-farm-architecture](./images/ApeSwap-Architecture.png)


### BSCMAINNET

#### Dex Contracts
- ApeFactory: [0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6](https://bscscan.com/address/0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6)
- ApeRouter: [0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607](https://bscscan.com/address/0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607)

#### Farm Contracts

- BananaToken: [0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95](https://bscscan.com/token/0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95)
- MasterApe: [0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9](https://bscscan.com/address/0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9)
- Timelock: [0x2F07969090a2E9247C761747EA2358E5bB033460](https://bscscan.com/address/0x2F07969090a2E9247C761747EA2358E5bB033460)
- SupportApe: [0x54aff400858Dcac39797a81894D9920f16972D1D](https://bscscan.com/address/0x54aff400858Dcac39797a81894D9920f16972D1D)
- BananaSplitBar: [0x86Ef5e73EDB2Fea111909Fe35aFcC564572AcC06](https://bscscan.com/address/0x86Ef5e73EDB2Fea111909Fe35aFcC564572AcC06)
- MultiCall: [0x38ce767d81de3940CFa5020B55af1A400ED4F657](https://bscscan.com/address/0x38ce767d81de3940CFa5020B55af1A400ED4F657)
