#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-notes-application-300741-300756/frontend_react_notes
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

