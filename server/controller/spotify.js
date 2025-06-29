const axios = require("axios");
require("dotenv").config();

class SpotifyController {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Get access token using Client Credentials flow
  async getAccessToken() {
    try {
      // Check if token is still valid
      if (this.accessToken && this.tokenExpiry > Date.now()) {
        return this.accessToken;
      }

      const authHeader = Buffer.from(
        `${this.clientId}:${this.clientSecret}`
      ).toString("base64");

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${authHeader}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;

      return this.accessToken;
    } catch (error) {
      console.error(
        "Error getting access token:",
        error.response?.data || error.message
      );
      throw new Error("Failed to get Spotify access token");
    }
  }

  // Search for tracks
  async searchTracks(query, limit = 10) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: "track",
          limit: limit,
        },
      });

      return response.data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        duration: track.duration_ms,
        preview_url: track.preview_url,
        image: track.album.images[0]?.url,
        external_url: track.external_urls.spotify,
        popularity: track.popularity,
      }));
    } catch (error) {
      console.error(
        "Error searching tracks:",
        error.response?.data || error.message
      );
      throw new Error("Failed to search tracks");
    }
  }

  // Search for artists
  async searchArtists(query, limit = 10) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: "artist",
          limit: limit,
        },
      });

      return response.data.artists.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        genres: artist.genres,
        popularity: artist.popularity,
        followers: artist.followers.total,
        image: artist.images[0]?.url,
        external_url: artist.external_urls.spotify,
      }));
    } catch (error) {
      console.error(
        "Error searching artists:",
        error.response?.data || error.message
      );
      throw new Error("Failed to search artists");
    }
  }

  // Get artist's top tracks
  async getArtistTopTracks(artistId, country = "US") {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            country: country,
          },
        }
      );

      return response.data.tracks.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        duration: track.duration_ms,
        preview_url: track.preview_url,
        image: track.album.images[0]?.url,
        external_url: track.external_urls.spotify,
        popularity: track.popularity,
      }));
    } catch (error) {
      console.error(
        "Error getting artist top tracks:",
        error.response?.data || error.message
      );
      throw new Error("Failed to get artist top tracks");
    }
  }

  // Get track details
  async getTrack(trackId) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const track = response.data;
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        duration: track.duration_ms,
        preview_url: track.preview_url,
        image: track.album.images[0]?.url,
        external_url: track.external_urls.spotify,
        popularity: track.popularity,
      };
    } catch (error) {
      console.error(
        "Error getting track:",
        error.response?.data || error.message
      );
      throw new Error("Failed to get track");
    }
  }

  // Get recommendations based on seed tracks/artists
  async getRecommendations(options = {}) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            seed_tracks: options.seedTracks || "",
            seed_artists: options.seedArtists || "",
            seed_genres: options.seedGenres || "",
            limit: options.limit || 10,
            target_popularity: options.popularity || 50,
          },
        }
      );

      return response.data.tracks.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        duration: track.duration_ms,
        preview_url: track.preview_url,
        image: track.album.images[0]?.url,
        external_url: track.external_urls.spotify,
        popularity: track.popularity,
      }));
    } catch (error) {
      console.error(
        "Error getting recommendations:",
        error.response?.data || error.message
      );
      throw new Error("Failed to get recommendations");
    }
  }
}

module.exports = new SpotifyController();
