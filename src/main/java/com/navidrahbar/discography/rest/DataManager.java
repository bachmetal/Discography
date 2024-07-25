package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.Artist;
import com.navidrahbar.discography.repository.ArtistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataManager {

    private final ArtistRepository artistRepository;

    public DataManager(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
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
}
