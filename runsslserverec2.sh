#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
sudo python3 manage.py runsslserver 0.0.0.0:8000 --certificate $DIR/certificates/rootCA.crt --key $DIR/certificates/rootCA.key
