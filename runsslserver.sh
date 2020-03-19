#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
if [ $1 == 'ec2' ]; 
then
	sudo python3 manage.py runsslserver 0.0.0.0:8000 --certificate $DIR/certificates/rootCA.crt --key $DIR/certificates/rootCA.key
elif [ -z "$1" ];
then
	sudo python3 manage.py runsslserver 127.0.0.1:8000 --certificate $DIR/certificates/rootCA.crt --key $DIR/certificates/rootCA.key
fi
