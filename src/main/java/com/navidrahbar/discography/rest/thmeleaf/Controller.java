package com.navidrahbar.discography.rest.thmeleaf;

import com.navidrahbar.discography.entity.*;
import com.navidrahbar.discography.rest.DataManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {

    private final DataManager dataManager;
    private Artist artist = new Artist();

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    @Autowired
    public Controller(DataManager dataManager) {
        this.dataManager = dataManager;
    }

    @GetMapping({"/index.html", "/"})
    public String artists(Model model) {
        List<Artist> artists = dataManager.getArtistList().stream().toList();
        model.addAttribute("artists", artists);
        return "index";
    }

    @GetMapping("/add-new.html")
    public String showForm(Model model, Artist artist) {
        model.addAttribute("artist", new Artist());
//        model.addAttribute("album", new Album());
//        model.addAttribute("song", new Song());
//        model.addAttribute("genre", new Genre());
//        model.addAttribute("style", new Style());
        model.addAttribute("allArtists", dataManager.findAllArtists().stream().sorted(Comparator.comparing(Artist::getName)));
//        model.addAttribute("allAlbums", dataManager.findAllAlbumsByArtist().stream().sorted(Comparator.comparing(Album::getName)));
        model.addAttribute("allGenres", dataManager.findAllGenres().stream().sorted(Comparator.comparing(Genre::getName)));
        model.addAttribute("allStyles", dataManager.findAllStyles().stream().sorted(Comparator.comparing(Style::getName)));
        return "add-new"; // Thymeleaf template name
    }

    @PostMapping("/submit-artist")
    public String addArtist(@ModelAttribute Artist artist, RedirectAttributes redirectAttributes) {
        dataManager.addArtist(artist);
        redirectAttributes.addFlashAttribute("message", "Artist added successfully");
        return "redirect:/add-new.html"; // Redirect to the home page
    }

    @PostMapping("/submit-song")
    public String addSongs(@ModelAttribute LinkedHashSet<Song> songs,
                           RedirectAttributes redirectAttributes) {

        System.out.println(songs.getFirst());
        redirectAttributes.addFlashAttribute("message", "Song added successfully");
        return "redirect:/add-new.html"; // Redirect to the home page
    }

    @GetMapping("/remove-artist/")
    public String removeArtist(@RequestParam int id, RedirectAttributes redirectAttributes) {
        dataManager.removeArtist(id);
        redirectAttributes.addFlashAttribute("message", "Artist removed successfully");
        return "redirect:/index.html";
    }
}
