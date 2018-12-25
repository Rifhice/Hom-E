#!/bin/bash

if [ "$EUID" -ne 0 ]
	then echo "Must be root"
	exit
fi

SSID="$1"
PASS="$2"

cat >> /etc/wpa_supplicant/wpa_supplicant.conf <<EOF
network={
        ssid="$SSID"
        psk="$PASS"
}
EOF