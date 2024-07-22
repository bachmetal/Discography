package com.navidrahbar.discography.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "song")
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "NAME", nullable = false, length = 250)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "albumid")
    private Album albumid;

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

    public Album getAlbumid() {
        return albumid;
    }

    public void setAlbumid(Album albumid) {
        this.albumid = albumid;
    }

}