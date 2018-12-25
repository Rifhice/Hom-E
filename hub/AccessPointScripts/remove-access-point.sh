#!/bin/bash
systemctl disable hostapd
systemctl disable dnsmasq

sudo service hostapd stop
sudo service dnsmasq stop

cp ./AccessPointScripts/original-conf/dnsmasq.conf /etc/dnsmasq.conf
cp ./AccessPointScripts/original-conf/hostapd.conf /etc/hostapd/hostapd.conf
cp ./AccessPointScripts/original-conf/interfaces /etc/network/interfaces
cp ./AccessPointScripts/original-conf/hostapd /etc/default/hostapd 
cp ./AccessPointScripts/original-conf/dhcpcd.conf /etc/dhcpcd.conf
