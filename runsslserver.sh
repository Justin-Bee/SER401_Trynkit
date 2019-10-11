#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
sudo python3 manage.py runsslserver 127.0.0.1:8000 --certificate $DIR/cerficates/rootCA.pem --key $DIR/certificates/rootCA.key
