module.exports = {
  apps: [{
    name: "gnome-bot",
    script: "./main.ts",
    watch: false,
    time: true,
    interpreter: "deno",
    interpreterArgs: "run --allow-net --allow-read --allow-env",
    env: {
      "NODE_ENV": "production",
    },
  }],
};
