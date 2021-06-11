const { assert } = require("chai");

const TendieToken = artifacts.require('TendieToken');

contract('TendieToken', ([alice, bob, carol, dev, minter]) => {
    beforeEach(async () => {
        this.cake = await TendieToken.new({ from: minter });
    });


    it('mint', async () => {
        await this.cake.mint(alice, 1000, { from: minter });
        assert.equal((await this.cake.balanceOf(alice)).toString(), '1000');
    })
});
