package com.navidrahbar.discography.entity;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "album")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "NAME", nullable = false, length = 250)
    private String name;

    @Column(name = "thumbnailphoto", length = 500)
    private String thumbnailphoto;

    @Column(name = "year")
    private Integer year;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_Id")
    private Artist artist;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(name = "hasgenrealbum",
            joinColumns = @JoinColumn(name = "albumid"),
            inverseJoinColumns = @JoinColumn(name = "genreid"))
    private Set<Genre> genres = new LinkedHashSet<>();

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(name = "hasstylealbum",
            joinColumns = @JoinColumn(name = "albumid"),
            inverseJoinColumns = @JoinColumn(name = "styleid"))
    private Set<Style> styles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "albumid", cascade = CascadeType.ALL)
    private Set<Song> songs = new LinkedHashSet<>();

    public Album() {
        this.genres = new LinkedHashSet<>();
        this.styles = new LinkedHashSet<>();
        this.songs = new LinkedHashSet<>();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getThumbnailphoto() {
        return thumbnailphoto;
    }

    public void setThumbnailphoto(String thumbnailphoto) {
        this.thumbnailphoto = thumbnailphoto;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

//    public Artist getArtist() {
//        return artist;
//    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public Set<Style> getStyles() {
        return styles;
    }

    public void setStyles(Set<Style> styles) {
        this.styles = styles;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

}