#!/bin/bash

nohup npm run serve &
cd client && nohup npm run start &
