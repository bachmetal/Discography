package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.Album;
import com.navidrahbar.discography.entity.Artist;
import org.springframework.http.ResponseEntity;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    private com.navidrahbar.discography.rest.DataManager dataManager;

    public RestController(DataManager dataManager) {
        this.dataManager = dataManager;
    }

    @org.springframework.web.bind.annotation.GetMapping("/artists")
    public ResponseEntity<List<Artist>> getArtistList() {
        return ResponseEntity.ok(dataManager.getArtistList());
    }

    @org.springframework.web.bind.annotation.GetMapping("/artists/{id}")
    public ResponseEntity<Artist> getArtistById(@org.springframework.web.bind.annotation.PathVariable int id) {
        return ResponseEntity.ok(dataManager.getArtistById(id));
    }

    @org.springframework.web.bind.annotation.GetMapping("/albums")
    public ResponseEntity<List<com.navidrahbar.discography.entity.Album>> getAlbumList() {
        return ResponseEntity.ok(dataManager.getAlbumList());
    }

    @org.springframework.web.bind.annotation.GetMapping("/albums/{id}")
    public ResponseEntity<Album> getAlbumById(@org.springframework.web.bind.annotation.PathVariable int id) {
        return ResponseEntity.ok(dataManager.getAlbumById(id));
    }

    @org.springframework.web.bind.annotation.PostMapping("/artists")
    public ResponseEntity<Artist> addArtist(@org.springframework.web.bind.annotation.RequestBody Artist artist) {
        return ResponseEntity.ok(dataManager.addArtist(artist));
    }

    @org.springframework.web.bind.annotation.PostMapping("/albums")
    public ResponseEntity<Album> addAlbum(@org.springframework.web.bind.annotation.RequestBody Album album) {
        return ResponseEntity.ok(dataManager.addAlbum(album));
    }
}
