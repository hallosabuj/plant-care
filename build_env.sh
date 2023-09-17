#############################################################
##################### Install nodejs ########################
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
#############################################################

#############################################################
###################### Install Golang #######################
wget https://dl.google.com/go/go1.20.3.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -zxvf go1.20.3.linux-amd64.tar.gz
mkdir -p ~/go/{bin,pkg,src}

# The following assume that your shell is bash
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export GOROOT=/usr/local/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin:$GOROOT/bin' >> ~/.bashrc
echo 'export GO111MODULE=auto' >> ~/.bashrc
source ~/.bashrc
rm go1.20.3.linux-amd64.tar.gz
#############################################################

#############################################################
###################### Install mysql ########################
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql.service
# To set password for mysql
#   sudo mysql
#   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
#   exit
#############################################################
