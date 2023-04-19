const { assert, expect } = require("chai")
const { network, deployment, ethers, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Nft Marketplace Tests", function () {
          let nftMarketplace, nftMarketplaceContract, basicNft, basicNftContract
          const PRICE = ethers.utils.parseEther("0.1")
          const TOKEN_ID = 0
          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              user = accounts[1]
              await deployments.fixture(["all"]) //deploy all contracts
              nftMarketplaceContract = await ethers.getContract("NftMarketplace")
              nftMarketplace = nftMarketplace.connect(deployer)
              basicNftContract = await ethers.getContract("BasicNft")
              basicNft = await basicNftContract.connect(deployer)
              await basicNft.mintNft()
              await basicNft.approve(nftMarketplaceContract.address, TOKEN_ID)
          })
          describe("listItem", function () {
              it("emits an event after listing an item", async function () {
                  expect(
                      await nftMarketplace
                          .listItem(basicNft.address, TOKEN_ID, PRICE)
                          .to.emit("ItemListed")
                  )
              })
          })
      })
