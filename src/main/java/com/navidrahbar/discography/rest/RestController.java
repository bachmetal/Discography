package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.Album;
import com.navidrahbar.discography.entity.Artist;
import com.navidrahbar.discography.entity.Song;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api")
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
    public ResponseEntity<List<Album>> getAlbumByArtistId(@PathVariable int id) {
        return ResponseEntity.ok(dataManager.getAlbumsByArtistId(id));
    }

    @PostMapping("/artists")
    public ResponseEntity<Artist> addArtist(@RequestBody Artist artist) {
        return ResponseEntity.ok(dataManager.addArtist(artist));
    }

    @GetMapping("/search")
    // http://localhost:8080/api/search?keyword=add
    public ResponseEntity<List<Artist>> getSearchResult(@RequestParam String keyword) {
        return ResponseEntity.ok(dataManager.getSearchResult(keyword));
    }
}
