package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.*;
import com.navidrahbar.discography.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DataManager {

    private final ArtistRepository artistRepository;
    private final SongRepository songRepository;
    private final AlbumRepository albumRepository;
    private final GenreRepository genreRepository;
    private final StyleRepository styleRepository;


    public DataManager(ArtistRepository artistRepository,
                       SongRepository songRepository,
                       AlbumRepository albumRepository,
                       GenreRepository genreRepository,
                       StyleRepository styleRepository) {
        this.artistRepository = artistRepository;
        this.songRepository = songRepository;
        this.albumRepository = albumRepository;
        this.genreRepository = genreRepository;
        this.styleRepository = styleRepository;
    }

    public List<Artist> getArtistList() {
        return artistRepository.findAll();
    }

    public Artist getArtistById(int id) {
        return artistRepository.findById(id).orElse(null);
    }

    public List<Album> getAlbumsByArtistId(int id) {
        return albumRepository.findAllByArtistId(id);
    }

    public List<Song> getSongList() {
        return songRepository.findAll();
    }

    public List<Album> getAlbumBySongName(String name) {
        return albumRepository.getAlbumBySongName(name);
    }

    public List<Artist> getSearchResult(String keyword) {
        return artistRepository.getSearchResult(keyword);
    }

    public void addArtist(Artist artist) {
        artistRepository.save(artist);
    }

    public Album addAlbum(Album album) {
        return albumRepository.save(album);
    }

    public Genre addGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public Style addStyle(Style style) {
        return styleRepository.save(style);
    }

    public Song addSong(Song song) {
        return songRepository.save(song);
    }

    public Optional<Artist> getArtistByName(String name) {
        return artistRepository.findByName(name);
    }

    public void removeArtist(int id) {
        artistRepository.deleteById(id);
    }

    public List<Artist> findAllArtists() {
        return artistRepository.findAll();
    }

    public List<Album> findAlbumsByArtistId(Integer id) {
        return albumRepository.findAllByArtistId(id);
    }

    public Optional<Genre> findGenreByName(String name) {
        return genreRepository.findGenreByName(name);
    }

    public Optional<Style> findStyleByName(String name) {
        return styleRepository.findStyleByName(name);
    }

    public void addAllGenre(Set<Genre> genres) {
        genreRepository.saveAll(genres);
    }

    public void addAllStyle(Set<Style> styles) {
        styleRepository.saveAll(styles);
    }

    public void addAllSong(Set<Song> songs) {
        songRepository.saveAll(songs);
    }

    public List<Genre> findAllGenres() {
        return genreRepository.findAll();
    }

    public List<Style> findAllStyles() {
        return styleRepository.findAll();
    }
}
