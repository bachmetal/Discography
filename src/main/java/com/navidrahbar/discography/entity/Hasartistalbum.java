package com.navidrahbar.discography.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hasartistalbum")
public class Hasartistalbum {
    @EmbeddedId
    private HasartistalbumId id;

    @MapsId("artistid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "artistid", nullable = false)
    private Artist artistid;

    @MapsId("albumid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "albumid", nullable = false)
    private Album albumid;

    public HasartistalbumId getId() {
        return id;
    }

    public void setId(HasartistalbumId id) {
        this.id = id;
    }

    public Artist getArtistid() {
        return artistid;
    }

    public void setArtistid(Artist artistid) {
        this.artistid = artistid;
    }

    public Album getAlbumid() {
        return albumid;
    }

    public void setAlbumid(Album albumid) {
        this.albumid = albumid;
    }

}