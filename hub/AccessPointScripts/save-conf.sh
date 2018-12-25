#!/bin/bash
cp /etc/dnsmasq.conf ./AccessPointScripts/original-conf/dnsmasq.conf
touch ./AccessPointScripts/original-conf/hostapd.conf
cp /etc/network/interfaces ./AccessPointScripts/original-conf/interfaces
cp /etc/default/hostapd ./AccessPointScripts/original-conf/hostapd
cp /etc/dhcpcd.conf ./AccessPointScripts/original-conf/dhcpcd.conf
echo "Configuration saved !"
