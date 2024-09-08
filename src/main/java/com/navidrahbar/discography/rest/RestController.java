package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@org.springframework.web.bind.annotation.RestController
public class RestController {
    private com.navidrahbar.discography.rest.DataManager dataManager;

    @Autowired
    public RestController(DataManager dataManager) {
        this.dataManager = dataManager;
    }

    // Submit a GET request to http://localhost:8080/api/artists to get a list of all artists
    @GetMapping("/artists")
    public ResponseEntity<List<Artist>> getArtistList() {
        return ResponseEntity.ok(dataManager.getArtistList());
    }

    // Submit a GET request to http://localhost:8080/api/artist/1 to get the artist with ID 1
    @GetMapping("/artists/{id}")
    public ResponseEntity<List<Album>> getAlbumByArtistId(@PathVariable int id) {
        return ResponseEntity.ok(dataManager.getAlbumsByArtistId(id));
    }

    // Alternative way to search from Database
    @GetMapping("/search")
    // http://localhost:8080/api/search?keyword=add
    public ResponseEntity<List<Artist>> getSearchResult(@RequestParam String keyword) {
        return ResponseEntity.ok(dataManager.getSearchResult(keyword));
    }

    //     Submit a POST request to http://localhost:8080/api/artist with a JSON body to add a new artist
    @PostMapping("/artist")
    public ResponseEntity<Artist> addArtist(@RequestBody Artist artist) {
        dataManager.addArtist(artist);
        return ResponseEntity.ok(artist);
    }

    // Submit a POST request to http://localhost:8080/api/song with a JSON body to add a new song
    @PostMapping("/album")
    public ResponseEntity<Album> addAlbum(@RequestBody Album album) {
        return ResponseEntity.ok(dataManager.addAlbum(album));
    }

    // Submit a POST request to http://localhost:8080/api/song with a JSON body to add a new song
    @PostMapping("/song")
    public ResponseEntity<Song> addSong(@RequestBody Song song) {
        return ResponseEntity.ok(dataManager.addSong(song));
    }

    // Submit a POST request to http://localhost:8080/api/genre with a JSON body to add a new genre
    @PostMapping("/genre")
    public ResponseEntity<Genre> addGenre(@RequestBody Genre genre) {
        return ResponseEntity.ok(dataManager.addGenre(genre));
    }

    // Submit a POST request to http://localhost:8080/api/style with a JSON body to add a new style
    @PostMapping("/style")
    public ResponseEntity<Style> addStyle(@RequestBody Style style) {
        return ResponseEntity.ok(dataManager.addStyle(style));
    }

    // Submit a GET request to http://localhost:8080/api/genre to get a list of all genres
    @GetMapping("/genres")
    public ResponseEntity<List<Genre>> getAllGenres() {
        return ResponseEntity.ok(dataManager.findAllGenres());
    }

    @GetMapping("/styles")
    public ResponseEntity<List<Style>> getAllStyles() {
        return ResponseEntity.ok(dataManager.findAllStyles());
    }
}
