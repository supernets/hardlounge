# The Lounge: Hard Chats Edition

This is a fork of The Lounge intended to be used for the SuperNETs Webchat (located at https://webchat.supernets.org)

# Deployment

1. Create a `docker-compose.yml` file in the directory you wish The Lounge to be in, use the one in this repo as an example.
2. Create the `config/` folder in the same directory.
3. Run `docker compose up` to bring up the container and generate required files, you may Ctrl+C it after that.
4. Edit the config file located at `config/config.js`, it is well documented and has not been changed so the original The Lounge documentation applies here.
5. Bring up the container for good using `docker compose up -d`.

# Support

If for some reason you decide to run our version of this container, we are more than happy to support you in #5000 on irc.supernets.org

# Credits

- All developers & contributors of The Lounge - https://github.com/thelounge/thelounge
