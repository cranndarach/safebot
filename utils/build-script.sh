#!/bin/bash

echo "#!/usr/bin/env node" > bin/safebot || (mkdir build && echo "#!/usr/bin/env node" > bin/safebot)
echo >> bin/safebot
cat ./main.js >> bin/safebot
