# Songs Directory

Put audio track files (MP3 / AAC / OGG) inside this folder `public/songs/`.

To enable a song in the invitation configurator:
1. Place the audio file inside `public/songs/` (e.g. `public/songs/track1.mp3`).
2. Add an entry to `songs` array inside `src/data/songs.ts`:
   ```ts
   {
     id: 'track1',
     title: 'Song Title',
     artist: 'Artist Name',
     file: '/songs/track1.mp3'
   }
   ```

**Important**: ONLY use music tracks that you have full rights/license to distribute publicly.
