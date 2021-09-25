docker run --rm -v $PWD/tls1.2.conf:/usr/local/apache2/conf/httpd.conf -v $HOME/ca:/usr/local/apache2/conf/ca -p 80:80 -p 443:443  httpd:2.4
