package com.navidrahbar.discography.rest.thmeleaf;

import com.navidrahbar.discography.entity.Artist;
import com.navidrahbar.discography.rest.DataManager;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {
    private final DataManager dataManager;

    public Controller(DataManager dataManager) {
        this.dataManager = dataManager;
    }

    @GetMapping({"/index.html", "/"})
    public String artists(Model model) {
        List<Artist> artists = dataManager.getArtistList().stream().toList();
        model.addAttribute("artists", artists);
        model.addAttribute("albums", dataManager.getAlbumsByArtistId(artists.get(1).getId()).stream().toList());
        return "index";
    }
}
