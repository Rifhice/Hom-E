#!/bin/bash
apt-get remove --purge hostapd -y
apt-get update -y
apt-get install hostapd dnsmasq -y
