# Tendie Farming

This repo is home to the Farming contracts for TendieSwap. Liquidity pools are initialized and added as a staking token to the MasterTendie contract. This MasterTendie contract is also in control of the number of minted $TENDIE per block. As users stake LP and other tokens, the MasterTendie distributes them according to the weight of rewards of a specific pool along with an accounts stake in that pool.

https://app.tendieswap.org. 

## Updates to MasterTendie
As MasterTendie is fork of Pancake's MasterChef, we want to be transparent about the updates that have been made:

- Migrator Function removed: This function has been used in rug pulls before and as we want to build trust in the community we have decided to remove this. We don't claim to be the first, but we agree with the decision. 
- Farm safety checks. When setting allocations for farms, if a pool is added twice it can cause inconsistencies.
- Helper view functions. View functions can only read data from the contract, but not alter anything which means these can not be used for attacks. 
- Only one admin. A recent project was exploited that used multiple forms of admins to control the project. An admin function that was not timelocked was used to make the exploit. We want the timelock to have full control over the contract so there are no surprises

### BSCMAINNET

#### Farm Contracts

- TendieToken: [0x9853A30C69474BeD37595F9B149ad634b5c323d9](https://bscscan.com/token/0x9853A30C69474BeD37595F9B149ad634b5c323d9)
- MasterTendie: [0x6dDb25ca46656767f8f2385D653992dC1cdb4470](https://bscscan.com/address/0x6dDb25ca46656767f8f2385D653992dC1cdb4470)
- SupportTendie: [0x36d5171896e1A0F367A4968505407373fff2dD33](https://bscscan.com/address/0x36d5171896e1A0F367A4968505407373fff2dD33)
- SpicyTendie: [0x347757D2B7a0bAeC1A06720487870b1fE38e34A1](https://bscscan.com/address/0x347757D2B7a0bAeC1A06720487870b1fE38e34A1)
- MultiCall: [0x4CC9F0748274278310f7CDbaf0CE9A9ed953F85f](https://bscscan.com/address/0x4CC9F0748274278310f7CDbaf0CE9A9ed953F85f)
