package com.navidrahbar.discography.rest;

import com.navidrahbar.discography.entity.*;
import com.navidrahbar.discography.repository.*;
import org.springframework.stereotype.Service;

import java.util.Arrays;
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
        if (artistRepository.countArtistsByName(artist.getName()) == 0) {
            artistRepository.save(artist);
        }
        artist.getAlbums().forEach(album -> {
            artistRepository.findByName(artist.getName()).ifPresent(album::setArtist);
            album.setThumbnailphoto(album.getThumbnailphoto());
            album.setYear(album.getYear());
            album.getGenres().forEach(genre -> {
                if (genreRepository.countGenresByName(genre.getName()) == 0) {
                    genreRepository.save(genre);
                }
                genreRepository.findByName(genre.getName()).ifPresent(album::setGenres);
            });
            album.getStyles().forEach(style -> {
                if (styleRepository.countStylesByName(style.getName()) == 0) {
                    styleRepository.save(style);
                }
                styleRepository.findByName(style.getName()).ifPresent(album::setStyles);
            });
            songRepository.saveAll(album.getSongs());
            album.getSongs().forEach(song -> song.setAlbumid(album));
            albumRepository.save(album);
        });
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

    public List<Album> findAllAlbumsByArtist(int id) {
        return albumRepository.findAllByArtistId(id);
    }

    public List<Album> findAllAlbums() {
        return albumRepository.findAll();
    }

    public Boolean existsGenre(String name) {
        return genreRepository.existsByName(name);
    }
}
