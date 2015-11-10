#!/bin/bash
#Run to start dev server for android react-native project

react-native start > /dev/null 2>&1 &
adb reverse tcp:8081 tcp:8081
