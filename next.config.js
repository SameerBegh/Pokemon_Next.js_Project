/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // to access external img src
  images:{
    domains:["img.pokemondb.net", "www.pngegg.com"],
  }
}

module.exports = nextConfig
