package com.navidrahbar.discography.entity;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "artist")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "NAME", nullable = false, length = 250)
    private String name;

    @Column(name = "thumbnailphoto", length = 500)
    private String thumbnailphoto;

    @OneToMany(mappedBy = "artist")
    private Set<Album> albums = new LinkedHashSet<>();

    public Set<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
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
}