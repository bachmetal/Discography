package com.navidrahbar.discography.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hasgenrealbum")
public class Hasgenrealbum {
    @EmbeddedId
    private HasgenrealbumId id;

    @MapsId("albumid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "albumid", nullable = false)
    private Album albumid;

    @MapsId("genreid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "genreid", nullable = false)
    private Genre genreid;

    public HasgenrealbumId getId() {
        return id;
    }

    public void setId(HasgenrealbumId id) {
        this.id = id;
    }

    public Album getAlbumid() {
        return albumid;
    }

    public void setAlbumid(Album albumid) {
        this.albumid = albumid;
    }

    public Genre getGenreid() {
        return genreid;
    }

    public void setGenreid(Genre genreid) {
        this.genreid = genreid;
    }

}