import axios from 'axios'
import semver from 'semver'
import { config } from 'dotenv'
import  util from 'util';
import childProcess from 'child_process'
import docsPackage from '../package.json';
const execPromise = util.promisify(childProcess.exec);

const exec = async (cmd: string) => {
    console.log(cmd);
    return await execPromise(cmd);
};

config()

async function main() {
    const currentChakraVersion = docsPackage.dependencies['@chakra-ui/react'];
    const npmResponse = await axios.get(`https://registry.npmjs.org/@chakra-ui/react`);
    const liveChakraVersion = npmResponse.data['dist-tags']['latest'];

    const lt = semver.lt(currentChakraVersion, liveChakraVersion);
    if (lt) {
        const { stdout, stderr } = await exec(`yarn add @chakra-ui/react@${liveChakraVersion}`);
        console.log(stdout);
        console.error(stderr);
        console.log(`Updated @chakra-ui/react to ${liveChakraVersion}`);
        return;
    }

    console.log(`@chakra-ui/react: ${currentChakraVersion} === ${liveChakraVersion}`);
}

try {
    main()
} catch (err) {
    console.log(err)
}
