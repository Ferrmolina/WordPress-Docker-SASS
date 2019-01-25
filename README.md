

## Requeriments

- [Node](https://nodejs.org/en/download/package-manager/) 
- [Docker](https://docs.docker.com/installation/) 
- [Docker Compose](http://docs.docker.com/compose/install/)
- A local domain. Add the [configured DOMAIN of .env file](https://github.com/Ferrmolina/WP-Docker-Gulp/blob/master/.env#L1), to your ```/etc/hosts``` file as ```127.0.0.1 DOMAIN```

## Installation

Install [Docker](https://docs.docker.com/installation/) and [Docker Compose](http://docs.docker.com/compose/install/), then:
```bash 
git clone https://github.com/Ferrmolina/WP-Docker-Gulp.git
cd WP-Docker-Gulp
docker-compose up -d
npm run install-dependencies
npm run init-gulp
```

If everything worked correctly, you should see the installer for your WordPress web site!


