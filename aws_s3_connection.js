// run npm init in the action folder
// install the following dependencies
//   npm install @actions/core @actions/github @actions/exec

// Do not add ./.github/actions/deploy-s3-javascript/node_modules
// to .gitignore. The action requires all code to run successfully

const core = require("@actions/core");
// const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
    // 1) Get some input values
    const bucket = core.getInput("bucket", { required: true });    
    const bucketRegion = core.getInput("bucket-region", { required: true });    
    const distFolder = core.getInput("dist-folder", { required: true });
    
    // 2) Upload files to AWS S3 bucket
    const s3Uri = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    // 3) Display site URL by setting output
    const siteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput("site-url", siteUrl);
}

run();