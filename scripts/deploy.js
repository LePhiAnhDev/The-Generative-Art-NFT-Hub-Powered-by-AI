const hre = require("hardhat");

async function main() {
    const FormaNFT = await hre.ethers.getContractFactory("FormaNFT");
    console.log("Deploying FormaNFT...");

    const formaNFT = await FormaNFT.deploy();
    await formaNFT.waitForDeployment();

    const formaNFTAddress = await formaNFT.getAddress();
    console.log("FormaNFT deployed to:", formaNFTAddress);

    console.log("Waiting for deployment confirmation...");
    await formaNFT.deployTransaction.wait(5); // đợi 5 blocks

    console.log("Verifying contract...");
    try {
        await hre.run("verify:verify", {
            address: formaNFTAddress,
            contract: "contracts/FormaNFT.sol:FormaNFT",
            constructorArguments: []
        });
        console.log("Contract verified successfully");
    } catch (error) {
        console.error("Verification failed:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 