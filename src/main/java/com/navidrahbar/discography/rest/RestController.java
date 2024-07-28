package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.Album;
import com.navidrahbar.discography.entity.Artist;
import com.navidrahbar.discography.entity.Song;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    private com.navidrahbar.discography.rest.DataManager dataManager;

    public RestController(DataManager dataManager) {
        this.dataManager = dataManager;
    }

    @GetMapping("/artists")
    public ResponseEntity<List<Artist>> getArtistList() {
        return ResponseEntity.ok(dataManager.getArtistList());
    }

    @GetMapping("/artists/{id}")
    public ResponseEntity<Artist> getArtistById(@PathVariable int id) {
        return ResponseEntity.ok(dataManager.getArtistById(id));
    }

    @PostMapping("/artists")
    public ResponseEntity<Artist> addArtist(@RequestBody Artist artist) {
        return ResponseEntity.ok(dataManager.addArtist(artist));
    }

    @GetMapping("/albums/songs/search/{songname}")
    public ResponseEntity<Album> getAlbumBySongName(@PathVariable String songname) {
        return ResponseEntity.ok(dataManager.getAlbumBySongName(songname));
    }
}
