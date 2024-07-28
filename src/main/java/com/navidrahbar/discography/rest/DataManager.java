package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.Album;
import com.navidrahbar.discography.entity.Artist;
import com.navidrahbar.discography.entity.Song;
import com.navidrahbar.discography.repository.AlbumRepository;
import com.navidrahbar.discography.repository.ArtistRepository;
import com.navidrahbar.discography.repository.SongRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class DataManager {

    private final ArtistRepository artistRepository;
    private final SongRepository songRepository;
    private final AlbumRepository albumRepository;


    public DataManager(ArtistRepository artistRepository,
                       SongRepository songRepository,
                       AlbumRepository albumRepository) {
        this.artistRepository = artistRepository;
        this.songRepository = songRepository;
        this.albumRepository = albumRepository;
    }

    public List<Artist> getArtistList() {
        return artistRepository.findAll();
    }

    public Artist getArtistById(int id) {
        return artistRepository.findById(id).orElse(null);
    }

    public Artist addArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public List<Song> getSongList() {
        return songRepository.findAll();
    }

    public Album getAlbumBySongName(String name) {
        return albumRepository.getAlbumBySongName(name);
    }
}
