#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run $BUILD_COMMAND\",\
\"StartCommand\":\"npm run dev\"\
}"

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"us-west-2\"\
}"

AMPLIFY="{\
\"projectName\":\"$AMPLIFY_PROJECT\",\
\"appId\":\"$AMPLIFY_APP\",\
\"envName\":\"$AMPLIFY_ENV\",\
\"defaultEditor\":\"code\"\
}"

FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"

PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

AUTHCONFIG="{\
\"userPoolId\": \"$USER_POOL_ID\",\
\"webClientId\": \"$USER_POOL_APP_ID\",\
\"nativeClientId\": \"$USER_POOL_APP_ID\",\
\"identityPoolId\": \"\"\
}"

CATEGORIES="{\
\"auth\":$AUTHCONFIG\
}"

amplify pull --appId $AMPLIFY_APP --envName $AMPLIFY_ENV \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--categories $CATEGORIES \
--yes
