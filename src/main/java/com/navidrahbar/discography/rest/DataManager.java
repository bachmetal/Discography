package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.Album;
import com.navidrahbar.discography.entity.Artist;
import com.navidrahbar.discography.entity.Song;
import com.navidrahbar.discography.repository.AlbumRepository;
import com.navidrahbar.discography.repository.ArtistRepository;
import com.navidrahbar.discography.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataManager {

    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;
    private final SongRepository songRepository;

    public DataManager(ArtistRepository artistRepository,
                       AlbumRepository albumRepository,
                       SongRepository songRepository) {
        this.artistRepository = artistRepository;
        this.albumRepository = albumRepository;
        this.songRepository = songRepository;
    }


    public List<Artist> getArtistList() {
        return artistRepository.findAll();
    }

    public Artist getArtistById(int id) {
        return artistRepository.findById(id).orElse(null);
    }

    public List<Album> getAlbumList() {
        return albumRepository.findAll();
    }

    public Album getAlbumById(int id) {
        return albumRepository.findById(id).orElse(null);
    }

    public Artist addArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Album addAlbum(Album album) {
        return albumRepository.save(album);
    }
    public List<Song> getAllSongs(int albumId) {
        return songRepository.getAllSongsById(albumId);
    }
}
