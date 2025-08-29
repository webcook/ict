// pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "react-shop-server",
      cwd: "./server",
      script: "yarn",
      args: "start",
      watch: true, // 필요 없다면 false
    },
    {
      name: "react-shop-client",
      cwd: "./client",
      script: "yarn",
      args: "dev", // CRA면 start, Vite면 dev
      watch: true,
    }
  ]
}
